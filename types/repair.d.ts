export class Base {
    id?: string;
    object_id?: number;
    created?: number;
    modified?: number;
    meta?: Record<string, unknown>;
}

export enum RepairStatus {
    opened = "opened",
    approved = "approved",
    rejected = "rejected"
}

export class Repair extends Base {
    status?: RepairStatus;
    owner?: number;
    employee?: number;
    comment?: string;
}

export declare interface RepairAPI {
    listRepairs(options?: object): Promise<Repair[]>;
    createRepair(payload: Repair): Promise<Repair>;
    getRepair(objectId: number, options?: object): Promise<Repair>;
    updateRepair(objectId: number, payload: object): Promise<Repair>;
    deleteRepair(objectId: number, options?: object): Promise<Record<string, unknown>>;
}
