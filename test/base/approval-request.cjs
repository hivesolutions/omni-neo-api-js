const assert = require("assert");
const { API } = require("../../dist/omni.cjs");

describe("ApprovalRequest", function() {
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

    describe("#listApprovalRequests()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.listApprovalRequests(options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/approval_requests", options: options }
            ]);
        });
    });

    describe("#getApprovalRequest()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.getApprovalRequest(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "get",
                    url: "http://localhost:3000/approval_requests/1",
                    options: options
                }
            ]);
        });
    });

    describe("#approveApprovalRequest()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.approveApprovalRequest(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/approval_requests/1/approve",
                    options: options
                }
            ]);
        });
    });

    describe("#rejectApprovalRequest()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { reason: "Incorrect reference" };
            const result = await api.rejectApprovalRequest(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/approval_requests/1/reject",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#withdrawApprovalRequest()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.withdrawApprovalRequest(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/approval_requests/1/withdraw",
                    options: options
                }
            ]);
        });
    });

    describe("#errors()", function() {
        it("should preserve server errors", async () => {
            const error = new Error("Permission denied");
            api.get = async () => {
                throw error;
            };
            await assert.rejects(api.getApprovalRequest(1), error);
        });
    });
});
