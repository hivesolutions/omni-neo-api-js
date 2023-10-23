export const InventoryLineAPI = superclass =>
    class extends superclass {
        async listInventoryLines(options = {}) {
            const url = `${this.baseUrl}inventory_lines`;
            const response = await this.get(url, options);
            return response;
        }

        async getInventoryLine(objectId, options = {}) {
            const url = `${this.baseUrl}inventory_lines/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async updateInventoryLine(objectId, payload) {
            const url = `${this.baseUrl}inventory_lines/${objectId}/update`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }
    };

export default InventoryLineAPI;
