export interface Comment {
    id: string;
    authorId: string;
    postId: string;
    replyTo: Comment;
    content: string;
    uptovers: string[];
    downvoters: string[];
    createdAt: Date ;
    updatedAt: Date;
}