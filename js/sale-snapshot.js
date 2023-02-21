export const SaleSnapshotAPI = superclass =>
    class extends superclass {
        async statsSaleSnapshot(options = {}) {
            const url = `${this.baseUrl}sale_snapshots/stats`;
            const response = await this.get(url, options);
            return response;
        }
    };

export default SaleSnapshotAPI;
