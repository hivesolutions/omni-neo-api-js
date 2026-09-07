import { APIOptions } from "yonius";
import { Base, BaseDelta } from "./base";
import { Supplier } from "./supplier";
import { Store } from "./store";

export class Purchase extends Base {
    extended_identifier: string;
    date: number;
    vat: number;
    discount: number;
    price?: {
        value: number;
        currency: string;
        reference_currency?: string;
        exchange_rate?: number;
    };

    supplier?: Supplier | number | null;
    billing_site?: Store | number | null;
    delivery_site?: Store | number | null;
    purchase_lines?: Base[];
    document?: Base | number | null;
}

export class PurchaseDelta extends BaseDelta {
    date?: number;
    supplier?: { object_id: number };
    delivery_site?: { object_id: number };
    billing_site?: { object_id: number };
    purchase_lines: {
        merchandise: { object_id: number };
        quantity: number;
        unit_price?: { value: number; currency?: string };
    }[];
}

export class PurchasePayload {
    purchase_transaction: PurchaseDelta;
    document?: BaseDelta;
}

export declare interface PurchaseAPI {
    listPurchases(options?: APIOptions): Promise<Purchase[]>;
    createPurchase(payload: PurchasePayload): Promise<Purchase>;
    getPurchase(objectId: number, options?: APIOptions): Promise<Purchase>;
}
