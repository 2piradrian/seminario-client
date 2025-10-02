import type { Category } from "../../../entity/category";
import { Sesion } from "../../../entity/sesion";

export interface CreatePostReq {
    sesion: Sesion;
    title: string;
    content: string;
    pageId: string;
    category: Category;
    image: string;   
}
