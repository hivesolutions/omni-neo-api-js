import { APIOptions } from "yonius";
import { BaseNeo } from "./base";

export class RepairReference extends BaseNeo {
    owner: number;
    reference_payload: Record<string, unknown>;
}

export declare interface RepairReferenceAPI {
    listRepairReferences(options?: APIOptions): Promise<RepairReference[]>;
}
