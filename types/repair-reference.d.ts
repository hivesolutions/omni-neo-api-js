import { APIOptions } from "yonius";
import { BaseNeo, BaseNeoPayload } from "./base";

export class RepairReference extends BaseNeo {
    owner: number;
    reference_payload: Record<string, unknown>;
}

export class RepairReferencePayload extends BaseNeoPayload {
    owner?: number;
    reference_payload?: Record<string, unknown>;
}

export class RepairSlip extends BaseNeo {}

export declare interface RepairReferenceAPI {
    listRepairReferences(options?: APIOptions): Promise<RepairReference[]>;
    createRepairReference(payload: RepairReferencePayload): Promise<RepairReference>;
    getRepairReference(objectId: number, options?: APIOptions): Promise<RepairReference>;
    issueRepairSlipRepairReference(objectId: number, options?: APIOptions): Promise<RepairSlip>;
}
