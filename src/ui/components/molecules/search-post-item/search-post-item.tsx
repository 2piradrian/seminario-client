import TimeAgo from "../../atoms/time-ago/time-ago";
import SmallTitle from "../../atoms/small-title/small-title";
import { ImageHelper } from "../../../../core";
import noImage from "../../../assets/other/no-image.png";
import postIcon from "../../../assets/icons/musical-note-music-svgrepo-filled.svg";
import style from "./style.module.css";
import type { Post } from "../../../../domain";

type Props = {
    post: Post;
    onClickOnPost: () => void;
};

export default function SearchPostItem({
    post,
    onClickOnPost
}: Props) {
    return (
        <div className={style.item}>
            <article
                className={style.card}
                onClick={onClickOnPost}
            >
                <div className={style.media}>
                    {post.imageId ? (
                        <img
                            src={ImageHelper.buildRoute(post.imageId)}
                            alt={post.title}
                            onError={(e) => { e.currentTarget.src = noImage; }}
                        />
                    ) : (
                        <div className={style.placeholder}>
                            <span>{post.title?.charAt(0) ?? "?"}</span>
                        </div>
                    )}
                </div>

                <div className={style.content}>
                    <div className={style.header}>
                        <div className={style.titleBlock}>
                            <div className={style.titleRow}>
                                <SmallTitle text={post.title} />
                                <span className={style.badge}>
                                    <img src={postIcon} alt="" className={style.badgeIcon} />
                                    <span className={style.badgeLabel}>Post</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {post.content && <p className={style.description}>{post.content}</p>}
                    <div className={style.info}>
                        <span className={style.infoItem}>
                            <TimeAgo createdAt={post.createdAt} />
                        </span>
                        {post.pageProfile?.name && (
                            <span className={style.infoItem}>{post.pageProfile.name}</span>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}
