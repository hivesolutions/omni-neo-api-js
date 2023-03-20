import { APIOptions } from "yonius";
import { Base, BaseDelta } from "./base";

export class Merchandise extends Base {
    company_product_code: string;
    barcode: string;
}

export class MerchandiseDelta extends BaseDelta {
    company_product_code?: string;
    barcode?: string;
}

export class MerchandisePayload {
    merchandise?: MerchandiseDelta;
}

export declare interface MerchandiseAPI {
    listMerchandise(options?: APIOptions): Promise<Merchandise[]>;
    updateMerchandise(payload: MerchandisePayload): Promise<Merchandise>;
    listStoreMerchandise(storeId: number, options?: APIOptions): Promise<Merchandise[]>;
}
