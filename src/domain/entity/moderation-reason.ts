export class ModerationReason {

    constructor(
        public id: string,
        public name: string
    ){}

    public static fromObject(object: {[key: string]: any}): ModerationReason {
        if (!object) return null;

        return new ModerationReason(
            object.id,
            object.name
        )
    };
    
}
