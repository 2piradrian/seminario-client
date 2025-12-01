import Avatar from "../../atoms/avatar/avatar";
import style from "./style.module.css";
import TimeAgo from "../../atoms/time-ago/time-ago";
import type { ChatMessage, Profile } from "../../../../domain";

type Props = {
    user: Profile;
    chat: ChatMessage;
    onClickOnChat: () => void;
};

export default function ChatItem({ user, chat, onClickOnChat }: Props) {
    return (
        <div className={style.container} onClick={onClickOnChat}>
        
            <Avatar profile={user} hideName={true} />

            <div className={style.texts}>
                <span className={style.name}>{user.displayName}</span>
                <span className={style.message}>{chat.content}</span>
            </div>

            <TimeAgo createdAt={chat.createdAt} />
        </div>
    );
}
