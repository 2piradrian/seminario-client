import type { CreateCommentReq } from "../dto/comment/request/CreateCommentReq";
import type { GetCommentPageReq } from "../dto/comment/request/GetCommentPageReq";
import type { GetCommentPageRes } from "../dto/comment/response/GetCommentPageRes";
import type { CreateCommentRes } from "../dto/comment/response/CreateCommentRes";
import type { DeleteCommentReq } from "../dto/comment/request/DeleteCommentReq";
import type { ToggleCommentVotesReq } from "../dto/comment/request/ToggleCommentVotesReq";
import type { ToggleCommentVoteRes } from "../dto/comment/response/ToggleCommentVoteRes";
import type { GetCommentByIdReq } from "../dto/comment/request/GetCommentByIdReq";
import type { GetCommentByIdRes } from "../dto/comment/response/GetCommentByIdRes";

export abstract class CommentRepositoryI {
    abstract getComments(dto: GetCommentPageReq): Promise<GetCommentPageRes>;
    abstract getById(dto: GetCommentByIdReq): Promise<GetCommentByIdRes>;
    abstract create(dto: CreateCommentReq): Promise<CreateCommentRes>;
    abstract delete(dto: DeleteCommentReq): Promise<void>;
    abstract toggleVotes(dto: ToggleCommentVotesReq): Promise<ToggleCommentVoteRes>;
}
