const assert = require("assert");
const { API } = require("../../dist/omni.cjs");

describe("SupplierBill", function() {
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

    describe("#listSupplierBills()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.listSupplierBills(options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/supplier_bills", options: options }
            ]);
        });
    });

    describe("#getPermissionsSupplierBill()", function() {
        it("should preserve server permission results", async () => {
            response = { "purchases.supplier_bill.create": false };
            const result = await api.getPermissionsSupplierBill();
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/supplier_bills/permissions", options: {} }
            ]);
        });
    });

    describe("#createSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill: { purchase: { object_id: 10 }, reference: "statement-1" } };
            const result = await api.createSupplierBill(payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#getSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.getSupplierBill(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                { method: "get", url: "http://localhost:3000/supplier_bills/1", options: options }
            ]);
        });
    });

    describe("#updateSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill: { reference: "statement-1" } };
            const result = await api.updateSupplierBill(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/update",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#approveSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.approveSupplierBill(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "put",
                    url: "http://localhost:3000/supplier_bills/1/approve",
                    options: options
                }
            ]);
        });
    });

    describe("#requestSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.requestSupplierBill(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/request",
                    options: options
                }
            ]);
        });
    });

    describe("#cancelSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { reason: "Incorrect reference" };
            const result = await api.cancelSupplierBill(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "put",
                    url: "http://localhost:3000/supplier_bills/1/cancel",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#reportSupplierBills()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.reportSupplierBills(options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "get",
                    url: "http://localhost:3000/supplier_bills/report",
                    options: options
                }
            ]);
        });
    });

    describe("#exportSupplierBills()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.exportSupplierBills(options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "get",
                    url: "http://localhost:3000/supplier_bills/export.csv",
                    options: options
                }
            ]);
        });
    });

    describe("#createPaymentSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill_payment: { entry_type: 1, applied_amount: 30, currency: "EUR", description: "Statement 1", request_key: "statement-1" } };
            const result = await api.createPaymentSupplierBill(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/payments",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#requestPaymentSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill_payment: { entry_type: 1, applied_amount: 30, currency: "EUR", description: "Statement 1", request_key: "statement-1" } };
            const result = await api.requestPaymentSupplierBill(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/payments/request",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#reversePaymentSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { reason: "Incorrect reference" };
            const result = await api.reversePaymentSupplierBill(1, 2, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "put",
                    url: "http://localhost:3000/supplier_bills/1/payments/2/reverse",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#createInstalmentSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill_instalment: { amount: 30, due_date: 1790812800 } };
            const result = await api.createInstalmentSupplierBill(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/instalments",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#updateInstalmentSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill_instalment: { amount: 30, due_date: 1790812800 } };
            const result = await api.updateInstalmentSupplierBill(1, 2, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/instalments/2/update",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#listSchedulesSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.listSchedulesSupplierBill(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "get",
                    url: "http://localhost:3000/supplier_bills/1/schedules",
                    options: options
                }
            ]);
        });
    });

    describe("#createScheduleSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill_schedule: { name: "Monthly", amount: 30, interval_days: 30, next_due_date: 1790812800 } };
            const result = await api.createScheduleSupplierBill(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/schedules",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#updateScheduleSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { supplier_bill_schedule: { name: "Monthly", amount: 30, interval_days: 30, next_due_date: 1790812800 } };
            const result = await api.updateScheduleSupplierBill(1, 2, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/schedules/2/update",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#listMessagesSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.listMessagesSupplierBill(1, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "get",
                    url: "http://localhost:3000/supplier_bills/1/messages",
                    options: options
                }
            ]);
        });
    });

    describe("#createMessageSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { body: "Receipt reference" };
            const result = await api.createMessageSupplierBill(1, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/messages",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#updateMessageSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const payload = { body: "Receipt reference" };
            const result = await api.updateMessageSupplierBill(1, 2, payload);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "post",
                    url: "http://localhost:3000/supplier_bills/1/messages/2/update",
                    options: { dataJ: payload }
                }
            ]);
        });
    });

    describe("#deleteMessageSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.deleteMessageSupplierBill(1, 2, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "delete",
                    url: "http://localhost:3000/supplier_bills/1/messages/2",
                    options: options
                }
            ]);
        });
    });

    describe("#deleteFileMessageSupplierBill()", function() {
        it("should preserve the request and response contract", async () => {
            const options = {
                params: { "filters[]": ["supplier:equals:7"], start_record: 10, number_records: 5 }
            };
            const result = await api.deleteFileMessageSupplierBill(1, 2, 3, options);
            assert.strictEqual(result, response);
            assert.deepStrictEqual(requests, [
                {
                    method: "delete",
                    url: "http://localhost:3000/supplier_bills/1/messages/2/files/3",
                    options: options
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
            await api.createMessageSupplierBill(1, payload);
            await api.updateMessageSupplierBill(1, 2, payload);
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
            await api.createMessageSupplierBill(1, { body: "", files: [] });
            assert.deepStrictEqual(requests[0].options, { dataJ: { body: "" } });
            await api.createMessageSupplierBill(1, {
                files: [{ arrayBuffer: async () => new ArrayBuffer(0) }]
            });
            assert.deepStrictEqual(requests[1].options, {
                dataM: {
                    body: "",
                    files: [["file", "application/octet-stream", new Uint8Array(0)]]
                }
            });
        });

        it("should propagate file read errors before posting", async () => {
            const error = new Error("Cannot read receipt");
            await assert.rejects(
                api.createMessageSupplierBill(1, {
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

    describe("#errors()", function() {
        it("should preserve server errors", async () => {
            const error = new Error("Permission denied");
            api.get = async () => {
                throw error;
            };
            await assert.rejects(api.getSupplierBill(1), error);
        });
    });
});
