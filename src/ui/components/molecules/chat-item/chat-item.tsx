import Avatar from "../../atoms/avatar/avatar";
import type { Chat, Profile } from "../../../../domain";
import style from "./style.module.css";

type Props = {
    user: Profile;
    chat: Chat;
    onClickOnChat: () => void;
    onClickOnAvatar: () => void; 
};

export default function ChatItem({ user, chat, onClickOnChat, onClickOnAvatar }: Props) {
    return (
        <div className={style.container}>
            <Avatar profile={user} hideName={true} onClick={onClickOnAvatar} />

            <div className={style.section}  onClick={onClickOnChat}>
                <span className={style.name}>{user.displayName}</span>
                <span className={style.contentMessage}>{chat.lastMessage}</span>
            </div>
        </div>
    );
}