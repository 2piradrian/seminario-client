import type { GetPostByIdRes } from './../dto/post/response/GetPostByIdRes';
import type { GetPostByIdReq } from "../dto/post/request/GetPostByIdReq";
import type { CreatePostReq } from '../dto/post/request/CreatePostReq';
import type { CreatePostRes } from '../dto/post/response/CreatePostRes';
import type { EditPostReq } from '../dto/post/request/EditPostReq';
import type { EditPostRes } from '../dto/post/response/EditPostRes';
import type { DeletePostReq } from '../dto/post/request/DeletePostReq';
import type { GetPostPageReq } from '../dto/post/request/GetPostPageReq';
import type { GetPostPageRes } from '../dto/post/response/GetPostPageRes';
import type { TogglePostVotesReq } from '../dto/post/request/TogglePostVotesReq';

export abstract class PostDatasourceI {
    abstract getById(dto: GetPostByIdReq): Promise<GetPostByIdRes>;
    abstract getPostPage(dto: GetPostPageReq): Promise<GetPostPageRes>;
    abstract create(dto: CreatePostReq): Promise<CreatePostRes>;
    abstract edit(dto: EditPostReq): Promise<EditPostRes>;
    abstract delete(dto: DeletePostReq): Promise<void>;
    abstract togleVotes(dto: TogglePostVotesReq): Promise<void>;
}
