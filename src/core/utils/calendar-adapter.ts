import type { Event } from "../../domain";

type CalendarEvent = {
    id: string;
    title: string;
    start: Date;
};

export class CalendarAdapter {
    
    static mapEventsToCalendar(events: Event[]): CalendarEvent[] {
        return events.map(ev => ({
            id: ev.id,
            title: ev.title,
            start: new Date(ev.dateInit),
            end: new Date(ev.dateInit)
        }));
    }
    
}