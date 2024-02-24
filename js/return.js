export const ReturnAPI = superclass =>
    class extends superclass {
        async listReturns(options = {}) {
            const url = `${this.baseUrl}returns`;
            const response = await this.get(url, options);
            return response;
        }

        async getReturn(objectId, options = {}) {
            const url = `${this.baseUrl}returns/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default ReturnAPI;
