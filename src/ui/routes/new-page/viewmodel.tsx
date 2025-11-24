import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Errors, PageType, Regex, type CreatePageReq } from "../../../domain";
import { useRepositories } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { session } = useSession();
    const { catalogRepository, pageRepository } = useRepositories();
    
    const [error, setError] = useState<string | null>(null); 
    const [pageTypes, setPageTypes] = useState<PageType[]>([]);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null){
                await fetchPageTypes();
            }
        }
        fetchData().then();
    }, [session]);

    const fetchPageTypes = async () => {
        try {
            const response = await catalogRepository.getAllPageType();
            const types = response.pageTypes.map((t: any) => PageType.fromObject(t));
            setPageTypes(types);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        try {
            e.preventDefault();

            const form = Object.fromEntries(new FormData(e.currentTarget)) as { 
                name?: string;
                pageType?: string;
            };

            if(!Regex.NAME.test(form.name || "")) {
                return setError(Errors.INVALID_NAME);
            }

            const response = await pageRepository.create({
                name: form.name,
                pageTypeId: PageType.toOptionable(form.pageType, pageTypes).id,
                session: session
            } as CreatePageReq);

            toast.success("Página creada correctamente");
            
            const pageId = response.pageId;
            navigate(`/page/${pageId}`); 
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNAUTHORIZED);
        }
    } 

    const onCancel = () => {
        navigate("/profile");
    }

    return {
        onSubmit,
        onCancel,
        pageTypes
    }
}