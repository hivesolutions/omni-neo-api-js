import { APIOptions } from "yonius";
import { NamedNode, NamedNodeDelta } from "./named-node";

export class Merchandise extends NamedNode {
    company_product_code: string;
    barcode: string;
    ean: string;
}

export class MerchandiseDelta extends NamedNodeDelta {
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
