import { PrefixedUUID } from "../../../../core";
import type { PostType, User } from "../../../../domain";
import { EntityType, Vote } from "../../../../domain";
import EventItem from "../../molecules/event-item/event-item";
import PostItem from "../../molecules/post-item/post-item";
import style from "./style.module.css";

type Props = {
    items: Array<any>;
    postTypes: PostType[];
    onClickOnItem: (item: any) => void;
    onClickOnAvatar: (item: any) => void;
    onClickOnComments: (item: any) => void;
    onVote: (item: any, voteType: Vote) => void;
    onClickDelete: (item: any) => void;
    onClickEdit?: (item: any) => void;
    onClickCancel: (item: any) => void;
    onClickSharePost?: (item: any) => void;
    isMine?: boolean;
    isItemMine?: (item: any) => boolean;
    isAdminOrMod?: boolean;
    activeMenuId?: string | null;
    onToggleMenu?: (id: string) => void;
    onCloseMenu?: () => void;
};

export default function GenericList({
    items,
    postTypes,
    onClickOnItem,
    onClickOnAvatar,
    onClickOnComments,
    onVote,
    onClickDelete,
    onClickEdit,
    onClickCancel,
    onClickSharePost,
    isAdminOrMod,
    isMine,
    isItemMine,
    activeMenuId,
    onCloseMenu,
    onToggleMenu
}: Props) {
    return (
        <section className={style.list}>
            {items.map(item => {
                const isMineForItem = isItemMine ? isItemMine(item) : isMine;

                if (PrefixedUUID.resolveType(item.id) === EntityType.EVENT) {
                    return (
                        <EventItem
                            key={item.id}
                            event={item}
                            onClickOnEvent={() => onClickOnItem(item)}
                            onClickOnAvatar={() => onClickOnAvatar(item)}
                            onClickCancel={() => onClickCancel(item)}
                            onClickDelete={() => onClickDelete(item)}
                            onClickEdit={() => onClickEdit?.(item)}
                            isAdminOrMod={isAdminOrMod}
                            isMine={isMineForItem}
                            isMenuOpen={activeMenuId === item.id}
                            onToggleMenu={() => onToggleMenu(item.id)}
                            onCloseMenu={onCloseMenu}
                        />
                    );
                }

                if (PrefixedUUID.resolveType(item.id) === EntityType.POST) {
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
                            onClickEdit={() => onClickEdit?.(item)}
                            onClickOnShare={() => onClickSharePost?.(item.id)}
                            isAdminOrMod={isAdminOrMod}
                            isMine={isMineForItem}
                            isMenuOpen={activeMenuId === item.id}
                            onToggleMenu={() => onToggleMenu(item.id)}
                            onCloseMenu={onCloseMenu}
                        />
                    );
                }

                return null;
            })}
        </section>
    );
}
