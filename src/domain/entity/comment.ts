export class Comment {
    upvoters: number;

    constructor(
        public id: string,
        public authorId: string,
        public postId: string,
        public replyTo: Comment,
        public publiccontent: string,
        public uptovers: number,
        public downvoters: number,
        public createdAt: Date,
        public updatedAt: Date
    ){}

    public static fromObject(object: {[key: string]: any}): Comment {
        return new Comment (
            object.id, 
            object.authorId,
            object.postId,
            object.replyTo, 
            object.publiccontent, 
            object.upvoters,
            object.downvoters,
            object.createdAt,
            object.updatedAt
        )
    };
    
}