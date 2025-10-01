import { useEffect } from "react";
import { Post } from "../../../domain";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment } from "../../../domain";

export default function ViewModel() {

    const { trigger } = useScrollLoading();
    
    useEffect(() => {
        //aca iría la llamada al backend para traer el numero de página
    }, [trigger]);

    const onClickOnAvatarComment = () => {};
    const onClickOnAvatarPost = () => {};
    const onClickOnComment = () => {};
    const onDownVoteComment = () => {};
    const onDownVotePost = () => {};
    const onUpVoteComment = () => {};
    const onUpVotePost = () => {};
    const comments: Comment[] = [];
    const post: Post = {} as Post; 

    return {
        trigger,
        comments, 
        onClickOnAvatarComment,
        onClickOnAvatarPost,
        onClickOnComment,
        onDownVoteComment,
        onDownVotePost,
        onUpVoteComment,
        onUpVotePost,
        post
    };
}