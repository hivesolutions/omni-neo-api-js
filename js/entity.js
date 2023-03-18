export const EntityAPI = superclass =>
    class extends superclass {
        async listEntities(options = {}) {
            const url = `${this.baseUrl}entities`;
            const response = await this.get(url, options);
            return response;
        }

        async getEntity(objectId, options = {}) {
            const url = `${this.baseUrl}entities/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async updateEntity(objectId, options = {}) {
            const url = `${this.baseUrl}entities/${objectId}/update`;
            const response = await this.post(url, options);
            return response;
        }

        async sequenceEntity(objectId, options = {}) {
            const url = `${this.baseUrl}entities/${objectId}/sequence`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default EntityAPI;
