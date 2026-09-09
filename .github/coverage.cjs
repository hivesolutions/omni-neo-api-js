const { readFileSync } = require("fs");
const { relative } = require("path");

const coverage = JSON.parse(readFileSync("coverage/coverage-summary.json", "utf8"));
const repository = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`;
const source = `${repository}/blob/${process.env.GITHUB_SHA}`;
const rows = [
    "## Code Coverage",
    "",
    "Coverage includes all client source files and the coverage summary generator. The 90% line and function requirement applies to purchases, supplier bills and the summary generator.",
    "",
    "| File | Statements | Branches | Functions | Lines |",
    "| --- | ---: | ---: | ---: | ---: |"
];
const entries = [
    ["total", coverage.total],
    ...Object.entries(coverage).filter(([name]) => name !== "total")
];
for (const [filename, result] of entries) {
    const path = relative(process.cwd(), filename).replace(/\\/g, "/");
    const name = filename === "total" ? "**All files**" : `[${path}](${source}/${encodeURI(path)})`;
    const values = ["statements", "branches", "functions", "lines"].map(metric => {
        const value = result[metric].pct;
        return typeof value === "number" ? `${value.toFixed(2)}%` : "N/A";
    });
    rows.push(`| ${name} | ${values.join(" | ")} |`);
}
if (process.env.COVERAGE_ARTIFACT_URL) {
    rows.push(
        "",
        `[Download the coverage report](${process.env.COVERAGE_ARTIFACT_URL}) and open index.html to explore covered and uncovered lines. The archive also contains JSON and Cobertura reports.`
    );
}
process.stdout.write(rows.join("\n") + "\n");
