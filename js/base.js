import { API as YoniusAPI, mix, load, conf } from "yonius";
import { UserAPI } from "./user";
import { StoreAPI } from "./store";
import { EntityAPI } from "./entity";
import { RepairAPI } from "./repair";
import { MerchandiseAPI } from "./merchandise";
import { SaleSnapshotAPI } from "./sale-snapshot";
import { RepairReferenceAPI } from "./repair-reference";

const BASE_URL = "http://localhost:8080/";

export class API extends mix(YoniusAPI).with(
    UserAPI,
    StoreAPI,
    EntityAPI,
    RepairAPI,
    MerchandiseAPI,
    SaleSnapshotAPI,
    RepairReferenceAPI
) {
    constructor(kwargs = {}) {
        super(kwargs);
        this.baseUrl = conf("OMNI_BASE_URL", BASE_URL);
        this.baseUrl = conf("OMNI_NEO_BASE_URL", this.baseUrl);
        this.username = conf("OMNI_USERNAME", null);
        this.password = conf("OMNI_PASSWORD", null);
        this.baseUrl = kwargs.baseUrl === undefined ? this.baseUrl : kwargs.baseUrl;
        this.username = kwargs.username === undefined ? this.username : kwargs.username;
        this.password = kwargs.password === undefined ? this.password : kwargs.password;
        this.sessionId = kwargs.sessionId === undefined ? this.sessionId : kwargs.sessionId;
    }

    static async load() {
        await load();
    }

    async build(method, url, options = {}) {
        await super.build(method, url, options);
        options.params = options.params !== undefined ? options.params : {};
        options.kwargs = options.kwargs !== undefined ? options.kwargs : {};
        options.headers = options.headers !== undefined ? options.headers : {};
        const auth = options.kwargs.auth === undefined ? true : options.kwargs.auth;
        delete options.kwargs.auth;
        if (auth) options.params.sid = await this.getSessionId();
    }

    async getSessionId() {
        if (this.sessionId) return this.sessionId;
        if (this.username !== null && this.password !== null) {
            await this.login();
        }
        return this.sessionId;
    }

    async authCallback(params, headers) {
        this.sessionId = null;
        const sessionId = await this.getSessionId();
        params.sid = sessionId;
    }

    async login(username = undefined, password = undefined) {
        username = username !== undefined ? username : this.username;
        password = password !== undefined ? password : this.password;
        const url = `${this.baseUrl}login`;
        const contents = await this.post(url, {
            params: {
                username: username,
                password: password
            },
            kwargs: {
                callback: false,
                auth: false
            }
        });
        this.username = contents.username || null;
        this.sessionId = contents.session_id || null;
        this.tokens = contents.tokens || null;
        this.trigger("auth", contents);
        return this.sessionId;
    }

    isAuth() {
        if (!this.username || !this.password) return false;
        return true;
    }

    async ping() {
        const url = `${this.baseUrl}ping`;
        const contents = await this.get(url, { auth: false });
        return contents;
    }
}

export default API;
