import { Base } from "./base";
import { Merchandise } from "./merchandise";

export class SaleLine extends Base {
    quantity: number;
    merchandise: Merchandise;
}
