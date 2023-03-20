import { APIOptions } from "yonius";
import { Merchandise, MerchandiseDelta } from "./merchandise";

export class Product extends Merchandise {}

export class ProductDelta extends MerchandiseDelta {}

export class ProductPayload {
    product?: ProductDelta;
}

export declare interface ProductAPI {
    listProducts(options?: APIOptions): Promise<Product[]>;
    getProduct(objectId: number, options?: APIOptions): Promise<Product>;
    updateProduct(payload: ProductPayload): Promise<Product>;
}
