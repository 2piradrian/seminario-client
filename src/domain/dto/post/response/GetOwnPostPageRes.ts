import type { Post } from "../../../entity/post";

export interface GetOwnPostPageRes {
    posts: Post[];
    nextPage: number;
}