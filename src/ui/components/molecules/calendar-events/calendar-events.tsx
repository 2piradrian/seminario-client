 import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "../../../../core/utils/moment";
import { CalendarAdapter } from '../../../../core';
import type { Event } from '../../../../domain';
import { useMemo } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import MediumTitle from '../../atoms/medium-title/medium-title';
import style from "./style.module.css";
import IconButton from '../../atoms/main-icon-button/main-icon-button';
import MainButton from '../../atoms/main-button/main-button';

type Props = {
    events: Event[];
    onClickOnEvent: (eventId: string) => void;
    onClickOnCreateEvent: () => void;
} 

export default function CalendarEvents({ events, onClickOnEvent, onClickOnCreateEvent }: Props) {
    
    const mappedEvents = useMemo(
        () => CalendarAdapter.mapEventsToCalendar(events),
        [events]
    );

    return(
        <div className={style.container}>
            <div className={style.calendarHeader}>
                <div className={style.titleBlock}>
                    <MediumTitle text="Calendario" />
                    <span className={style.helperText}>Organizá y visualizá tus eventos en un solo lugar.</span>
                </div>
                <MainButton
                    text="+"
                    type="submit"
                    enabled
                    onClick={onClickOnCreateEvent}
                    modifier={style.createButton}
                />
            </div>
            
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