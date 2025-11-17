import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import type { Event } from '../../../../domain';
import LargeTitle from '../../atoms/large-title/large-title';
import { CalendarAdapter } from '../../../../core';
import { useMemo } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import style from "./style.module.css";

type Props = {
    events: Event[];
    onClickOnEvent: (eventId: string) => void;
} 

export default function CalendarEvents({ events, onClickOnEvent }: Props) {
    
    const mappedEvents = useMemo(
        () => CalendarAdapter.mapEventsToCalendar(events),
        [events]
    );


    return(
        <div className={style.container}>
            <LargeTitle text='Calendario de eventos' />
            <div className={style.calendarWrapper}>
                <Calendar 
                    className={style.calendar}
                    localizer={momentLocalizer(moment)}
                    events={mappedEvents}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month']}
                    defaultView="month"
                onSelectEvent={(calendarEvent) => onClickOnEvent(calendarEvent.id)}
                />
            </div>
        </div>
    )

}