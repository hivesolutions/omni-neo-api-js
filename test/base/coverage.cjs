const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

describe("Coverage", function() {
    let directory;
    let report;
    let env;
    let run;

    beforeEach(() => {
        directory = fs.mkdtempSync(path.join(os.tmpdir(), "omni-coverage-"));
        fs.mkdirSync(path.join(directory, "coverage"));
        report = path.join(directory, "coverage/coverage-summary.json");
        env = {
            ...process.env,
            GITHUB_SERVER_URL: "https://github.com",
            GITHUB_REPOSITORY: "hivesolutions/omni-neo-api-js",
            GITHUB_SHA: "1234567",
            COVERAGE_ARTIFACT_URL:
                "https://github.com/hivesolutions/omni-neo-api-js/actions/runs/1/artifacts/2"
        };
        run = () =>
            spawnSync(process.execPath, [path.resolve(__dirname, "../../.github/coverage.cjs")], {
                cwd: directory,
                env: env,
                encoding: "utf8"
            });
    });

    afterEach(() => {
        fs.rmSync(directory, { recursive: true, force: true });
    });

    it("should render totals, file metrics and report links", () => {
        const total = {
            statements: { pct: 75 },
            branches: { pct: 50 },
            functions: { pct: 25 },
            lines: { pct: 80.5 }
        };
        fs.writeFileSync(
            report,
            JSON.stringify({
                total: total,
                [path.join(directory, "js/supplier-bill.js")]: total
            })
        );
        const result = run();
        assert.strictEqual(result.status, 0);
        assert.ok(result.stdout.includes("| File | Statements | Branches | Functions | Lines |"));
        assert.ok(result.stdout.includes("| **All files** | 75.00% | 50.00% | 25.00% | 80.50% |"));
        assert.ok(
            result.stdout.includes(
                "[js/supplier-bill.js](https://github.com/hivesolutions/omni-neo-api-js/blob/1234567/js/supplier-bill.js)"
            )
        );
        assert.ok(
            result.stdout.includes(`[Download the coverage report](${env.COVERAGE_ARTIFACT_URL})`)
        );
        assert.ok(result.stdout.includes("open index.html"));
        assert.ok(result.stdout.endsWith("\n"));
    });

    it("should preserve zero coverage and unavailable metrics", () => {
        const total = {
            statements: { pct: 0 },
            branches: { pct: "Unknown" },
            functions: { pct: 0 },
            lines: { pct: 0 }
        };
        fs.writeFileSync(
            report,
            JSON.stringify({
                total: total,
                [path.join(directory, "js/empty file.js")]: total
            })
        );
        delete env.COVERAGE_ARTIFACT_URL;
        const result = run();
        assert.strictEqual(result.status, 0);
        assert.ok(result.stdout.includes("| **All files** | 0.00% | N/A | 0.00% | 0.00% |"));
        assert.ok(result.stdout.includes("/blob/1234567/js/empty%20file.js)"));
        assert.ok(!result.stdout.includes("Download the coverage report"));
    });

    it("should fail when the coverage report is missing", () => {
        const result = run();
        assert.notStrictEqual(result.status, 0);
        assert.strictEqual(result.stdout, "");
        assert.ok(result.stderr.includes("ENOENT"));
    });

    it("should fail when the coverage report is invalid", () => {
        fs.writeFileSync(report, "invalid");
        const result = run();
        assert.notStrictEqual(result.status, 0);
        assert.strictEqual(result.stdout, "");
        assert.ok(result.stderr.includes("SyntaxError"));
    });

    it("should fail when the coverage totals are missing", () => {
        fs.writeFileSync(report, "{}");
        const result = run();
        assert.notStrictEqual(result.status, 0);
        assert.strictEqual(result.stdout, "");
        assert.ok(result.stderr.includes("TypeError"));
    });
});

describe("CoverageReport", function() {
    it("should report uncovered methods through Rollup source maps", function() {
        this.timeout(10000);
        const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omni-coverage-report-"));
        const temporary = path.join(directory, "tmp");
        const root = path.resolve(__dirname, "../..");
        try {
            const result = spawnSync(
                process.execPath,
                [
                    require.resolve("c8/bin/c8.js"),
                    "--reports-dir",
                    directory,
                    "--temp-directory",
                    temporary,
                    "--reporter",
                    "none",
                    process.execPath,
                    "-e",
                    "require('./dist/omni.cjs')"
                ],
                {
                    cwd: root,
                    encoding: "utf8"
                }
            );
            assert.strictEqual(result.status, 0, result.stderr);
            const report = spawnSync(
                "npm",
                [
                    "run",
                    "coverage-report",
                    "--",
                    "--reports-dir",
                    directory,
                    "--temp-directory",
                    temporary
                ],
                {
                    cwd: root,
                    encoding: "utf8"
                }
            );
            assert.strictEqual(report.status, 0, report.stderr);
            const summary = JSON.parse(
                fs.readFileSync(path.join(directory, "coverage-summary.json"), "utf8")
            );
            const purchase = summary[path.join(root, "js/purchase.js")];
            assert.ok(purchase.functions.total >= 4);
            assert.ok(purchase.functions.covered < purchase.functions.total);
            assert.ok(purchase.lines.pct < 100);
            assert.ok(fs.existsSync(path.join(directory, "index.html")));
            assert.ok(fs.existsSync(path.join(directory, "js/purchase.js.html")));
        } finally {
            fs.rmSync(directory, { recursive: true, force: true });
        }
    });
});
