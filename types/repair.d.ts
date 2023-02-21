export declare interface RepairAPI {
    listRepairs(options: object): Promise<object[]>;
    createRepair(payload): Promise<object>;
    getRepair(objectId: number, options: object): Promise<object>;
    updateRepair(objectId: number, payload: object): Promise<object>;
    deleteRepair(objectId: number, options: object): Promise<object>;
}
