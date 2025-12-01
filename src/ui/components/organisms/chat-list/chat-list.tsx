import ChatItem from "../../molecules/chat-item/chat-item";
import style from "./style.module.css";

type Props = {
    chats,
    onClickOnChat,
    user
}

export default function ChatList({
    chats,
    onClickOnChat,
    user
}: Props) {
    return (
        <div className={style.chatList}>
            {chats.length === 0 && (
                <span className={style.empty}>No hay chats todavía</span>
            )}

            {chats.map(chat => (
                <ChatItem 
                    key={chat.id}
                    chat={chat}
                    onClickOnChat={onClickOnChat}
                    user={user}
                />
            ))}
        </div>
    );
}
