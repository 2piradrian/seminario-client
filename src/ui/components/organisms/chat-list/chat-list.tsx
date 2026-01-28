import MediumTitle from "../../atoms/medium-title/medium-title";
import ChatItem from "../../molecules/chat-item/chat-item";
import style from "./style.module.css";

type Props = {
    chats,
    onClickOnChat,
    onClickOnAvatar: (profileId: string) => void;
}

export default function ChatList({
    chats,
    onClickOnChat,
    onClickOnAvatar
}: Props) {
    return (
        <section className={style.container}>
            <MediumTitle text="Chats" />
            { chats.length === 0 ? (
                <span className={style.noResultsMessage}>No hay resultados.</span>
            ) : (
                <div className={style.list}>
                    {chats.map((chat) => (
                            <ChatItem 
                                key={chat.id}
                                chat={chat}
                                onClickOnChat={() => onClickOnChat(chat.id)}
                                user={chat.user.toProfile()}
                                onClickOnAvatar={() => onClickOnAvatar(chat.user.id)}
                            />
                    ))}
                </div>
            )}
        </section>
    );
}
