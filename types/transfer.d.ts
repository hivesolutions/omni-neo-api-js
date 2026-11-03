import { Operation } from "./operation";
import { FunctionalUnit } from "./functional-unit";
import { TransferLine } from "./transfer-line";

export enum TransferState {
    unset = 1,
    created = 2,
    reserved = 3,
    sent = 4,
    received = 5,
    closed = 6,
    canceled = 7
}

export class Transfer extends Operation {
    workflow_state: TransferState;
    origin?: FunctionalUnit;
    destination: FunctionalUnit;
    transfer_lines?: TransferLine[];
}
