import { APIOptions } from "yonius";
import { Base, BaseDelta } from "./base";
import { User } from "./user";
import { Store } from "./store";
import { Purchase } from "./purchase";
import { Supplier } from "./supplier";
import { ApprovalRequest } from "./approval-request";
import { WorkflowEvent, WorkflowMessage, WorkflowMessagePayload } from "./workflow-message";

export class SupplierBillInstalment extends Base {
    due_date: number;
    amount: number;
    enabled: 0 | 1;
    outstanding_amount?: number;
}

export class SupplierBillInstalmentDelta extends BaseDelta {
    due_date?: number;
    amount?: number;
    enabled?: 0 | 1;
}

export class SupplierBillInstalmentPayload {
    supplier_bill_instalment: SupplierBillInstalmentDelta;
}

export class SupplierBillPayment extends Base {
    extended_identifier: string;
    entry_type: 1 | 2 | 3 | 4 | 5;
    applied_amount: number;
    application_date: number;
    currency: string;
    request_key: string;
    payment_method: string;
    reversed: 0 | 1;
    reversal_date: number | null;
    reversal_reason: string | null;
    previous_balance: number;
    resulting_balance: number;
    settled_amount: number;
    returned_amount: number;
    supplier_bill: Base;
    source_bill: Base | null;
    supplier_return: Base | null;
    instalment: SupplierBillInstalment | null;
    payment: Base | null;
    create_user: User | null;
    modify_user: User | null;
}

export class SupplierBillPaymentDelta extends BaseDelta {
    entry_type?: 1 | 2 | 3 | 4 | 5;
    applied_amount: number;
    application_date?: number;
    currency: string;
    description: string;
    request_key: string;
    payment_method?: "BankTransferPayment" | "CashPayment" | "CheckPayment" | "CustomPayment";
    source_bill?: { object_id: number };
    supplier_return?: { object_id: number };
    instalment?: { object_id: number };
}

export class SupplierBillPaymentPayload {
    supplier_bill_payment: SupplierBillPaymentDelta;
}

export class SupplierBill extends Base {
    extended_identifier: string;
    bill_date: number;
    due_date: number;
    reference: string | null;
    payment_terms_days: number;
    currency: string;
    reference_currency: string | null;
    exchange_rate: number | null;
    amount_vat: number;
    paid_amount: number;
    adjusted_amount: number;
    outstanding_amount: number;
    credit_amount: number;
    balance_confirmed: 0 | 1;
    notified_date: number | null;
    observations: string | null;
    workflow_state: 1 | 2 | 3;
    purchase: Purchase;
    supplier: Supplier;
    billing_site: Store | null;
    settlement_state: "unconfirmed" | "unpaid" | "partially_paid" | "paid";
    aging_bucket: "current" | "1-30" | "31-60" | "61-90" | "90+";
    overdue: boolean;
    bill_payments?: SupplierBillPayment[];
    instalments?: SupplierBillInstalment[];
}

export class SupplierBillDelta extends BaseDelta {
    purchase?: { object_id: number };
    bill_date?: number;
    due_date?: number;
    reference?: string | null;
    payment_terms_days?: number;
    observations?: string | null;
}

export class SupplierBillPayload {
    supplier_bill: SupplierBillDelta;
}

export class SupplierBillSchedule extends Base {
    name: string;
    amount: number;
    interval_days: number;
    next_due_date: number;
    enabled: 0 | 1;
    recursion_string: string;
    last_execution_date: number | null;
}

export class SupplierBillScheduleDelta extends BaseDelta {
    name?: string;
    amount?: number;
    interval_days?: number;
    next_due_date?: number;
    enabled?: 0 | 1;
}

export class SupplierBillSchedulePayload {
    supplier_bill_schedule: SupplierBillScheduleDelta;
}

export class SupplierBillReasonPayload {
    reason: string;
}

export class SupplierBillBalance {
    supplier: Supplier;
    currency: string;
    outstanding_amount: number;
    credit_amount: number;
    paid_amount: number;
    buckets: Record<"current" | "1-30" | "31-60" | "61-90" | "90+", number>;
}

export class SupplierBillReport {
    balances: SupplierBillBalance[];
    unconfirmed_count: number;
}

export declare interface SupplierBillAPI {
    listSupplierBills(options?: APIOptions): Promise<SupplierBill[]>;
    getPermissionsSupplierBill(options?: APIOptions): Promise<Record<string, boolean>>;
    createSupplierBill(payload: SupplierBillPayload): Promise<SupplierBill>;
    getSupplierBill(objectId: number, options?: APIOptions): Promise<SupplierBill>;
    updateSupplierBill(objectId: number, payload: SupplierBillPayload): Promise<SupplierBill>;
    approveSupplierBill(objectId: number, options?: APIOptions): Promise<SupplierBill>;
    requestSupplierBill(objectId: number, options?: APIOptions): Promise<ApprovalRequest>;
    cancelSupplierBill(objectId: number, payload: SupplierBillReasonPayload): Promise<SupplierBill>;
    reportSupplierBills(options?: APIOptions): Promise<SupplierBillReport>;
    exportSupplierBills(options?: APIOptions): Promise<string | ArrayBuffer>;
    createPaymentSupplierBill(
        objectId: number,
        payload: SupplierBillPaymentPayload
    ): Promise<SupplierBillPayment>;
    requestPaymentSupplierBill(
        objectId: number,
        payload: SupplierBillPaymentPayload
    ): Promise<ApprovalRequest>;
    reversePaymentSupplierBill(
        objectId: number,
        paymentId: number,
        payload: SupplierBillReasonPayload
    ): Promise<SupplierBillPayment>;
    createInstalmentSupplierBill(
        objectId: number,
        payload: SupplierBillInstalmentPayload
    ): Promise<SupplierBillInstalment>;
    updateInstalmentSupplierBill(
        objectId: number,
        instalmentId: number,
        payload: SupplierBillInstalmentPayload
    ): Promise<SupplierBillInstalment>;
    listSchedulesSupplierBill(
        objectId: number,
        options?: APIOptions
    ): Promise<SupplierBillSchedule[]>;
    createScheduleSupplierBill(
        objectId: number,
        payload: SupplierBillSchedulePayload
    ): Promise<SupplierBillSchedule>;
    updateScheduleSupplierBill(
        objectId: number,
        scheduleId: number,
        payload: SupplierBillSchedulePayload
    ): Promise<SupplierBillSchedule>;
    listMessagesSupplierBill(objectId: number, options?: APIOptions): Promise<WorkflowEvent[]>;
    createMessageSupplierBill(
        objectId: number,
        payload: WorkflowMessagePayload
    ): Promise<WorkflowMessage>;
    updateMessageSupplierBill(
        objectId: number,
        messageId: number,
        payload: WorkflowMessagePayload
    ): Promise<WorkflowMessage>;
    deleteMessageSupplierBill(
        objectId: number,
        messageId: number,
        options?: APIOptions
    ): Promise<{ result: string }>;
    deleteFileMessageSupplierBill(
        objectId: number,
        messageId: number,
        fileId: number,
        options?: APIOptions
    ): Promise<{ result: string }>;
}
