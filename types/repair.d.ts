import { APIOptions } from "yonius";
import { BaseNeo, BaseNeoPayload } from "./base";

export enum RepairStatus {
    opened = "opened",
    approved = "approved",
    rejected = "rejected",
    quotation = "quotation",
    received = "received",
    sent = "sent",
    closed = "closed",
}

export enum RepairType {
    warranty = "warranty",
    quotation = "quotation",
}

export class Repair extends BaseNeo {
    title: string;
    status: RepairStatus;
    owner: number;
    employee: number;
    customer?: string;
    supplier?: string;
    description?: string;
}

export class RepairPayload extends BaseNeoPayload {
    title?: string;
    status?: RepairStatus;
    owner?: number;
    employee?: number;
    customer?: string;
    supplier?: string;
    description?: string;
}

export declare interface RepairAPI {
    listRepairs(options?: APIOptions): Promise<Repair[]>;
    createRepair(payload: RepairPayload): Promise<Repair>;
    getRepair(objectId: number, options?: APIOptions): Promise<Repair>;
    updateRepair(objectId: number, payload: RepairPayload): Promise<Repair>;
    deleteRepair(objectId: number, options?: APIOptions): Promise<Record<string, unknown>>;
}
