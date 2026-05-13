import { APIOptions } from "yonius";
import { Base, BaseDelta } from "./base";
import { RepairSlip } from "./repair-reference";

export enum RepairOperationType {
    warranty = 1,
    quotation = 2
}

export enum RepairOperationPriority {
    low = 1,
    medium = 2,
    high = 3
}

export enum RepairOperationState {
    unset = 1,
    opened = 2,
    approved = 3,
    rejected = 4,
    quotation = 5,
    received = 6,
    sent = 7,
    closed = 8
}

export class RepairOperation extends Base {
    title: string;
    repair_type: RepairOperationType;
    item_reference?: string;
    sale_identifier?: string;
    item_damage?: string;
    problem_description?: string;
    repair_description?: string;
    description?: string;
    estimated_date?: number;
    priority?: RepairOperationPriority;
    supplier_reference?: string;
    workflow_state: RepairOperationState;
    owner: number;
    employee?: number;
    customer: number;
    supplier?: number;
    repair_slip?: number;
    sale_transaction?: number;
    price?: number;
}

export class RepairOperationDelta extends BaseDelta {
    title?: string;
    repair_type?: RepairOperationType;
    item_reference?: string;
    sale_identifier?: string;
    item_damage?: string;
    problem_description?: string;
    repair_description?: string;
    description?: string;
    estimated_date?: number;
    priority?: RepairOperationPriority;
    supplier_reference?: string;
    owner?: number;
    employee?: number;
    customer?: number;
    supplier?: number;
    sale_transaction?: number;
}

export class RepairOperationPayload {
    repair_operation?: RepairOperationDelta;
}

export declare interface RepairOperationAPI {
    listRepairOperations(options?: APIOptions): Promise<RepairOperation[]>;
    createRepairOperation(payload: RepairOperationPayload): Promise<RepairOperation>;
    getRepairOperation(objectId: number, options?: APIOptions): Promise<RepairOperation>;
    updateRepairOperation(
        objectId: number,
        payload: RepairOperationPayload
    ): Promise<RepairOperation>;
    approveRepairOperation(objectId: number, options?: APIOptions): Promise<RepairOperation>;
    rejectRepairOperation(objectId: number, options?: APIOptions): Promise<RepairOperation>;
    quoteRepairOperation(objectId: number, options?: APIOptions): Promise<RepairOperation>;
    receiveRepairOperation(objectId: number, options?: APIOptions): Promise<RepairOperation>;
    sendRepairOperation(objectId: number, options?: APIOptions): Promise<RepairOperation>;
    closeRepairOperation(objectId: number, options?: APIOptions): Promise<RepairOperation>;
    issueRepairSlipRepairOperation(objectId: number, options?: APIOptions): Promise<RepairSlip>;
}
