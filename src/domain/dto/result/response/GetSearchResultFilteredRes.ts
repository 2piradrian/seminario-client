import type { PageProfile } from "../../../entity/page-profile";
import type { Post } from "../../../entity/post";
import type { UserProfile } from "../../../entity/user-profile";

export interface GetSearchResultFilteredRes {
    userProfiles: UserProfile[];
    pageProfiles: PageProfile[];
    posts: Post[];
}
