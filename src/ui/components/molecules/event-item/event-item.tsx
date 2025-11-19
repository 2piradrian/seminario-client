import { type Event } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import LargeTitle from "../../atoms/large-title/large-title";
import DeleteButton from "../../atoms/delete-button/delete-button";
import EditButton from "../../atoms/edit-button/edit-button";
import participantsIcon from "../../../assets/icons/person.svg";
import viewsIcon from "../../../assets/icons/views.svg";
import style from "./style.module.css";
import { formatShortDate } from "../../../../core/utils/formatters";
 
type Props = {
  event: Event;
  onClickOnAvatar: () => void;
  onClickOnEvent: () => void;
  onClickDelete: () => void;
  onClickEdit?: () => void;
  isMine: boolean;
  assistsQuantity: number;
};

export default function EventItem({
    event,
    onClickOnAvatar,
    onClickOnEvent,
    onClickDelete,
    onClickEdit,
    isMine,
    assistsQuantity
}: Props) {
  return (
    <article className={style.container}>
        <div className={style.headerPost}>
            <Avatar
                profile={event.getProfile()}
                onClick={onClickOnAvatar}
            />
            <TimeAgo createdAt={event.createdAt} />
        </div>

        <div className={style.clickableContent} onClick={onClickOnEvent}>
            <LargeTitle text={event.title} />

            <div className={style.eventBody}>
            <p className={style.content}>{event.content}</p>

            {event.imageId && (
                <img
                src={ImageHelper.buildRoute(event.imageId) || noImage}
                alt="event image"
                className={style.portrait}
                onError={(e) => {
                    e.currentTarget.src = noImage as unknown as string;
                }}
                />
            )}
            </div>
        </div>

        <div className={style.eventDates}>
                <div className={style.date}>
                <span>Desde el </span>
                    <span className={style.dateInit}>{formatShortDate(event.dateInit)}</span>
                </div>
                <div className={style.date}>
                    <span> hasta el </span>
                    <span className={style.dateEnd}>{formatShortDate(event.dateEnd)}</span>
                </div>
        </div>

        <div className={style.section}>
            <div className={style.metaGroup}>
                <div className={style.meta}>
                    <img 
                        src={participantsIcon} 
                        alt="Participants" 
                        className={style.personIcon} />
                    <span>{assistsQuantity ?? 0}</span>
                </div>
                <div className={style.meta}>
                    <img 
                        src={viewsIcon} 
                        alt="Views" 
                        className={style.viewIcon} />
                    <span>{String((event as any).views ?? 0)}</span>
                </div>
            </div>

            {isMine && (
            <div className={style.actions}>
                <EditButton text="Editar" onClick={onClickEdit} />
                <DeleteButton text="Eliminar" onClick={onClickDelete} />
            </div>
            )}
        </div>

        
        </article>
    );
}
