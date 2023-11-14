import { APIOptions } from "yonius";
import { Base } from "./base";
import { SaleLine } from "./sale-line";

export class Sale extends Base {
    sale_lines: SaleLine[];
}

export declare interface SaleAPI {
    listSales(options?: APIOptions): Promise<Sale[]>;
    getSale(objectId: number, options?: APIOptions): Promise<Sale>;
}
