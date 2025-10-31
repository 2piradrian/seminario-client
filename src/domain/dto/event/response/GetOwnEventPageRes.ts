import type { Event } from "../../../entity/event";

export interface GetOwnEventPageRes {
    events: Event[];
    nextPage: number;
}