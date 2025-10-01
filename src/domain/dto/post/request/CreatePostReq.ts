import type { Category } from "../../../entity/category";
import type { Page } from "../../../entity/page";
import { Sesion } from "../../../entity/sesion";

export interface CreatePostReq {
    sesion: Sesion;
    title: string;
    content: string;
    page: Page;
    category: Category;
    image: string;   
}
