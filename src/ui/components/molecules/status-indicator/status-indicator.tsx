import { StatusTranslator } from "../../../../core/utils/status-translator";
import {  Status, type Event } from "../../../../domain";
import style from "./style.module.css";

type Props = {
    event: Event;
}

export default function StatusIndicator( { event }: Props) {

    return (
        <div className={`${style.container} ${style[event.status.toString()]}`}> 
            <span className={style.tag}>
                {StatusTranslator.translate(event.status.toString())} 
            </span>
        </div>
    )
}