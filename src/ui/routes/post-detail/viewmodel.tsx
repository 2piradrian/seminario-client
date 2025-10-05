import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Post, Regex, Vote, type CreateCommentReq, type DeletePostReq, type GetCommentPageReq, type GetPostByIdReq, type TogglePostVotesReq } from "../../../domain";
import { useNavigate, useParams } from "react-router-dom";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate()

    const { id } = useParams();
    const { trigger } = useScrollLoading();
    const { userId, sesion } = useSesion();
    const { postRepository, commentRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number | null>(1);
    
    useEffect(() => {
        if (commentPage != null) {
            setCommentPage(trigger);
            fetchMoreComments();
        } // null when we have no more pages
    }, [trigger]);

    useEffect(()=> {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            await fetch();
        }
        fetchData();
    }, []);

    const isMine = useMemo(() => {
        if (!post || !userId) return false
        return post.author?.id === userId || post.page?.ownerId === userId
    }, [post, userId])
 
    const fetch = async () => {
        try {
            const postRes = await postRepository.getById(
                { postId: id } as GetPostByIdReq
            );
            setPost(Post.fromObject(postRes));

            const commentsRes = await commentRepository.getCommentPage(
                { page: commentPage, postId: id, size: 5 } as GetCommentPageReq
            );
            //setComments(commentsRes.comments);
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
            //setComments(commentsRes.comments);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const onClickOnAvatarComment = () => {

    };

    const onClickOnAvatarPost = () => {
        if (!post.author) return navigate("/error-404");

        navigate(post.page.id ? `/page-profile/${post.page.id}` : `/profile/${post.author.id}`);
    };

    const onClickOnComment = () => {};
    const onDownVoteComment = () => {}
    const onUpVoteComment = () => {};
    const onClickOnComments = () => {};
    const onClickOnPost = () => {};

    const onClickDelete = async () => {
        try {
            await postRepository.delete({
                sesion: sesion,
                postId: id,
            } as DeletePostReq);

            navigate("/profile") 
 
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onUpVotePost = async () => {
        try { 
            await postRepository.toggleVotes({
                sesion: sesion,
                voteType: Vote.UPVOTE,
                postId: id,
            } as TogglePostVotesReq)

            const postRes = await postRepository.getById(
                { postId: id } as GetPostByIdReq
            );
            setPost(Post.fromObject(postRes));
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onDownVotePost = async () => {
        try { 
            await postRepository.toggleVotes({
                sesion: sesion,
                voteType: Vote.DOWNVOTE,
                postId: id,
            } as TogglePostVotesReq)

            const postRes = await postRepository.getById(
                { postId: id } as GetPostByIdReq
            );
            setPost(Post.fromObject(postRes)); 
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                content?: string;
                profile?: string;
            }

            if (!Regex.COMMENT_CONTENT.test(form.content || "")) {
                return setError(Errors.INVALID_CONTENT);
            }

            await commentRepository.create({
                sesion,
                postId: id,
                content: form.content,
                profileId: userId!, // TODO: ADD -> PROFILE SELECTOR
                replyTo: null // TODO: ADD -> REPLY SYSTEM
            } as CreateCommentReq);

            // TODO: ADD COMMENT TO COMMENTLIST
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    return {
        trigger,
        comments, 
        onClickOnComments,
        onClickOnAvatarComment,
        onClickOnAvatarPost,
        onClickOnComment,
        onClickDelete,
        onDownVoteComment,
        onDownVotePost,
        onUpVoteComment,
        onUpVotePost,
        post,
        onClickOnPost,
        isMine,
        handleAddComment, 
    };
}
