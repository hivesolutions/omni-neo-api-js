export const MessageWorkflowAPI = superclass =>
    class extends superclass {
        async listMessageWorkflow(operationId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${operationId}/messages`;
            const response = await this.get(url, options);
            return response;
        }

        async createMessageWorkflow(operationId, payload) {
            const url = `${this.baseUrl}repair_operations/${operationId}/messages`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async updateMessageWorkflow(operationId, messageId, payload) {
            const url = `${this.baseUrl}repair_operations/${operationId}/messages/${messageId}/update`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async deleteMessageWorkflow(operationId, messageId, options = {}) {
            const url = `${this.baseUrl}repair_operations/${operationId}/messages/${messageId}`;
            const response = await this.delete(url, options);
            return response;
        }
    };

export default MessageWorkflowAPI;
