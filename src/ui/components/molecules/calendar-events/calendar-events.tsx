import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "../../../../core/utils/moment";
import { CalendarAdapter } from '../../../../core';
import type { Event } from '../../../../domain';
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
                    messages={{
                        today: "Hoy",
                        previous: "Anterior",
                        next: "Siguiente",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        agenda: "Agenda",
                        showMore: (total) => `+${total} más`,
                    }}
                    popup
                />
            </div>
        </div>
    )

}