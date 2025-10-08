import type { Post } from "../../../entity/post";

export interface GetPostPageRes {
    posts: Post[];
    nextPage: number;
}
