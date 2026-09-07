export const ApprovalRequestAPI = superclass =>
    class extends superclass {
        async listApprovalRequests(options = {}) {
            const url = `${this.baseUrl}approval_requests`;
            const response = await this.get(url, options);
            return response;
        }

        async getApprovalRequest(objectId, options = {}) {
            const url = `${this.baseUrl}approval_requests/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async approveApprovalRequest(objectId, options = {}) {
            const url = `${this.baseUrl}approval_requests/${objectId}/approve`;
            const response = await this.post(url, options);
            return response;
        }

        async rejectApprovalRequest(objectId, payload) {
            const url = `${this.baseUrl}approval_requests/${objectId}/reject`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async withdrawApprovalRequest(objectId, options = {}) {
            const url = `${this.baseUrl}approval_requests/${objectId}/withdraw`;
            const response = await this.post(url, options);
            return response;
        }
    };

export default ApprovalRequestAPI;
