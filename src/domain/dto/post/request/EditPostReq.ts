import type { Category } from "../../../entity/category";
import type { Post } from "../../../entity/post";
import type { Sesion } from "../../../entity/sesion";

export interface EditPostReq {
    sesion: Sesion;
    post: Post;
    title: string;
    content: string;
    category: Category;
    image: string; 
}
