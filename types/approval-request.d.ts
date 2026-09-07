import { APIOptions } from "yonius";
import { Base } from "./base";
import { Employee } from "./employee";

export class ApprovalRequest extends Base {
    extended_identifier: string;
    operation_type: string;
    payload: string;
    amount: number | null;
    reason: string | null;
    decision_reason: string | null;
    decision_date: number | null;
    workflow_state: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    maker?: Employee | null;
    checker?: Employee | null;
    result?: Base | null;
    result_cid: number | null;
    result_entity_name: string | null;
}

export class ApprovalRequestReasonPayload {
    reason: string;
}

export declare interface ApprovalRequestAPI {
    listApprovalRequests(options?: APIOptions): Promise<ApprovalRequest[]>;
    getApprovalRequest(objectId: number, options?: APIOptions): Promise<ApprovalRequest>;
    approveApprovalRequest(objectId: number, options?: APIOptions): Promise<ApprovalRequest>;
    rejectApprovalRequest(
        objectId: number,
        payload: ApprovalRequestReasonPayload
    ): Promise<ApprovalRequest>;
    withdrawApprovalRequest(objectId: number, options?: APIOptions): Promise<ApprovalRequest>;
}
