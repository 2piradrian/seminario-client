import { useEffect, useState } from "react";
import { Errors, Sesion, Vote, type GetCommentPageReq, type GetPostByIdReq } from "../../../domain";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment } from "../../../domain";
import { useRepositories } from "../../../core";
import type { TogglePostVotesReq } from "../../../domain";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../../domain";
import { UserProfile } from "../../../domain";
import useSesion from "../../hooks/useSesion";

export default function ViewModel() {

    const { id } = useParams();
    const navigate = useNavigate()
    const { trigger } = useScrollLoading();

    const { userId, sesion } = useSesion();

    const { postRepository, commentRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number | null>(1);
    
    const [vote, setVote] = useState(false);
    const [votesCount, setVotesCount] = useState<number>(0);

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
    const onDownVoteComment = async () => {}
    const onUpVoteComment = () => {};
    const onClickOnComments = () => {};
    const onClickDelete = () => {};

    const onDownVotePost = async () => {
        try { 
            await postRepository.toggleVotes({
                sesion: sesion,
                voteType: "DOWNVOTE",
                postId: id,
            } as TogglePostVotesReq)

            const postRes = await postRepository.getById(
                { postId: id } as GetPostByIdReq
            );
            setPost(Post.fromObject(postRes)); 

            setVote((prev) => !prev);

            setVotesCount((prev) => (vote ? prev - 1 : prev + 1)); 
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };


    const onUpVotePost = async () => {
        try { 
            await postRepository.toggleVotes({
                sesion: sesion,
                voteType: "UPVOTE",
                postId: id,
            } as TogglePostVotesReq)

            const postRes = await postRepository.getById(
                { postId: id } as GetPostByIdReq
            );
            setPost(Post.fromObject(postRes)); 

            setVote((prev) => !prev);

            setVotesCount((prev) => (vote ? prev - 1 : prev + 1)); 
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
        post
    };
}