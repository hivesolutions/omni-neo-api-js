import { APIOptions } from "yonius";
import { FunctionalUnit } from "./functional-unit";

export class Store extends FunctionalUnit {}

export declare interface StoreAPI {
    listStores(options?: APIOptions): Promise<Store[]>;
}
