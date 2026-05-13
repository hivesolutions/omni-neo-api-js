export const EmployeeAPI = superclass =>
    class extends superclass {
        async listEmployees(options = {}) {
            const url = `${this.baseUrl}employees.json`;
            const response = await this.get(url, options);
            return response;
        }

        async createEmployee(payload) {
            const url = `${this.baseUrl}employees.json`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async selfEmployee(options = {}) {
            const url = `${this.baseUrl}employees/self.json`;
            const response = await this.get(url, options);
            return response;
        }

        async getEmployee(objectId, options = {}) {
            const url = `${this.baseUrl}employees/${objectId}.json`;
            const response = await this.get(url, options);
            return response;
        }

        async updateEmployee(objectId, payload) {
            const url = `${this.baseUrl}employees/${objectId}/update.json`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async deleteEmployee(objectId, options = {}) {
            const url = `${this.baseUrl}employees/${objectId}/delete.json`;
            const response = await this.post(url, options);
            return response;
        }
    };

export default EmployeeAPI;
