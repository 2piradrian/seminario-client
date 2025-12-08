import { User } from "../../../../domain";
import MediumTitle from "../../atoms/medium-title/medium-title";
import ChatItem from "../../molecules/chat-item/chat-item";
import style from "./style.module.css";

type Props = {
    chats,
    onClickOnChat,
}

export default function ChatList({
    chats,
    onClickOnChat
}: Props) {
    return (
        <section className={style.container}>
            <MediumTitle text="Chats" />
            { chats.length === 0 ? (
                <span className={style.noResultsMessage}>No hay resultados.</span>
            ) : (
                <div className={style.list}>
                    {chats.map((chat) => (
                        <div key={chat.id}>
                            <ChatItem 
                                key={chat.id}
                                chat={chat}
                                onClickOnChat={() => onClickOnChat(chat.id)}
                                user={chat.user.toProfile()}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
