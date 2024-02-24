import { APIOptions } from "yonius";
import { Operation } from "./operation";
import { SaleLine } from "./sale-line";
import { FunctionalUnit } from "./functional-unit";

export class Sale extends Operation {
    seller_stockholder: FunctionalUnit;
    sale_lines: SaleLine[];
}

export declare interface SaleAPI {
    listSales(options?: APIOptions): Promise<Sale[]>;
    getSale(objectId: number, options?: APIOptions): Promise<Sale>;
}
