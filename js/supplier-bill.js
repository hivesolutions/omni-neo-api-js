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

        async approveSupplierBill(objectId, options = {}) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/approve`;
            const response = await this.put(url, options);
            return response;
        }

        async requestSupplierBill(objectId, options = {}) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/request`;
            const response = await this.post(url, options);
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

        async requestPaymentSupplierBill(objectId, payload) {
            const url = `${this.baseUrl}supplier_bills/${objectId}/payments/request`;
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

const _messagePayloadOptions = async payload => {
    const files = payload && payload.files;
    if (!files || files.length === 0) {
        const { files: _ignored, ...rest } = payload || {};
        return { dataJ: rest };
    }
    const dataM = { body: payload.body || "" };
    dataM.files = await Promise.all(
        files.map(async file => [
            file.name || "file",
            file.type || "application/octet-stream",
            new Uint8Array(await file.arrayBuffer())
        ])
    );
    return { dataM: dataM };
};

export default SupplierBillAPI;
