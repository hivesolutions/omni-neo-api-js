import { Base, BaseDelta } from "./base";

export class NamedNode extends Base {
    name: string;
}

export class NamedNodeDelta extends BaseDelta {
    name?: string;
}
