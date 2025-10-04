import { useEffect, useState } from "react";
import { Category, Errors, type GetCommentPageReq, type GetPostByIdReq } from "../../../domain";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment } from "../../../domain";
import { useRepositories } from "../../../core";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import type { UserProfile } from "../../../domain";
import { Page } from "../../../domain";
import { Post } from "../../../domain";
import { Status } from "../../../domain";
import { PageType } from "../../../domain";

export default function ViewModel() {

    // MOCKEO
    const MOCK_STATUS: Status = {
        id: "status1",
        name: "Active",
    };
    const MOCK_USER: UserProfile = {
        id: "user-1",
        name: "Ana",
        surname: "Druetta",
        email: "ana@example.com",
        memberSince: new Date("2020-01-01"),
        portraitImage: "https://example.com/portrait.png",
        profileImage: "https://example.com/profile.png",
        shortDescription: "Amante de la música",
        longDescription: "taylor te amo",
        instruments: [],
        styles: []
    };

    const MOCK_COMMENT = new Comment(
    "comment-2",
    MOCK_USER,
    null,
    "post-123",
    null, 
    "Este es un comentario de respuesta",
    3,
    0,
    new Date("2025-10-04T10:10:00Z"),
    new Date("2025-10-04T10:12:00Z")
    );
    const MOCK_CATEGORIES: Category[] = [
        new Category("cat1", "Recetas"),
        new Category("cat2", "Música"),
        new Category("cat3", "Tecnología"),
        new Category("cat4", "Viajes"),
        new Category("cat5", "Deportes")
    ];
    const MOCK_POST = new Post(
    "post-123",                            
    "Busco banda",         
    "Buenos dias busco banda", 
    150,                                   
    MOCK_USER,                             
    null,                             
    25,                                    
    3,                                    
    MOCK_CATEGORIES[0],                        
    new Date("2025-10-04T09:00:00Z"),     
    new Date("2025-10-04T09:30:00Z"),     
    "image-123"                            
);
    const MOCK_COMMENTLIST = [MOCK_COMMENT]

    const { id } = useParams();
    const navigate = useNavigate()
    const { trigger } = useScrollLoading();

    const { postRepository, commentRepository } = useRepositories();

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentPage, setCommentPage] = useState<number | null>(1);
    
/*     useEffect(() => {
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
 */
    const fetch = async () => {
        try {
            const postRes = await postRepository.getById(
                { postId: id } as GetPostByIdReq
            );
            console.log(postRes)
            setPost(Post.fromObject(postRes));

            const commentsRes = await commentRepository.getCommentPage(
                { page: commentPage, postId: id, size: 5 } as GetCommentPageReq
            );
            console.log(commentsRes)
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
        comments: MOCK_COMMENTLIST, 
        onClickOnAvatarComment,
        onClickOnAvatarPost,
        onClickOnComment,
        onDownVoteComment,
        onDownVotePost,
        onUpVoteComment,
        onUpVotePost,
        post: MOCK_POST
    };
}