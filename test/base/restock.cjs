const assert = require("assert");
const { API } = require("../../dist/omni.cjs");

describe("Restock", function() {
    let api;
    let requests;
    let response;

    beforeEach(() => {
        api = new API({ baseUrl: "http://localhost:3000/" });
        requests = [];
        response = { object_id: 1, workflow_state: 2 };
        for (const method of ["get", "post", "put", "delete"]) {
            api[method] = async (url, options) => {
                requests.push({ method: method, url: url, options: options });
                return response;
            };
        }
    });

    describe("#listRestocks()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["workflow_state:equals:2"], start_record: 10, number_records: 5 }
            };
            const result = await api.listRestocks(options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/restocks", options: options }
            ]);
        });
    });

    describe("#createRestock()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = {
                restock: { origin: { object_id: 21 }, observations: "Weekly restock" }
            };
            const result = await api.createRestock(payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/restocks",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#getRestock()", function() {
        it("should preserve the request and response contract", async () => {
            const result = await api.getRestock(1);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/restocks/1", options: {} }
            ]);
        });
    });

    describe("#updateRestock()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = {
                restock: {
                    restock_lines: [
                        {
                            merchandise: { object_id: 421 },
                            functional_unit: { object_id: 37 },
                            quantity: 3
                        }
                    ]
                }
            };
            const result = await api.updateRestock(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/restocks/1/update",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#getStocksRestock()", function() {
        it("should preserve the request and response contract", async () => {
            const options = { params: { code: "5601234567890" } };
            response = { merchandise: null };
            const result = await api.getStocksRestock(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/restocks/1/stocks", options: options }
            ]);
        });
    });

    describe("#generateRestock()", function() {
        it("should preserve the request and response contract", async () => {
            const result = await api.generateRestock(1);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "post", url: "http://localhost:3000/restocks/1/generate", options: {} }
            ]);
        });
    });

    describe("#cancelRestock()", function() {
        it("should preserve the request and response contract", async () => {
            const result = await api.cancelRestock(1);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "post", url: "http://localhost:3000/restocks/1/cancel", options: {} }
            ]);
        });
    });
});
