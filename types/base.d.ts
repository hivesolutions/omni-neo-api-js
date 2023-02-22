import { API as BaseAPI } from "yonius";

import { UserAPI } from "./user";
import { StoreAPI } from "./store";
import { Repair, RepairAPI } from "./repair";
import { SaleSnapshotAPI } from "./sale-snapshot";

interface APIInterface extends UserAPI, StoreAPI, RepairAPI, SaleSnapshotAPI {
    ping(): Promise<object>;
}

export declare class API extends BaseAPI implements APIInterface {
    ping(): Promise<object>;

    selfUser(options?: object): Promise<object>;

    listStores(options?: object): Promise<object[]>;

    listRepairs(options?: object): Promise<Repair[]>;
    createRepair(payload: Repair): Promise<Repair>;
    getRepair(objectId: number, options?: object): Promise<Repair>;
    updateRepair(objectId: number, payload: object): Promise<Repair>;
    deleteRepair(objectId: number, options?: object): Promise<Record<string, unknown>>;

    statsSaleSnapshot(options?: object): Promise<object[]>;
}
