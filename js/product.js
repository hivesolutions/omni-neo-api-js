export const ProductAPI = superclass =>
    class extends superclass {
        async listProducts(options = {}) {
            const url = `${this.baseUrl}products`;
            const response = await this.get(url, options);
            return response;
        }

        async getProduct(objectId, options = {}) {
            const url = `${this.baseUrl}products/${objectId}`;
            const response = await this.get(url, options);
            return response;
        }

        async updateProduct(objectId, payload) {
            const url = `${this.baseUrl}products/${objectId}/update`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }
    };

export default ProductAPI;
