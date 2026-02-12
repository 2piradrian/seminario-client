import type { Event } from "../../../../domain";
import EventItem from "../../molecules/event-item/event-item";
import style from "./style.module.css";

type Props = {
    events: Event[];
    isMine?: boolean;
    isAdminOrMod?: boolean;
    onClickOnEvent: (eventId: string) => void;
    onClickOnAvatar?: (event: Event) => void;
    onClickDelete?: (eventId: string) => void;
    onClickCancel?: (eventId: string) => void;
    onClickEdit?: (eventId: string) => void;
    assistsQuantity?: number;
    activeMenuId?: string | null;
    onToggleMenu?: (postId: string) => void;
    onCloseMenu?: () => void;
};

export default function EventList({
	events,
	isMine = false,
	isAdminOrMod = false,
	onClickOnEvent,
	onClickOnAvatar,
	onClickDelete,
	onClickCancel,
	onClickEdit,
	activeMenuId,
	onCloseMenu,
	onToggleMenu
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
            onClickCancel={() => onClickCancel?.(event.id)}
            isMine={isMine}
            isAdminOrMod={isAdminOrMod}
            isEnded={event.isEnded()}
            isMenuOpen={activeMenuId === event.id}
            onToggleMenu={() => onToggleMenu(event.id)}
            onCloseMenu={onCloseMenu}
        />
      ))}
    </section>
  );
}
