import { Base, BaseDelta } from "./base";

export class WorkflowMessage extends Base {
    date: number;
    body: string;
    body_html?: string;
    edited_date?: number;
    workflow_operation: number;
    _user: number;
}

export class WorkflowMessageDelta extends BaseDelta {
    body?: string;
}

export class WorkflowMessagePayload {
    body?: string;
}

export class WorkflowMessageEvent {
    kind: "message";
    object_id: number;
    date: string;
    actual_date: number;
    edited_date?: number;
    body: string;
    body_html?: string;
    user?: string;
    user_object_id?: number;
    user_mtime?: number;
}

export class WorkflowStateChangeEvent {
    kind: "state_change";
    object_id: number;
    date: string;
    actual_date: number;
    state_color: string;
    state_string: string;
    previous_state_color?: string;
    previous_state_string?: string;
    user?: string;
    user_object_id?: number;
    user_mtime?: number;
    observations?: string;
}

export type WorkflowEvent = WorkflowMessageEvent | WorkflowStateChangeEvent;
