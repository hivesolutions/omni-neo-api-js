export const SaleAPI = superclass =>
    class extends superclass {
        async listSales(options = {}) {
            const url = `${this.baseUrl}sales`;
            const response = await this.get(url, options);
            return response;
        }

        async getSale(objectId, options = {}) {
            const url = `${this.baseUrl}sales/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default SaleAPI;
