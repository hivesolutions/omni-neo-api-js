export const RepairAPI = superclass =>
    class extends superclass {
        async listRepairs(options = {}) {
            const url = `${this.baseUrl}repairs`;
            const response = await this.get(url, options);
            return response;
        }

        async createRepair(payload) {
            const url = `${this.baseUrl}repairs`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getRepair(objectId, options = {}) {
            const url = `${this.baseUrl}repairs/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async updateRepair(objectId, payload) {
            const url = `${this.baseUrl}repairs/${objectId}`;
            const response = await this.put(url, { dataJ: payload });
            return response;
        }

        async deleteRepair(objectId, options = {}) {
            const url = `${this.baseUrl}repairs/${objectId}`;
            const response = await this.delete(url, options);
            return response;
        }
    };

export default RepairAPI;
