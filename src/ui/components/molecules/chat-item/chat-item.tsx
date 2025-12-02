import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import type { Chat, Profile, UserProfile } from "../../../../domain";
import style from "./style.module.css";

type Props = {
    user: Profile;
    chat: Chat;
    onClickOnChat: () => void;
};

export default function ChatItem({ user, chat, onClickOnChat }: Props) {
    return (
        <div className={style.container} onClick={onClickOnChat}>
            <Avatar profile={user} hideName={true} />

            <div className={style.section}>
                <span className={style.name}>{user.displayName}</span>
                <span className={style.contentMessage}>{chat.lastMessage}</span>
            </div>
        </div>
    );
}
