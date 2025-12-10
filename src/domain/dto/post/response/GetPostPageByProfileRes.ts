import type { Post } from "../../../entity/post";

export interface GetPostPageByProfileRes {
    posts: Post[];
    nextPage: number;
}
