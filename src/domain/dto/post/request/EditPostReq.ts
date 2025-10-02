import type { Category } from "../../../entity/category";
import type { Sesion } from "../../../entity/sesion";

export interface EditPostReq {
    sesion: Sesion;
    postId: string;
    title: string;
    content: string;
    category: Category;
    image: string; 
}
