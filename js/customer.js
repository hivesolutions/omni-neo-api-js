export const CustomerAPI = superclass =>
    class extends superclass {
        async listCustomers(options = {}) {
            const url = `${this.baseUrl}customers.json`;
            const response = await this.get(url, options);
            return response;
        }

        async getCustomer(objectId, options = {}) {
            const url = `${this.baseUrl}customers/${objectId}.json`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default CustomerAPI;
