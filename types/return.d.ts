import { APIOptions } from "yonius";
import { Operation } from "./operation";
import { ReturnLine } from "./return-line";
import { FunctionalUnit } from "./functional-unit";

export class Return extends Operation {
    stockholder: FunctionalUnit;
    return_lines: ReturnLine[];
}

export declare interface ReturnAPI {
    listReturns(options?: APIOptions): Promise<Return[]>;
    getReturn(objectId: number, options?: APIOptions): Promise<Return>;
}
