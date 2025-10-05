import { useEffect, useMemo, useState } from "react";
import { Errors, Sesion, Vote, type GetCommentPageReq, type GetPostByIdReq } from "../../../domain";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment } from "../../../domain";
import { useRepositories } from "../../../core";
import type { DeletePostReq, TogglePostVotesReq, CreateCommentReq, CreateCommentRes } from "../../../domain";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../../domain";
import { UserProfile } from "../../../domain";
import useSesion from "../../hooks/useSesion";

export default function ViewModel() {

    const navigate = useNavigate()

    const { id } = useParams();
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

    const [newComment, setNewComment] = useState("");

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

    const handleAddComment = async (): Promise<Comment | undefined> => {
        if (newComment.trim() === "") return undefined;

        try {
            const commentRes = await commentRepository.create({
                sesion,
                postId: id,
                content: newComment,
                profileId: userId!,
                replyTo: null
            } as CreateCommentReq);
  
            const comment = Comment.fromObject({id: commentRes.commentId}); 
            console.log(comment)
      
            //setComments((prev) => [...prev, comment]);
      //
            //setNewComment("");  

            // return comment;
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
        newComment,
        setNewComment
    };
}
