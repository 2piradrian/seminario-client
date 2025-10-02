import { useEffect, useState } from "react";
import { Errors, Post, type GetCommentPageReq, type GetPostByIdReq } from "../../../domain";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment } from "../../../domain";
import { useRepositories } from "../../../core";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewModel() {

    const { id } = useParams();
    const navigate = useNavigate()
    const { trigger } = useScrollLoading();

    const { postRepository, commentRepository } = useRepositories();

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number | null>(0);
    
    useEffect(() => {
        if (commentPage != null) {
            setCommentPage(trigger);
            fetchMoreComments();
        } // null when we have no more pages
    }, [trigger]);

    useEffect(()=> {
        const fetchData = async () => {
            if (!id) {
                navigate("/error-404");
            }

            await fetch();
        }
        fetchData();
    }, []);

    const fetch = async () => {
        try {
            const postRes = await postRepository.getById(
                { postId: id } as GetPostByIdReq
            );
            setPost(Post.fromObject(postRes));

            const commentsRes = await commentRepository.getCommentPage(
                { page: commentPage, postId: id, size: 5 } as GetCommentPageReq
            );
            setComments(commentsRes.comments);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchMoreComments = async () => {
        try {
            const commentsRes = await commentRepository.getCommentPage(
                { page: commentPage, postId: id, size: 5 } as GetCommentPageReq
            );
            if (!commentsRes.nextPage) {
                setCommentPage(null);
            }
            setComments(commentsRes.comments);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const onClickOnAvatarComment = () => {};
    const onClickOnAvatarPost = () => {};
    const onClickOnComment = () => {};
    const onDownVoteComment = () => {};
    const onDownVotePost = () => {};
    const onUpVoteComment = () => {};
    const onUpVotePost = () => {};

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