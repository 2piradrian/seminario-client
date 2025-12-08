import SearchResultCard from "../search-result-card/search-result-card";
import eventIcon from "../../../assets/icons/calendar.svg";
import { dateRangeLabel } from "../../../../core/utils/formatters";
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
        <SearchResultCard
            id={event.id}
            title={event.title}
            description={event.content}
            badgeLabel="Evento"
            badgeIcon={eventIcon}
            imageId={event.imageId}
            meta={[
                `📅 ${dateRangeLabel(event.dateInit, event.dateEnd)}`,
                event.assistsQuantity !== undefined
                    ? `👥 ${event.assistsQuantity} asistentes`
                    : undefined
            ].filter(Boolean)}
            onAction={onClickOnEvent}
        />
    );
}
