import type { GetPostByIdReq } from "../dto/post/request/GetPostByIdReq";
import type { GetPostByIdRes } from "../dto/post/response/GetPostByIdRes";
import type { CreatePostReq } from "../dto/post/request/CreatePostReq";
import type { CreatePostRes } from "../dto/post/response/CreatePostRes";
import type { EditPostReq } from "../dto/post/request/EditPostReq";
import type { EditPostRes } from "../dto/post/response/EditPostRes";
import type { DeletePostReq } from "../dto/post/request/DeletePostReq";

export abstract class PostRepository {
    abstract getPostById(req: GetPostByIdReq): Promise<GetPostByIdRes>;    
    abstract create(req: CreatePostReq): Promise<CreatePostRes>;
    abstract edit(req: EditPostReq): Promise<EditPostRes>;
    abstract delete(req: DeletePostReq): Promise<void>;
}