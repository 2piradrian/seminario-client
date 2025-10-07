import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Errors, Post, Regex, Vote, Profile, Page, type CreateCommentReq, type DeletePostReq, type GetCommentPageReq, type GetPostByIdReq, type GetUserByIdReq, type GetPageByUserIdReq, type TogglePostVotesReq, type ToggleCommentVotesReq  } from "../../../domain";
import { useNavigate, useParams } from "react-router-dom";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate()

    const { id } = useParams();
    const { trigger } = useScrollLoading();
    const { userId, sesion } = useSesion();
    const { postRepository, commentRepository, userProfileRepository, pageRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number | null>(1);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    
    useEffect(() => {
        if (commentPage != null && sesion != null) {
            setCommentPage(trigger);
            fetchComments();
        }
    }, [trigger]);

    useEffect(()=> {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            await fetch();
        }
        fetchData();
    }, []);

    useEffect(()=> {
        const fetchData = async () => {
            if (sesion != null){
                await fetchProfiles();
            }
        }
        fetchData();
    }, [sesion]);

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
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchComments = async() => {
        try {
            const commentRes = await commentRepository.getCommentPage(
                { sesion: sesion, page: commentPage, size: 15, postId: id } as GetCommentPageReq
            );
            if (!commentRes.nextPage) setCommentPage(null);
            

            if (commentPage === 1) {
                setComments(commentRes.comments.map(Comment.fromObject));
            } 
            else {
                setComments(prevComments => [
                    ...prevComments,
                    ...commentRes.comments.map(Comment.fromObject)
                ]);
            }
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchProfiles = async () => {
        try {
            const userProfile = await userProfileRepository.getUserById(
                { userId } as GetUserByIdReq
            );
            const pages = await pageRepository.getByUserId(
                { userId: userProfile.id } as GetPageByUserIdReq
            );

            const profilesList: Profile[] = []
            profilesList.push(Profile.fromEntity(userProfile, undefined));

            pages.pages.forEach((page: Page) => {
                profilesList.push(Profile.fromEntity(undefined, Page.fromObject(page)));
            });

            setProfiles(profilesList);
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
    const onClickOnComments = () => {};
    const onClickOnPost = () => {};

    const onClickDelete = () => {
        setIsDeleteOpen(true)
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false)
    };

    const proceedDelete = async () => {
        try {
            await postRepository.delete({
                sesion: sesion,
                postId: id,
            } as DeletePostReq);
            toast.success("Post borrado exitosamente")
            navigate("/profile") 
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const handleVotePost = async (voteType: Vote) => {
        try {
            await postRepository.toggleVotes({
                sesion: sesion,
                voteType: voteType,
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
    }
  
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

            const selectedProfile = profiles.find(p => p.displayName === form.profile);
            const commentRes = await commentRepository.create({
                sesion,
                postId: id,
                content: form.content,
                profileId: selectedProfile?.id,
                replyTo: null // TODO: ADD -> REPLY SYSTEM
            } as CreateCommentReq);

            const newComment = Comment.fromObject(commentRes);
            setComments(prev => [newComment, ...prev]);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const handleVoteComment = async (commentId: string, voteType: Vote) => {
        try {
            const response = await commentRepository.toggleVotes({
                sesion: sesion,
                voteType: voteType,
                commentId: commentId,
            } as ToggleCommentVotesReq)

            const updateComment = Comment.fromObject(response);
        
            setComments(prevComments =>
                prevComments.map(comment => (comment.id === commentId ? updateComment : comment))
            ); 
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    return {
        trigger,
        comments, 
        onClickOnComments,
        onClickOnAvatarComment,
        onClickOnAvatarPost,
        onClickOnComment,
        onClickDelete,
        handleVotePost,
        handleVoteComment,
        post,
        onClickOnPost,
        isMine,
        handleAddComment, 
        profiles,
        proceedDelete,
        cancelDelete,
        isDeleteOpen
    };
}
