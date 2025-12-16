import ProfileCard from "../../molecules/profile-card/profile-card";
import type { Event, User } from "../../../../domain";
import CreateButton from "../../molecules/create-button/create-button";
import EventList from "../event-list/event-list";
import style from "./style.module.css";

type Props = {
    user: User;
    onProfileClick: (profileId: string) => void;
    events: Event[];
    onClickOnEvent: (eventId: string) => void;
    onClickOnCreateEvent: () => void;
    onClickOnAvatar: (event: Event) => void;
};

export default function EventsFeed({
    user,
    onProfileClick,    
    events,
    onClickOnEvent,
    onClickOnCreateEvent,
    onClickOnAvatar
}: Props) {

  return (
    <div className={style.container}>
        <div className={style.profileBlock}>
            <ProfileCard
            profile={user.profile}
            onClickOnAvatar={() => onProfileClick(user.id)}
            />
        </div>
        <div className={style.eventsWrap}>
            <div className={style.createEventWrapper}>
                <CreateButton
                profile={user.toProfile()}
                onClickOnAvatar={() => onProfileClick(user.id)}
                onClickOnCreate={() => onClickOnCreateEvent()}
                text="Crear nuevo evento"
                />
            </div>
            <EventList
                events={events}
                onClickOnEvent={onClickOnEvent}
                onClickOnAvatar={onClickOnAvatar}
            />
        </div>
    </div>
  );
}
