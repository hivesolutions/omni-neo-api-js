import { APIOptions } from "yonius";
import { Base } from "./base";

export class User extends Base {
    username: string;
    email: string;
}

export declare interface UserAPI {
    selfUser(options?: APIOptions): Promise<User>;
}
