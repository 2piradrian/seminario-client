import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment/min/moment-with-locales";
import type { Event } from '../../../../domain';
import { CalendarAdapter } from '../../../../core';
import { useMemo } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import style from "./style.module.css";

moment.updateLocale("es", {
    months: [
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ],
    monthsShort: [
        "Ene","Feb","Mar","Abr","May","Jun",
        "Jul","Ago","Sep","Oct","Nov","Dic"
    ],
    weekdays: [
        "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
    ],
    weekdaysShort: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
});

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