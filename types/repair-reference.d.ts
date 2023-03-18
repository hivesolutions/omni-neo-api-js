import { APIOptions } from "yonius";
import { Base, BaseDelta } from "./base";

export class RepairReference extends Base {
    owner: number;
    reference_id: string;
    reference_payload: Record<string, unknown>;
}

export class RepairReferenceDelta extends BaseDelta {
    owner?: number;
    reference_id?: string;
    reference_payload?: Record<string, unknown>;
}

export class RepairReferencePayload {
    repair_reference?: RepairReferenceDelta;
}

export class RepairSlip extends BaseNeo {}

export declare interface RepairReferenceAPI {
    listRepairReferences(options?: APIOptions): Promise<RepairReference[]>;
    createRepairReference(payload: RepairReferencePayload): Promise<RepairReference>;
    getRepairReference(objectId: number, options?: APIOptions): Promise<RepairReference>;
    issueRepairSlipRepairReference(objectId: number, options?: APIOptions): Promise<RepairSlip>;
}
