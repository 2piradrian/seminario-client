export class Token {

    constructor(
        public accessToken: string
    ){}

    public static fromObject(object: {[key: string]: any}): Token {
        return new Token(
            object.accessToken
        )
    };
    
}