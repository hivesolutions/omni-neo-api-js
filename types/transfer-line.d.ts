import { Base } from "./base";
import { Merchandise } from "./merchandise";

export class TransferLine extends Base {
    quantity: number;
    merchandise?: Merchandise;
}
