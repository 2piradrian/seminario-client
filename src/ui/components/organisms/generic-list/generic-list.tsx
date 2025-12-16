import type { Event, Post, PostType } from "../../../../domain";
import { Vote } from "../../../../domain";
import EventItem from "../../molecules/event-item/event-item";
import PostItem from "../../molecules/post-item/post-item";
import style from "./style.module.css";

type Props = {
    items: Array<Event | Post>;
    postTypes: PostType[];
    onClickOnItem: (item: Event | Post) => void;
    onClickOnAvatar: (item: Event | Post) => void;
    onClickOnComments: (item: Event | Post) => void;
    onVote: (item: Event | Post, voteType: Vote) => void;
    onClickDelete: (item: Event | Post) => void;
    onClickCancel: (item: Event | Post) => void;
    isPost: (item: Event | Post) => item is Post;
    isEvent: (item: Event | Post) => item is Event;
};

/* const isPost = (item: Event | Post): item is Post =>
    "postType" in item;

const isEvent = (item: Event | Post): item is Event =>
    !("postType" in item); */

export default function GenericList({
    items,
    postTypes,
    onClickOnItem,
    onClickOnAvatar,
    onClickOnComments,
    onVote,
    onClickDelete,
    onClickCancel,
    isEvent,
    isPost
}: Props) {
    return (
        <section className={style.list}>
            {items.map(item => {

                if (isEvent(item)) {
                    return (
                        <EventItem
                            key={item.id}
                            event={item}
                            onClickOnEvent={() => onClickOnItem(item)}
                            onClickOnAvatar={() => onClickOnAvatar(item)}
                            onClickCancel={() => onClickCancel(item)}
                            onClickDelete={() => onClickDelete(item)}
                        />
                    );
                }

                if (isPost(item)) {
                    return (
                        <PostItem
                            key={item.id}
                            post={item}
                            postTypes={postTypes}
                            onClickOnPost={() => onClickOnItem(item)}
                            onClickOnComments={() => onClickOnComments(item)}
                            onUpVote={() => onVote(item, Vote.UPVOTE)}
                            onDownVote={() => onVote(item, Vote.DOWNVOTE)}
                            onClickOnAvatar={() => onClickOnAvatar(item)}
                            onClickDelete={() => onClickDelete(item)}
                        />
                    );
                }

                return null;
            })}
        </section>
    );
}
