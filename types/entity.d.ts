import { APIOptions } from "yonius";
import { Base, BaseDelta } from "./base";

export class Entity extends Base {}

export class EntityDelta extends BaseDelta {}

export class EntityPayload {
    entity?: EntityDelta;
}

export declare interface EntityAPI {
    listEntities(options?: APIOptions): Promise<Entity[]>;
    getEntity(objectId: number, options?: APIOptions): Promise<Entity>;
    updateEntity(payload: EntityPayload): Promise<Entity>;
    sequenceEntity(objectId: number, options?: APIOptions): Promise<Entity>;
    mediaEntity(
        objectId: number,
        params: { position?: number; dimensions?: string; label?: string },
        options?: APIOptions
    ): Promise<Blob>;
}
