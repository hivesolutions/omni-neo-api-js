import { API as BaseAPI, APIOptions } from "yonius";

import { User, UserAPI } from "./user";
import { Store, StoreAPI } from "./store";
import { Repair, RepairAPI, RepairPayload } from "./repair";
import { SaleSnapshot, SaleSnapshotAPI } from "./sale-snapshot";

export class Base {
    object_id?: number;
    created?: number;
    modified?: number;
    meta?: Record<string, unknown>;
    [x: string]: unknown;
}

export class BaseNeo {
    id: string;
    object_id: number;
    created: number;
    modified: number;
    meta: Record<string, unknown>;
    [x: string]: unknown;
}

export class BaseNeoPayload {
    id?: string;
    object_id?: number;
    created?: number;
    modified?: number;
    meta?: Record<string, unknown>;
    [x: string]: unknown;
}

export interface APIInterface extends UserAPI, StoreAPI, RepairAPI, SaleSnapshotAPI {
    ping(): Promise<object>;
}

export declare class API extends BaseAPI implements APIInterface {
    ping(): Promise<object>;

    selfUser(options?: APIOptions): Promise<User>;

    listStores(options?: APIOptions): Promise<Store[]>;

    listRepairs(options?: APIOptions): Promise<Repair[]>;
    createRepair(payload: RepairPayload): Promise<Repair>;
    getRepair(objectId: number, options?: APIOptions): Promise<Repair>;
    updateRepair(objectId: number, payload: RepairPayload): Promise<Repair>;
    deleteRepair(objectId: number, options?: APIOptions): Promise<Record<string, unknown>>;

    statsSaleSnapshot(options?: APIOptions): Promise<SaleSnapshot[]>;
}
