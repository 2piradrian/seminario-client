export class Vote {

    constructor(
        public name: string
    ){}

    public static fromObject(object: {name: string}): Vote {
        return new Vote(
            object.name
        )
    };
}