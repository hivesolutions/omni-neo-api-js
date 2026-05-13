export const RepairOperationAPI = superclass =>
    class extends superclass {
        async listRepairOperations(options = {}) {
            const url = `${this.baseUrl}repair_operations`;
            const response = await this.get(url, options);
            return response;
        }

        async createRepairOperation(payload) {
            const url = `${this.baseUrl}repair_operations`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async updateRepairOperation(objectId, payload) {
            const url = `${this.baseUrl}repair_operations/${objectId}/update`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async approveRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/approve`;
            const response = await this.put(url, options);
            return response;
        }

        async rejectRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/reject`;
            const response = await this.put(url, options);
            return response;
        }

        async quoteRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/quote`;
            const response = await this.put(url, options);
            return response;
        }

        async receiveRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/receive`;
            const response = await this.put(url, options);
            return response;
        }

        async sendRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/send`;
            const response = await this.put(url, options);
            return response;
        }

        async closeRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/close`;
            const response = await this.put(url, options);
            return response;
        }

        async issueRepairSlipRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/issue_repair_slip`;
            const response = await this.post(url, options);
            return response;
        }

        async listMessagesRepairOperation(objectId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/messages`;
            const response = await this.get(url, options);
            return response;
        }

        async createMessageRepairOperation(objectId, payload) {
            const url = `${this.baseUrl}repair_operations/${objectId}/messages`;
            const options = await _messagePayloadOptions(payload);
            const response = await this.post(url, options);
            return response;
        }

        async updateMessageRepairOperation(objectId, messageId, payload) {
            const url = `${this.baseUrl}repair_operations/${objectId}/messages/${messageId}/update`;
            const options = await _messagePayloadOptions(payload);
            const response = await this.post(url, options);
            return response;
        }

        async deleteMessageRepairOperation(objectId, messageId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/messages/${messageId}`;
            const response = await this.delete(url, options);
            return response;
        }

        async deleteFileMessageRepairOperation(objectId, messageId, fileId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${objectId}/messages/${messageId}/files/${fileId}`;
            const response = await this.delete(url, options);
            return response;
        }
    };

const _messagePayloadOptions = async payload => {
    const files = payload && payload.files;
    if (!files || files.length === 0) {
        const { files: _ignored, ...rest } = payload || {};
        return { dataJ: rest };
    }
    const dataM = { body: payload.body || "" };
    dataM.files = await Promise.all(
        files.map(async file => [
            file.name || "file",
            file.type || "application/octet-stream",
            new Uint8Array(await file.arrayBuffer())
        ])
    );
    return { dataM: dataM };
};

export default RepairOperationAPI;
