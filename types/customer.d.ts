import { APIOptions } from "yonius";
import { Contactable, ContactableDelta } from "./contactable";

export class Customer extends Contactable {
    representation: string;
    customer_code: string;
    tax_number?: string;
    preferred_name?: string;
    physical_signature?: number;
    customer_since?: number;
    last_purchase?: number;
    number_purchases?: number;
    total_amount?: number;
    average_amount?: number;
    observations?: string;
}

export class CustomerDelta extends ContactableDelta {
    representation?: string;
    customer_code?: string;
    tax_number?: string;
    preferred_name?: string;
    physical_signature?: number;
    customer_since?: number;
    last_purchase?: number;
    number_purchases?: number;
    total_amount?: number;
    average_amount?: number;
    observations?: string;
}

export declare interface CustomerAPI {
    listCustomers(options?: APIOptions): Promise<Customer[]>;
    getCustomer(objectId: number, options?: APIOptions): Promise<Customer>;
}
