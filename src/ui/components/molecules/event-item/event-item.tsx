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
import { formatShortDate } from "../../../../core/utils/formatters";
import StatusIndicator from "../status-indicator/status-indicator";
import CancelButton from "../../atoms/cancel-button/cancel-button";
import OptionsDropdown from "../options-dropdown/options-dropdown";
import style from "./style.module.css";

type Props = {
    event: Event;
    onClickOnAvatar: () => void;
    onClickOnEvent: () => void;
    onClickDelete: () => void;
    onClickCancel?: () => void;
    onClickEdit?: () => void;
    isMine?: boolean;
    isAdminOrMod?: boolean;
    isMenuOpen?: boolean;
    onToggleMenu?: () => void;
    onCloseMenu?: () => void;
    isEnded?: boolean;
    activeMenuId?: string | null;
    onClickAssistants?: () => void;
};

export default function EventItem({
    event,
    onClickOnAvatar,
    onClickOnEvent,
    onClickDelete,
    onClickCancel,
    onClickEdit,
    isEnded,
    isMine,
    isAdminOrMod,
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
    onClickAssistants
}: Props) {
    return (
        <article className={style.container}>
            <div className={style.headerEvent}>
                <Avatar
                    profile={event.getProfile()}
                    onClick={onClickOnAvatar}
                    hideName={true}
                />
                <div className={style.eventInfo}>
                    <div className={style.nameRow}>
                        <span className={style.text}>{event.getProfile().displayName}</span>
                        <StatusIndicator event={event} />
                    </div>
                    <TimeAgo createdAt={event.createdAt} />
                </div>
                {(isMine || isAdminOrMod) && (
                    <div className={style.menuContainer}>
                        <OptionsDropdown
                            isOpen={isMenuOpen} 
                            onClose={onCloseMenu}
                            onToggle={onToggleMenu}
                            onDelete={onClickDelete} 
                            onEdit={onClickEdit}
                        />
                    </div>
                )}
            </div>
            
            <div className={style.clickableContent}   onClick={onClickOnEvent ? onClickOnEvent : undefined}>
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
                    <div className={style.meta} onClick={onClickAssistants}>
                        <img
                            src={participantsIcon}
                            alt="Participants"
                            className={style.personIcon} />
                        <span>{event.assistsQuantity ?? 1}</span>
                    </div>
                    <div className={style.meta}>
                        <img
                            src={viewsIcon}
                            alt="Views"
                            className={style.viewIcon} />
                        <span>{String((event as any).views ?? 0)}</span>
                    </div>
                </div>

                {(isMine || isAdminOrMod) && (
                    <div className={style.actions}>
                        {isMine && !isEnded && (
                            <CancelButton text="Cancelar" onClick={onClickCancel} />
                        )}

                    </div>
                )}
            </div>


        </article>
    );
}
