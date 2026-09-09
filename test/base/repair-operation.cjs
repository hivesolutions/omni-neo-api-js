const assert = require("assert");
const { API } = require("../../dist/omni.cjs");

describe("RepairOperation", function() {
    let api;
    let requests;
    let response;

    beforeEach(() => {
        api = new API({ baseUrl: "http://localhost:3000/" });
        requests = [];
        response = { object_id: 1, body: "Receipt reference" };
        for (const method of ["get", "post", "put", "delete"]) {
            api[method] = async (url, options) => {
                requests.push({ method: method, url: url, options: options });
                return response;
            };
        }
    });

    describe("#createMessageRepairOperation()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { body: "Receipt reference" };
            const result = await api.createMessageRepairOperation(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/repair_operations/1/messages",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#updateMessageRepairOperation()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { body: "Receipt reference" };
            const result = await api.updateMessageRepairOperation(1, 2, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/repair_operations/1/messages/2/update",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#messagePayloadOptions()", function() {
        it("should encode attachments without changing the payload", async () => {
            const file = {
                name: "receipt.pdf",
                type: "application/pdf",
                arrayBuffer: async () => new Uint8Array([1, 2]).buffer
            };
            const payload = { body: "Receipt", files: [file] };
            await api.createMessageRepairOperation(1, payload);
            await api.updateMessageRepairOperation(1, 2, payload);
            assert.deepStrictEqual(requests[0].options, {
                dataM: {
                    body: "Receipt",
                    files: [["receipt.pdf", "application/pdf", new Uint8Array([1, 2])]]
                }
            });
            assert.deepStrictEqual(requests[1].options, requests[0].options);
            assert.strictEqual(payload.files[0], file);
        });

        it("should preserve empty messages and file defaults", async () => {
            await api.createMessageRepairOperation(1, { body: "", files: [] });
            assert.deepStrictEqual(requests[0].options, { dataJ: { body: "" } });
            await api.createMessageRepairOperation(1, {
                files: [{ arrayBuffer: async () => new ArrayBuffer(0) }]
            });
            assert.deepStrictEqual(requests[1].options, {
                dataM: {
                    body: "",
                    files: [["file", "application/octet-stream", new Uint8Array(0)]]
                }
            });
        });

        it("should preserve missing message payloads", async () => {
            await api.createMessageRepairOperation(1);
            await api.updateMessageRepairOperation(1, 2, null);
            assert.deepStrictEqual(requests[0].options, { dataJ: {} });
            assert.deepStrictEqual(requests[1].options, { dataJ: {} });
        });

        it("should propagate file read errors before posting", async () => {
            const error = new Error("Cannot read receipt");
            await assert.rejects(
                api.createMessageRepairOperation(1, {
                    files: [
                        {
                            arrayBuffer: async () => {
                                throw error;
                            }
                        }
                    ]
                }),
                error
            );
            await assert.rejects(
                api.updateMessageRepairOperation(1, 2, {
                    files: [
                        {
                            arrayBuffer: async () => {
                                throw error;
                            }
                        }
                    ]
                }),
                error
            );
            assert.strictEqual(requests.length, 0);
        });
    });
});
