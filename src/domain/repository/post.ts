import type { GetPostByIdReq } from "../dto/post/request/GetPostByIdReq";
import type { GetPostByIdRes } from "../dto/post/response/GetPostByIdRes";
import type { CreatePostReq } from "../dto/post/request/CreatePostReq";
import type { CreatePostRes } from "../dto/post/response/CreatePostRes";
import type { EditPostReq } from "../dto/post/request/EditPostReq";
import type { EditPostRes } from "../dto/post/response/EditPostRes";
import type { DeletePostReq } from "../dto/post/request/DeletePostReq";
import type { GetPostPageReq } from "../dto/post/request/GetPostPageReq";
import type { GetPostPageRes } from "../dto/post/response/GetPostPageRes";
import type { TogglePostVotesReq } from "../dto/post/request/TogglePostVotesReq";
import type { GetOwnPostPageReq } from "../dto/post/request/GetOwnPostPageReq";
import type { GetOwnPostPageRes } from "../dto/post/response/GetOwnPostPageRes";
import type { GetPostPageByProfileReq } from "../dto/post/request/GetPostPageByProfileReq";
import type { GetPostPageByProfileRes } from "../dto/post/response/GetPostPageByProfileRes";
import type { TogglePostVotesRes } from "../dto/post/response/TogglePostVotesRes";

export abstract class PostRepositoryI {
    abstract getById(dto: GetPostByIdReq): Promise<GetPostByIdRes>;
    abstract getPostPage(dto: GetPostPageReq): Promise<GetPostPageRes>;
    abstract create(dto: CreatePostReq): Promise<CreatePostRes>;
    abstract edit(dto: EditPostReq): Promise<EditPostRes>;
    abstract delete(dto: DeletePostReq): Promise<void>;
    abstract toggleVotes(dto: TogglePostVotesReq): Promise<TogglePostVotesRes>;
    abstract getOwnPostPage(dto: GetOwnPostPageReq): Promise<GetOwnPostPageRes>;
    abstract getPostPageByProfile(dto: GetPostPageByProfileReq): Promise<GetPostPageByProfileRes>;
}
