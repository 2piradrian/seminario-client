import type { Token } from "./token";

export class Sesion {

    constructor(
        public token: Token
    ){}

    public static fromObject(object: {[key: string]: any}): Sesion {
        return new Sesion(
            object.token
        )
    };
    
}