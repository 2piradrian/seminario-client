import SmallTitle from "../../atoms/small-title/small-title";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import eventIcon from "../../../assets/icons/calendar.svg";
import { dateRangeLabel } from "../../../../core/utils/formatters";
import style from "./style.module.css";
import type { Event } from "../../../../domain";

type Props = {
    event: Event;
    onClickOnEvent: () => void;
};

export default function SearchEventItem({
    event,
    onClickOnEvent
}: Props) {
    return (
        <div className={style.item}>
            <article
                className={style.card}
                onClick={onClickOnEvent}
            >
                <div className={style.media}>
                    {event.imageId ? (
                        <img
                            src={ImageHelper.buildRoute(event.imageId)}
                            alt={event.title}
                            onError={(e) => { e.currentTarget.src = noImage; }}
                        />
                    ) : (
                        <div className={style.placeholder}>
                            <span>{event.title?.charAt(0) ?? "?"}</span>
                        </div>
                    )}
                </div>

                <div className={style.content}>
                    <div className={style.header}>
                        <div className={style.titleBlock}>
                            <div className={style.titleRow}>
                                <SmallTitle text={event.title} />
                                <span className={style.badge}>
                                    <img src={eventIcon} alt="" className={style.badgeIcon} />
                                    <span className={style.badgeLabel}>Evento</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {event.content && (
                        <p className={style.description}>{event.content}</p>
                    )}
                    <div className={style.info}>
                        <span className={style.infoItem}>
                            {`📅 ${dateRangeLabel(event.dateInit, event.dateEnd)}`}
                        </span>
                        {event.assistsQuantity !== undefined && (
                            <span className={style.infoItem}>
                                {`👥 ${event.assistsQuantity} asistentes`}
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}
