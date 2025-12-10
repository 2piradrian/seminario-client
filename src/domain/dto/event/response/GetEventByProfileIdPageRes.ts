import type { Event } from "../../../entity/event";

export interface GetEventByProfileIdPageRes {
    events: Event[];
    nextPage: number;
}
