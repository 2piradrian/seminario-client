import { Token } from "./token";

export class Sesion {

    constructor(
        public token: Token
    ){}

    public static fromObject(object: {[key: string]: any}): Sesion {
        return new Sesion(
            Token.fromObject(object.token),
        )
    };

    // --> Methods <-- //

    public getAccessToken(): string {
        return this.token.accessToken;
    }
    
}