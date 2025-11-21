import type { User } from "../../../entity/user";
import type { Event } from "../../../entity/event";
import type { PageProfile } from "../../../entity/page-profile";
import type { Post } from "../../../entity/post";

export interface GetSearchResultFilteredRes {
    user: User[];
    pageProfiles: PageProfile[];
    posts: Post[];
    events:Event[];
}
