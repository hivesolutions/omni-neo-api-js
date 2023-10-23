import { APIOptions } from "yonius";
import { Base } from "./base";
import { FunctionalUnit } from "./functional-unit";

export class InventoryLine extends Base {
    stock_on_hand: number;
    stock_reserved: number;
    stock_in_transit: number;
    discount: number;
    max_stock: number;
    min_stock: number;
    functional_unit: FunctionalUnit;
}

export class MerchandisePayload {
    merchandise?: MerchandiseDelta;
}

export declare interface InventoryLineAPI {
    listInventoryLines(options?: APIOptions): Promise<InventoryLine[]>;
}
