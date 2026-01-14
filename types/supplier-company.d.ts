import { APIOptions } from "yonius";

import { Contactable, ContactableDelta } from "./contactable";

export class SupplierCompany extends Contactable {
    representation: string;
    supplier_code: string;
    tax_number?: string;
    preferred_name?: string;
    observations?: string;
    ownership_equity?: number;
    corporate_registration_entity?: string;
    corporate_registration_code?: string;
}

export class SupplierCompanyDelta extends ContactableDelta {
    representation?: string;
    supplier_code?: string;
    tax_number?: string;
    preferred_name?: string;
    observations?: string;
    ownership_equity?: number;
    corporate_registration_entity?: string;
    corporate_registration_code?: string;
}

export declare interface SupplierCompanyAPI {
    listSupplierCompanies(options?: APIOptions): Promise<SupplierCompany[]>;
    getSupplierCompany(objectId: number, options?: APIOptions): Promise<SupplierCompany>;
}
