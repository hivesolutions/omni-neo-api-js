export const StoreAPI = superclass =>
    class extends superclass {
        async listStores(options = {}) {
            const url = `${this.baseUrl}stores`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default StoreAPI;
