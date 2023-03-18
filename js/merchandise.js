export const MerchandiseAPI = superclass =>
    class extends superclass {
        async listMerchandise(options = {}) {
            const url = `${this.baseUrl}merchandise`;
            const response = await this.get(url, options);
            return response;
        }

        async updateMerchandise(objectId, payload) {
            const url = `${this.baseUrl}merchandise/${objectId}/update`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async listStoreMerchandise(storeId, options = {}) {
            const url = `${this.baseUrl}merchandise/store`;
            options.params = options.params !== undefined ? options.params : {};
            options.params.store_id = storeId;
            const response = await this.get(url, options);
            return response;
        }
    };

export default MerchandiseAPI;
