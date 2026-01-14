import { API as BaseAPI, APIOptions } from "yonius";

import { Customer, CustomerAPI } from "./customer";
import { Sale, SaleAPI } from "./sale";
import { User, UserAPI } from "./user";
import { Store, StoreAPI } from "./store";
import { Entity, EntityAPI, EntityPayload } from "./entity";
import { Repair, RepairAPI, RepairPayload } from "./repair";
import { Return, ReturnAPI } from "./return";
import { Product, ProductAPI, ProductPayload } from "./product";
import { Merchandise, MerchandisePayload, MerchandiseAPI } from "./merchandise";
import { SaleSnapshot, SaleSnapshotAPI } from "./sale-snapshot";
import { InventoryLine, InventoryLineAPI } from "./inventory-line";
import {
    RepairReference,
    RepairReferenceAPI,
    RepairReferencePayload,
    RepairSlip
} from "./repair-reference";

export class Base {
    object_id: number;
    create_date: number;
    modify_date: number;
    description: string;
    meta?: Record<string, unknown>;
    [x: string]: unknown;
}

export class BaseDelta {
    object_id?: number;
    create_date?: number;
    modify_date?: number;
    description?: string;
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

export class BaseNeoDelta {
    id?: string;
    object_id?: number;
    created?: number;
    modified?: number;
    meta?: Record<string, unknown>;
    [x: string]: unknown;
}

export interface APIInterface
    extends CustomerAPI,
        SaleAPI,
        UserAPI,
        StoreAPI,
        EntityAPI,
        RepairAPI,
        ReturnAPI,
        ProductAPI,
        MerchandiseAPI,
        SaleSnapshotAPI,
        InventoryLineAPI,
        RepairReferenceAPI {
    ping(): Promise<object>;
}

export declare class API extends BaseAPI implements APIInterface {
    username?: string | null;
    sessionId?: string | null;
    tokens?: string[] | null;

    login(username: string, password: string): Promise<Record<string, unknown>>;
    isAuth(): boolean;
    ping(): Promise<object>;

    listSales(options?: APIOptions): Promise<Sale[]>;
    getSale(objectId: number, options?: APIOptions): Promise<Sale>;

    selfUser(options?: APIOptions): Promise<User>;

    listStores(options?: APIOptions): Promise<Store[]>;

    listCustomers(options?: APIOptions): Promise<Customer[]>;
    getCustomer(objectId: number, options?: APIOptions): Promise<Customer>;

    listEntities(options?: APIOptions): Promise<Entity[]>;
    getEntity(objectId: number, options?: APIOptions): Promise<Entity>;
    updateEntity(payload: EntityPayload): Promise<Entity>;
    sequenceEntity(objectId: number, options?: APIOptions): Promise<Entity>;
    mediaEntity(
        objectId: number,
        params?: { position?: number; dimensions?: string; label?: string },
        options?: APIOptions
    ): Promise<Blob>;

    listRepairs(options?: APIOptions): Promise<Repair[]>;
    createRepair(payload: RepairPayload): Promise<Repair>;
    getRepair(objectId: number, options?: APIOptions): Promise<Repair>;
    updateRepair(objectId: number, payload: RepairPayload): Promise<Repair>;
    deleteRepair(objectId: number, options?: APIOptions): Promise<Record<string, unknown>>;
    importRepair(objectId: number, options?: APIOptions): Promise<RepairReference>;

    listReturns(options?: APIOptions): Promise<Return[]>;
    getReturn(objectId: number, options?: APIOptions): Promise<Return>;

    listProducts(options?: APIOptions): Promise<Product[]>;
    getProduct(objectId: number, options?: APIOptions): Promise<Product>;
    updateProduct(payload: ProductPayload): Promise<Product>;

    listMerchandise(options?: APIOptions): Promise<Merchandise[]>;
    updateMerchandise(payload: MerchandisePayload): Promise<Merchandise>;
    listStoreMerchandise(storeId: number, options?: APIOptions): Promise<Merchandise[]>;

    statsSaleSnapshot(options?: APIOptions): Promise<SaleSnapshot[]>;

    listInventoryLines(options?: APIOptions): Promise<InventoryLine[]>;

    listRepairReferences(options?: APIOptions): Promise<RepairReference[]>;
    createRepairReference(payload: RepairReferencePayload): Promise<RepairReference>;
    getRepairReference(objectId: number, options?: APIOptions): Promise<RepairReference>;
    issueRepairSlipRepairReference(objectId: number, options?: APIOptions): Promise<RepairSlip>;
}
