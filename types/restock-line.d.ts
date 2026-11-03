import { Base, BaseDelta } from "./base";
import { FunctionalUnit } from "./functional-unit";
import { Merchandise } from "./merchandise";

export class RestockLine extends Base {
    quantity: number;
    merchandise: Merchandise;
    functional_unit: FunctionalUnit;
}

export class RestockLineDelta extends BaseDelta {
    quantity: number;
    merchandise: { object_id: number };
    functional_unit: { object_id: number };
}
