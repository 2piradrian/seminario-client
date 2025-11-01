import type { Event } from "../../../../domain";
import EventItem from "../../molecules/event-item/event-item";
import style from "./style.module.css";

type Props = {
  events: Event[];
  isMine?: boolean;
  onClickOnEvent: (eventId: string) => void;
  onClickOnAvatar: (event: Event) => void;
  onClickDelete?: (eventId: string) => void;
  onClickEdit?: (eventId: string) => void;
};

export default function EventList({
  events,
  isMine = false,
  onClickOnEvent,
  onClickOnAvatar,
  onClickDelete,
  onClickEdit
}: Props) {
  return (
    <section className={style.list}>
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          onClickOnEvent={() => onClickOnEvent(event.id)}
          onClickOnAvatar={() => onClickOnAvatar(event)}
          onClickDelete={() => onClickDelete?.(event.id)}
          onClickEdit={() => onClickEdit?.(event.id)}
          isMine={isMine}
        />
      ))}
    </section>
  );
}
