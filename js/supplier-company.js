export const SupplierCompanyAPI = superclass =>
    class extends superclass {
        async listSupplierCompanies(options = {}) {
            const url = `${this.baseUrl}supplier_companies.json`;
            const response = await this.get(url, options);
            return response;
        }

        async getSupplierCompany(objectId, options = {}) {
            const url = `${this.baseUrl}supplier_companies/${objectId}.json`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default SupplierCompanyAPI;
