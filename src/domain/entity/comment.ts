export class Comment {

    constructor(
        public id: string,
        public authorId: string,
        public postId: string,
        public replyTo: Comment,
        public publiccontent: string,
        public uptovers: string[],
        public downvoters: string[],
        public createdAt: Date,
        public updatedAt: Date
    ){}

    public static fromObject(object: {id: string, authorId: string, postId: string, replyTo: Comment, 
        publiccontent: string, upvoters: string[], downvoters: string[], createdAt: Date, updatedAt: Date
    }): Comment {
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