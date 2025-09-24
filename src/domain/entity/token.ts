export class Token {

    constructor(
        public accessToken: string
    ){}

    public static fromObject(object: {accessToken: string}): Token {
        return new Token(
            object.accessToken
        )
    };
}