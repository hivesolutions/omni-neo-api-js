import { APIOptions } from "yonius";
import { Base } from "./base";

export class SaleSnapshot extends Base {}

export declare interface SaleSnapshotAPI {
    statsSaleSnapshot(options?: APIOptions): Promise<SaleSnapshot[]>;
}
