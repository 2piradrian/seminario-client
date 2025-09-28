import type { GetPostByIdRes } from './../dto/post/response/GetPostByIdRes';
import type { GetPostByIdReq } from "../dto/post/request/GetPostByIdReq";
import type { CreatePostReq } from '../dto/post/request/CreatePostReq';
import type { CreatePostRes } from '../dto/post/response/CreatePostRes';
import type { EditPostReq } from '../dto/post/request/EditPostReq';
import type { EditPostRes } from '../dto/post/response/EditPostRes';
import type { DeletePostReq } from '../dto/post/request/DeletePostReq';

export abstract class PostDatasourceI {
    abstract getById(dto: GetPostByIdReq): Promise<GetPostByIdRes>;    
    abstract create(dto: CreatePostReq): Promise<CreatePostRes>;
    abstract edit(dto: EditPostReq): Promise<EditPostRes>;
    abstract delete(dto: DeletePostReq): Promise<void>;
}