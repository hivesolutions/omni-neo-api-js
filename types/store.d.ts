import { APIOptions } from "yonius";
import { Base } from "./base";

export class Store extends Base {}

export declare interface StoreAPI {
    listStores(options?: APIOptions): Promise<Store[]>;
}
