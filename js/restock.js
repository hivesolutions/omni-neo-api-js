export const RestockAPI = superclass =>
    class extends superclass {
        async listRestocks(options = {}) {
            const url = `${this.baseUrl}restocks`;
            const response = await this.get(url, options);
            return response;
        }

        async createRestock(payload) {
            const url = `${this.baseUrl}restocks`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getRestock(objectId, options = {}) {
            const url = `${this.baseUrl}restocks/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async updateRestock(objectId, payload) {
            const url = `${this.baseUrl}restocks/${objectId}/update`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getStocksRestock(objectId, options = {}) {
            const url = `${this.baseUrl}restocks/${objectId}/stocks`;
            const response = await this.get(url, options);
            return response;
        }

        async generateRestock(objectId, options = {}) {
            const url = `${this.baseUrl}restocks/${objectId}/generate`;
            const response = await this.post(url, options);
            return response;
        }

        async cancelRestock(objectId, options = {}) {
            const url = `${this.baseUrl}restocks/${objectId}/cancel`;
            const response = await this.post(url, options);
            return response;
        }
    };

export default RestockAPI;
