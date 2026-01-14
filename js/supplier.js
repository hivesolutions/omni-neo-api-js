export const SupplierAPI = superclass =>
    class extends superclass {
        async listSuppliers(options = {}) {
            const url = `${this.baseUrl}suppliers.json`;
            const response = await this.get(url, options);
            return response;
        }

        async getSupplier(objectId, options = {}) {
            const url = `${this.baseUrl}suppliers/${objectId}.json`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default SupplierAPI;
