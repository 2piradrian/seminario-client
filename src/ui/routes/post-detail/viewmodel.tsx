import { useCallback, useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Errors, Post, Regex, Vote, Profile, PageProfile, type CreateCommentReq, type DeletePostReq, type GetCommentPageReq, type GetPostByIdReq, type GetUserByIdReq, type GetPageByUserIdReq, type TogglePostVotesReq, type ToggleCommentVotesReq, User, type DeleteCommentReq, Role, PostType } from "../../../domain";
import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate()
    const { id } = useParams();
    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { postRepository, commentRepository, sessionRepository, userRepository, pageRepository, catalogRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [post, setPost] = useState<Post | null>(null);
    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number | null>(1);
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [expandedComments, setExpandedComments] = useState<string[]>([]);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isDeleteCommentOpen, setIsDeleteCommentOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    
    // --- EFFECT ---
    useEffect(() => {
        if (commentPage != null && session != null && id != null) {
            setCommentPage(trigger);
            fetchComments().then();
        }
    }, [trigger]);

    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
                await fetch();
                await fetchComments();
            }
        }
        fetchData().then();
    }, [session]);

    // --- MEMOS ---
    const isAdminOrMod = useMemo(() => {
        return currentUserRole === Role.ADMIN || currentUserRole === Role.MODERATOR;
    }, [currentUserRole]);
    
    const isMine = useMemo(() => {
        if (!post || !userId) return false
        return post.author?.id === userId || post.pageProfile?.owner?.id === userId
    }, [post, userId])

    const isMyComment = useMemo(() => {
        return (comment: Comment) => {
            if (!comment || !userId) return false;
            return comment.author?.id === userId;
        };
    }, [userId]);


    const rootComments = useMemo(() => {
        return comments.filter(c => !c.replyTo);
    }, [comments]);

    // --- FETCHS ---
    const fetch = async () => {
        try {
            const postRes = await postRepository.getById(
                { postId: id, session } as GetPostByIdReq
            );
            setPost(Post.fromObject(postRes));
            await fetchProfiles().then();
            await fetchPostTypes().then();
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchComments = async () => {
        try {
            const commentRes = await commentRepository.getComments(
                { session: session, page: commentPage ?? 1, size: 15, postId: id } as GetCommentPageReq
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
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPostTypes = async () => {
        try {
            const response = await catalogRepository.getAllPostType();
            const postTypesFromRes = response.postTypes.map(pt => PostType.fromObject(pt));
            setPostTypes(postTypesFromRes);            
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const fetchProfiles = async () => {
        try {
            const userResponse = await userRepository.getById(
                { session, userId } as GetUserByIdReq
            );
            const user = User.fromObject(userResponse);
            setCurrentUserRole(user.role);

            const pagesResponse = await pageRepository.getByUserId(
                { session, userId: user.id } as GetPageByUserIdReq
            );
            const pages = pagesResponse.pages.map(p => PageProfile.fromObject(p));

            const profilesList: Profile[] = []
            profilesList.push(user.toProfile());

            pages.forEach((page: PageProfile) => {
                profilesList.push(page.toProfile());
            });

            setProfiles(profilesList);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    // --- HANDLERS ---
    const onClickOnAvatarComment = (comment: Comment) => {
        if (comment.author.id) navigate(`/user/${comment.author.id}`);
    };

    const onClickOnAvatarPost = () => {
        if (!post) return;
        navigate(post.pageProfile?.id ? `/page/${post.pageProfile.id}` : `/user/${post.author.id}`);
    };

    const onClickDelete = () => setIsDeleteOpen(true);
    const cancelDelete = () => setIsDeleteOpen(false);

    const proceedDelete = async () => {
        try {
            await postRepository.delete({
                session: session,
                postId: id,
            } as DeletePostReq);
            toast.success("Post borrado exitosamente")
            navigate("/profile") 
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const proceedDeleteComment = async () => {
        if (!selectedCommentId) return;

        try {
            await commentRepository.delete({
                session: session,
                commentId: selectedCommentId
            } as DeleteCommentReq); 

            setComments(prev => prev.filter(c => c.id !== selectedCommentId));

            toast.success("Comentario borrado exitosamente");
            
            setIsDeleteCommentOpen(false);
            setSelectedCommentId(null);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const handleVotePost = async (voteType: Vote) => {
        try {
            const postRes = await postRepository.toggleVotes({
                session: session,
                voteType: voteType,
                postId: id,
            } as TogglePostVotesReq)

            const updatedPost = Post.fromObject(postRes);
            setPost(updatedPost);
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
                return setError(String(Errors.INVALID_CONTENT));
            }

            const selectedProfile = profiles.find(p => p.displayName === form.profile);
            await commentRepository.create({
                session: session,
                postId: id,
                content: form.content,
                profileId: selectedProfile?.id,
                replyTo: replyTo 
            } as CreateCommentReq);

            setReplyTo(null);
            window.location.reload();
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const handleVoteComment = async (commentId: string, voteType: Vote) => {
        try {
            const response = await commentRepository.toggleVotes({
                session: session,
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

    const handleReply = (commentId: string) => {
        const targetComment = comments.find(c => c.id === commentId);
        
        if (targetComment) {
            const rootId = targetComment.replyTo ? targetComment.replyTo.id : targetComment.id;
            setReplyTo(prev => (prev === rootId ? null : rootId));
        }
    };

    const toggleMenu = (id: string) => {
        if (activeMenuId === id) {
            setActiveMenuId(null);
        } else {
            setActiveMenuId(id);
        }
    };

    const toggleReplies = (commentId: string) => {
        if (expandedComments.includes(commentId)) {
            setExpandedComments(prev => prev.filter(id => id !== commentId));
        } else {
            setExpandedComments(prev => [...prev, commentId]);
        }
    };

    const isExpanded = (commentId: string) => expandedComments.includes(commentId);

    const getReplies = useCallback((parentId: string) => {
        return comments.filter(c => c.replyTo?.id === parentId);
    }, [comments]);


    const onClickEdit = async (postId: string) => {
        navigate(`/edit-post/${postId}`)
    };

    const onClickDeleteComment = (commentId: string) => {
        setSelectedCommentId(commentId);
        setIsDeleteCommentOpen(true);
    };

    const cancelDeleteComment = () => {
        setIsDeleteCommentOpen(false);
        setSelectedCommentId(null);
    };

    const closeMenu = () => setActiveMenuId(null);
    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true})
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    const onClickOnComment = () => {}; 
    const onClickOnComments = () => {};
    const onClickOnPost = () => {};


    return {
        trigger,
        rootComments, 
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
        isDeleteOpen,
        onClickEdit,
        replyTo,
        setReplyTo,
        getReplies,   
        toggleReplies,
        isExpanded,   
        handleReply, 
        onClickDeleteComment,
        cancelDeleteComment,
        proceedDeleteComment,
        isDeleteCommentOpen,
        isMyComment,
        isAdminOrMod,
        activeMenuId,
        toggleMenu,
        closeMenu,
        onLogout,
        postTypes
    };
}
