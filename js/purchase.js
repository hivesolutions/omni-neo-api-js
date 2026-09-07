export const PurchaseAPI = superclass =>
    class extends superclass {
        async listPurchases(options = {}) {
            const url = `${this.baseUrl}purchases`;
            const response = await this.get(url, options);
            return response;
        }

        async createPurchase(payload) {
            const url = `${this.baseUrl}purchases`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getPurchase(objectId, options = {}) {
            const url = `${this.baseUrl}purchases/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default PurchaseAPI;
