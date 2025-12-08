import TimeAgo from "../../atoms/time-ago/time-ago";
import SearchResultCard from "../search-result-card/search-result-card";
import postIcon from "../../../assets/icons/musical-note-music-svgrepo-filled.svg";
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
        <SearchResultCard
            id={post.id}
            title={post.title}
            description={post.content}
            badgeLabel="Post"
            badgeIcon={postIcon}
            imageId={post.imageId}
            meta={[
                <TimeAgo key="time" createdAt={post.createdAt} />,
                post.pageProfile?.name
            ].filter(Boolean)}
            onAction={onClickOnPost}
        />
    );
}
