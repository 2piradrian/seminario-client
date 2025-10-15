import type { Category } from "../../../entity/category";
import type { Session } from "../../../entity/session.ts";

export interface EditPostReq {
    session: Session;
    postId: string;
    title: string;
    content: string;
    category: Category;
    image: string; 
}
