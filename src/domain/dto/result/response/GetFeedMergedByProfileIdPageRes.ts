import type { Event } from "../../../entity/event";
import type { Post } from "../../../entity/post";

export interface GetFeedMergedByProfileIdPageRes {
    content: Array<Event | Post>;
}
