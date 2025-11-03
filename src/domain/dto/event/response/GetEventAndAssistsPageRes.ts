import type { Event } from "../../../entity/event";

export interface GetEventAndAssistsPageRes {
    events: Event[];
    nextPage: number;
}