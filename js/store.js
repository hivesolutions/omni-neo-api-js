export const StoreAPI = superclass =>
    class extends superclass {
        async listStores(options = {}) {
            const url = `${this.baseUrl}stores`;
            const response = await this.get(url, options);
            return response;
        }

        async getStore(objectId, options = {}) {
            const url = `${this.baseUrl}stores/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default StoreAPI;
