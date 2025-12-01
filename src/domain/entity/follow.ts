export class Follow {

    constructor(
        public id: string,
        public followedId: string,
        public followerId: string,
    ){}

    public static fromObject(object: {[key: string]: any}): Follow {
        if (!object) return null;

        return new Follow(
            object.id,
            object.followedId,
            object.followerId
        )
    };
    
}
