const assert = require("assert");
const { API } = require("../../dist/omni.cjs");

describe("Purchase", function() {
    let api;
    let requests;
    let response;

    beforeEach(() => {
        api = new API({ baseUrl: "http://localhost:3000/" });
        requests = [];
        response = { object_id: 1, outstanding_amount: 0.7 };
        for (const method of ["get", "post", "put", "delete"]) {
            api[method] = async (url, options) => {
                requests.push({ method: method, url: url, options: options });
                return response;
            };
        }
    });

    describe("#listPurchases()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.listPurchases(options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/purchases", options: options }
            ]);
        });
    });

    describe("#createPurchase()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { purchase_transaction: { reference: "statement-1" } };
            const result = await api.createPurchase(payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/purchases",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#getPurchase()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.getPurchase(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/purchases/1", options: options }
            ]);
        });
    });

    describe("#errors()", function() {
        it("should preserve server errors", async () => {
            const error = new Error("Permission denied");
            api.get = async () => {
                throw error;
            };
            await assert.rejects(api.getPurchase(1), error);
        });
    });
});
