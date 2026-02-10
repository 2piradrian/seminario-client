import type { CreatePostTypeReq } from "../dto/post-type/request/CreatePostTypeReq";
import type { DeletePostTypeReq } from "../dto/post-type/request/DeletePostTypeReq";
import type { EditPostTypeReq } from "../dto/post-type/request/EditPostTypeReq";
import type { GetPostTypeByIdReq } from "../dto/post-type/request/GetPostTypeByIdReq";
import type { CreatePostTypeRes } from "../dto/post-type/response/CreatePostTypeRes";
import type { EditPostTypeRes } from "../dto/post-type/response/EditPostTypeRes";
import type { GetPostTypeByIdRes } from "../dto/post-type/response/GetPostTypeByIdRes";

export abstract class PostTypeRepositoryI {
    abstract getById(dto: GetPostTypeByIdReq): Promise<GetPostTypeByIdRes>;
    abstract create(dto: CreatePostTypeReq): Promise<CreatePostTypeRes>;
    abstract edit(dto: EditPostTypeReq): Promise<EditPostTypeRes>;
    abstract delete(dto: DeletePostTypeReq): Promise<void>;
}