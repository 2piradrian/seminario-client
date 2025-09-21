export interface Comment {
    id: string;
    authorId: string;
    forumId: string;
    replyTo: Comment;
    content: string;
    uptovers: string[];
    downvoters: string[];
    createdAt: Date ;
    updatedAt: Date;
}