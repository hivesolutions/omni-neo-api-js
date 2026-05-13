import { APIOptions } from "yonius";
import { FunctionalUnit } from "./functional-unit";

export class Store extends FunctionalUnit {
    store_code: string;
}

export declare interface StoreAPI {
    listStores(options?: APIOptions): Promise<Store[]>;
    getStore(objectId: number, options?: APIOptions): Promise<Store>;
}
