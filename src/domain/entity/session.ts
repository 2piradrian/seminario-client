import { Token } from "./token";

export class Session {

    constructor(
        public token: Token
    ){}

    public static fromObject(object: {[key: string]: any}): Session {
        return new Session(
            Token.fromObject(object.token),
        )
    };

    // --> Methods <-- //

    public getAccessToken(): string {
        return this.token.accessToken;
    }
    
}