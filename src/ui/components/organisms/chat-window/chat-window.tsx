import type { FormEvent, UIEvent } from "react";
import { ChatMessage } from "../../../../domain";
import Avatar from "../../atoms/avatar/avatar";
import TimeAgo from "../../atoms/time-ago/time-ago";
import LinkifyContent from "../../atoms/linkify-content/linkify-content";
import MainButton from "../../atoms/main-button/main-button";
import style from "./style.module.css";

type Props = {
  messages: ChatMessage[];
  newMessage: string;
  onChangeMessage: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isMyMessage: (message: ChatMessage) => boolean;
  onScroll: (e: UIEvent<HTMLDivElement>) => void;
};

function normalizeCreatedAt(input: unknown): string | null {
  if (!input) return null;

  const date =
    input instanceof Date ? input : new Date(String(input));

  if (isNaN(date.getTime())) return null;

  return date.toISOString();
}

export default function ChatWindow({
  messages,
  newMessage,
  onChangeMessage,
  onSubmit,
  isMyMessage,
  onScroll,
}: Props) {
  return (
    <section className={style.container}>
      <header className={style.header}>
        <h3 className={style.title}>Chat</h3>
        <span className={style.subtitle}>{messages.length} mensajes</span>
      </header>

      <div className={style.messages} id="chat-messages" onScroll={onScroll}>
        {messages.length === 0 && (
          <div className={style.empty}>Aún no hay mensajes</div>
        )}

        {messages.map((message, index) => {
          const createdAtString = normalizeCreatedAt(message.createdAt);
          const mine = message.sender && isMyMessage(message);

          const profile =
            message.sender?.toProfile ? message.sender.toProfile() : null;

          return (
            <article
              key={`${message.id ?? index}`}
              className={`${style.messageRow} ${
                mine ? style.mine : style.theirs
              }`}
            >
              {!mine && profile && (
                <div className={style.avatarWrapper}>
                  <Avatar hideName profile={profile} />
                </div>
              )}

              <div className={style.bubble}>
                <div className={style.meta}>
                  <span className={style.sender}>
                    {profile?.displayName ?? "Usuario"}
                  </span>

                  {createdAtString && (
                    <TimeAgo createdAt={createdAtString} />
                  )}
                </div>

                <LinkifyContent
                  className={style.content}
                  text={message.content}
                />
              </div>

              {mine && profile && (
                <div className={style.avatarWrapper}>
                  <Avatar hideName profile={profile} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      <form className={style.inputRow} onSubmit={onSubmit}>
        <input
          className={style.input}
          type="text"
          value={newMessage}
          onChange={(e) => onChangeMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <div className={style.sendButtonWrapper}>
          <MainButton
            text="Enviar"
            type="submit"
            enabled={Boolean(newMessage.trim())}
          />
        </div>
      </form>
    </section>
  );
}
