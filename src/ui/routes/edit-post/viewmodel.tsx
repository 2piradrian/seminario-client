import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { ImageHelper, useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Errors, Post, Regex, type EditPostReq, type GetPostByIdReq, type GetPostByIdRes } from "../../../domain";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { session } = useSession();
    const { postRepository } = useRepositories()
    
    const [error, setError] = useState<string | null>(null);

    const [post, setPost] = useState<Post | null>(null);

    {/* useEffect */}

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
                await fetchPost();
            }
        }
        fetchData().then();
    }, [session]);

    { /*fetch */ }

    const fetchPost = async () => {
        try {
            const getPostByIdReq: GetPostByIdReq = {
                postId: id,
                session: session
            }
            const response: GetPostByIdRes = await postRepository.getById(getPostByIdReq)
            
            if (response) {
                const post = Post.fromObject(response)
                setPost(post);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    }

    { /* Event handler */ }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                title?: string;
                content?: string;
                profile?: string
            }

            if (!Regex.POST_TITLE.test(form.title || "")) {
                return setError(Errors.INVALID_TITLE);
            }
            
            if (!Regex.POST_CONTENT.test(form.content || "")) {
                return setError(Errors.INVALID_CONTENT);
            }

            const eventFile = formData.get("postImage") as File | null;

            const imageBase64 = eventFile && eventFile.size > 0
                ? await ImageHelper.convertToBase64(eventFile)
                : null;
            
            const dto: EditPostReq = {
                title: form.title,
                postId: id, 
                session: session,
                content: form.content,
                image: imageBase64,
            }

            await postRepository.edit(dto);
            toast.success("Publicación editada correctamente");
            navigate("/profile");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onCancel = () => {
        navigate("/profile");
    }; 

    return {
        onSubmit, 
        onCancel, 
        post
    }
}