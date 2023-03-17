import { APIOptions } from "yonius";
import { BaseNeo, BaseNeoDelta } from "./base";

export enum RepairStatus {
    opened = "opened",
    approved = "approved",
    rejected = "rejected",
    quotation = "quotation",
    received = "received",
    sent = "sent",
    closed = "closed"
}

export enum RepairType {
    warranty = "warranty",
    quotation = "quotation"
}

export class Repair extends BaseNeo {
    title: string;
    status: RepairStatus;
    owner: number;
    employee: number;
    customer?: string;
    supplier?: string;
    item_reference?: string;
    sale_identifier?: string;
    repair_type: RepairType;
    item_damage?: string;
    problem_description?: string;
    repair_description?: string;
    description?: string;
    amount?: number;
    currency?: string;
}

export class RepairDelta extends BaseNeoDelta {
    title?: string;
    status?: RepairStatus;
    owner?: number;
    employee?: number;
    customer?: string;
    supplier?: string;
    item_reference?: string;
    sale_identifier?: string;
    repair_type?: RepairType;
    item_damage?: string;
    problem_description?: string;
    repair_description?: string;
    description?: string;
    amount?: number;
    currency?: string;
}

export class RepairPayload {
    repair: RepairDelta;
}

export declare interface RepairAPI {
    listRepairs(options?: APIOptions): Promise<Repair[]>;
    createRepair(payload: RepairPayload): Promise<Repair>;
    getRepair(objectId: number, options?: APIOptions): Promise<Repair>;
    updateRepair(objectId: number, payload: RepairPayload): Promise<Repair>;
    deleteRepair(objectId: number, options?: APIOptions): Promise<Record<string, unknown>>;
}
