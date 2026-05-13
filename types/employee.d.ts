import { APIOptions } from "yonius";
import { Contactable, ContactableDelta } from "./contactable";

export class Employee extends Contactable {
    representation: string;
    tax_number?: string;
    primary_telephone?: string;
    primary_email?: string;
    employee_since?: number;
    employee_until?: number;
    commission?: number;
    salary?: number;
    working?: number;
}

export class EmployeeDelta extends ContactableDelta {
    representation?: string;
    tax_number?: string;
    primary_telephone?: string;
    primary_email?: string;
    employee_since?: number;
    employee_until?: number;
    commission?: number;
    salary?: number;
    working?: number;
}

export class EmployeePayload {
    employee?: EmployeeDelta;
}

export declare interface EmployeeAPI {
    listEmployees(options?: APIOptions): Promise<Employee[]>;
    createEmployee(payload: EmployeePayload): Promise<Employee>;
    selfEmployee(options?: APIOptions): Promise<Employee>;
    getEmployee(objectId: number, options?: APIOptions): Promise<Employee>;
    updateEmployee(objectId: number, payload: EmployeePayload): Promise<Employee>;
    deleteEmployee(objectId: number, options?: APIOptions): Promise<Record<string, unknown>>;
}
