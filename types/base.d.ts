import { API as BaseAPI } from "yonius";

import { UserAPI } from "./user";
import { StoreAPI } from "./store";
import { RepairAPI } from "./repair";
import { SaleSnapshotAPI } from "./sale-snapshot";

interface APIInterface extends UserAPI, StoreAPI, RepairAPI, SaleSnapshotAPI {
    ping(): Promise<object>;
}

export declare class API extends BaseAPI implements APIInterface {
    ping(): Promise<object>;

    selfUser(options: object): Promise<object>;

    listStores(options: object): Promise<object[]>;

    listRepairs(options: object): Promise<object[]>;
    createRepair(payload): Promise<object>;
    getRepair(objectId: number, options: object): Promise<object>;
    updateRepair(objectId: number, payload: object): Promise<object>;
    deleteRepair(objectId: number, options: object): Promise<object>;

    statsSaleSnapshot(options: object): Promise<object[]>;
}
