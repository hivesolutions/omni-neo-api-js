export const RepairReferenceAPI = superclass =>
    class extends superclass {
        async listRepairReferences(options = {}) {
            const url = `${this.baseUrl}repair_references`;
            const response = await this.get(url, options);
            return response;
        }

        async createRepairReference(payload) {
            const url = `${this.baseUrl}repair_references`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getRepairReference(objectId, options = {}) {
            const url = `${this.baseUrl}repair_references/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async issueRepairSlipRepairReference(objectId, options = {}) {
            const url = `${this.baseUrl}repair_references/${objectId}/issue_repair_slip`;
            const response = await this.post(url, options);
            return response;
        }
    };

export default RepairReferenceAPI;
