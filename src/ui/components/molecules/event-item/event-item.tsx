import { Profile, type Event } from "../../../../domain";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import LargeTitle from "../../atoms/large-title/large-title";
import DeleteButton from "../../atoms/delete-button/delete-button";
import EditButton from "../../atoms/edit-button/edit-button";
import style from "./style.module.css";

const formatShort = (d: Date) => d.toLocaleDateString("es-AR");

type Props = {
  event: Event;
  onClickOnAvatar: () => void;
  onClickOnEvent: () => void;
  onClickDelete: () => void;
  onClickEdit: () => void;
  isMine: boolean;
};

export default function EventItem({
  event,
  onClickOnAvatar,
  onClickOnEvent,
  onClickDelete,
  onClickEdit,
  isMine,
}: Props) {
  return (
    <article className={style.container}>
      <div className={style.headerPost}>
        <Avatar
          profile={Profile.fromEntity(event.author, event.pageProfile)}
          onClick={onClickOnAvatar}
        />
        <TimeAgo createdAt={event.createdAt} />
      </div>

      <div className={style.clickableContent} onClick={onClickOnEvent}>
        <LargeTitle text={event.title} />

        <div className={style.eventDates}>
            <span>Desde: </span>
          <span className={style.dateInit}>{formatShort(event.dateInit)}</span>
          <span> — </span>
            <span>Hasta: </span>
          <span className={style.dateEnd}>{formatShort(event.dateEnd)}</span>
        </div>

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

      <div className={style.section}>
        <div className={style.meta}>
          <span className={style.assist}>Participantes: {event.assist?.length ?? 0}</span>
          <span className={style.views}>
            Vistas: {String((event as any).views ?? 0)}
          </span>
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
