import { APIOptions } from "yonius";

import { Contactable, ContactableDelta } from "./contactable";

export class Supplier extends Contactable {
    representation: string;
    supplier_code: string;
    tax_number?: string;
    preferred_name?: string;
    observations?: string;
}

export class SupplierDelta extends ContactableDelta {
    representation?: string;
    supplier_code?: string;
    tax_number?: string;
    preferred_name?: string;
    observations?: string;
}

export declare interface SupplierAPI {
    listSuppliers(options?: APIOptions): Promise<Supplier[]>;
    getSupplier(objectId: number, options?: APIOptions): Promise<Supplier>;
}
