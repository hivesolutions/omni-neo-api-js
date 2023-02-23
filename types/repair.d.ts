import { APIOptions } from "yonius";
import { BaseNeo } from "./base";

export enum RepairStatus {
    opened = "opened",
    approved = "approved",
    rejected = "rejected"
}

export class Repair extends BaseNeo {
    status: RepairStatus;
    owner: number;
    employee: number;
    comment: string;
}

export class RepairPayload extends BaseNeoPayload {
    status?: RepairStatus;
    owner?: number;
    employee?: number;
    comment?: string;
}

export declare interface RepairAPI {
    listRepairs(options?: APIOptions): Promise<Repair[]>;
    createRepair(payload: RepairPayload): Promise<Repair>;
    getRepair(objectId: number, options?: APIOptions): Promise<Repair>;
    updateRepair(objectId: number, payload: RepairPayload): Promise<Repair>;
    deleteRepair(objectId: number, options?: APIOptions): Promise<Record<string, unknown>>;
}
