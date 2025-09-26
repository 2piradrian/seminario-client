export class Vote {

    constructor(
        public name: string
    ){}

    public static fromObject(object: {[key: string]: any}): Vote {
        return new Vote(
            object.name
        )
    };
    
}