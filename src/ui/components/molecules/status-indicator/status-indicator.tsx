import {  Status, type Event } from "../../../../domain";
import { EventStatus } from "../../../../domain/entity/event-status";
import style from "./style.module.css";

type Props = {
    event: Event;
}

export default function StatusIndicator( { event }: Props) {

    return (
        <div className={`${style.container} ${style[event.status.toString()]}`}> 
            <span className={style.tag}>
                {EventStatus.getName(event.status.toString())}
            </span>
        </div>
    )
}