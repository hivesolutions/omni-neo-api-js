import { APIOptions } from "yonius";
import { Base, BaseDelta } from "./base";
import { Employee } from "./employee";
import { FunctionalUnit } from "./functional-unit";
import { Merchandise } from "./merchandise";
import { Operation } from "./operation";
import { RestockLine, RestockLineDelta } from "./restock-line";
import { Transfer } from "./transfer";

export enum RestockState {
    unset = 1,
    open = 2,
    closed = 3,
    canceled = 4
}

export class RestockStateChange extends Base {
    updated_state: RestockState;
    date: number;
}

export class Restock extends Operation {
    extended_identifier: string;
    date: number;
    observations: string | null;
    workflow_state: RestockState;
    origin: FunctionalUnit;
    employee?: Employee;
    restock_lines?: RestockLine[];
    transfers?: Transfer[];
    workflow_state_changes?: RestockStateChange[];
}

export class RestockDelta extends BaseDelta {
    observations?: string | null;
    origin?: { object_id: number };
    restock_lines?: RestockLineDelta[];
}

export class RestockPayload {
    restock: RestockDelta;
}

export class RestockStock {
    functional_unit: { object_id: number; name: string };
    stock_on_hand: number;
    stock_in_transit: number;
    stocked: boolean;
    product_stock_on_hand: number;
}

export class RestockStocks {
    merchandise: Merchandise | null;
    stock_on_hand?: number;
    stocks?: RestockStock[];
}

export declare interface RestockAPI {
    listRestocks(options?: APIOptions): Promise<Restock[]>;
    createRestock(payload: RestockPayload): Promise<Restock>;
    getRestock(objectId: number, options?: APIOptions): Promise<Restock>;
    updateRestock(objectId: number, payload: RestockPayload): Promise<Restock>;
    getStocksRestock(objectId: number, options?: APIOptions): Promise<RestockStocks>;
    generateRestock(objectId: number, options?: APIOptions): Promise<Restock>;
    cancelRestock(objectId: number, options?: APIOptions): Promise<Restock>;
}
