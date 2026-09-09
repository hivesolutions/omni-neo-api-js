import { _messagePayloadOptions } from "./workflow-message";

export const SupplierBillAPI = superclass =>
    class extends superclass {
        async listSupplierBills(options = {}) {
            const url = `${this.baseUrl}supplier_bills`;
            const response = await this.get(url, options);
            return response;
        }

        async getPermissionsSupplierBill(options = {}) {
            const url = `${this.baseUrl}supplier_bills/permissions`;
            const response = await this.get(url, options);
            return response;
        }

        async createSupplierBill(payload) {
            const url = `${this.baseUrl}supplier_bills`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getSupplierBill(objectId, options = {}) {
            const url = `${this.baseUrl}supplier_bills/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async updateSupplierBill(objectId, payload) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/update`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async cancelSupplierBill(objectId, payload) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/cancel`;
            const response = await this.put(url, { dataJ: payload });
            return response;
        }

        async reportSupplierBills(options = {}) {
            const url = `${this.baseUrl}supplier_bills/report`;
            const response = await this.get(url, options);
            return response;
        }

        async exportSupplierBills(options = {}) {
            const url = `${this.baseUrl}supplier_bills/export.csv`;
            const response = await this.get(url, options);
            return response;
        }

        async createPaymentSupplierBill(objectId, payload) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/payments`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async reversePaymentSupplierBill(objectId, paymentId, payload) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/payments/${paymentId}/reverse`;
            const response = await this.put(url, { dataJ: payload });
            return response;
        }

        async listMessagesSupplierBill(objectId, options = {}) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/messages`;
            const response = await this.get(url, options);
            return response;
        }

        async createMessageSupplierBill(objectId, payload) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/messages`;
            const options = await _messagePayloadOptions(payload);
            const response = await this.post(url, options);
            return response;
        }

        async updateMessageSupplierBill(objectId, messageId, payload) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/messages/${messageId}/update`;
            const options = await _messagePayloadOptions(payload);
            const response = await this.post(url, options);
            return response;
        }

        async deleteMessageSupplierBill(objectId, messageId, options = {}) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/messages/${messageId}`;
            const response = await this.delete(url, options);
            return response;
        }

        async deleteFileMessageSupplierBill(objectId, messageId, fileId, options = {}) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/messages/${messageId}/files/${fileId}`;
            const response = await this.delete(url, options);
            return response;
        }
    };

export default SupplierBillAPI;
