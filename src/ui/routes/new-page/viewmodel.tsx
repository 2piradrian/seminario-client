import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Errors, PageType, Regex, User, type CreatePageReq, type GetUserByIdReq } from "../../../domain";
import { useRepositories, CONSTANTS } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { userId, session } = useSession();
    const { catalogRepository, pageRepository, userRepository, sessionRepository } = useRepositories();
    
    const [error, setError] = useState<string | null>(null); 
    const [pageTypes, setPageTypes] = useState<PageType[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null){
                await fetchUser();
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

    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        toast.dismiss();

        if (isSubmitting) return;

        const form = Object.fromEntries(new FormData(e.currentTarget));

        const payload = {
            name: form.name?.toString().trim() || "",
            pageType: form.pageType?.toString() || ""
        };

        if (!Regex.NAME.test(payload.name)) {
            return setError(Errors.INVALID_NAME);
        }

        const createPagePromise = async () => {
            setIsSubmitting(true);
            try {
                const response = await pageRepository.create({
                    name: payload.name,
                    pageTypeId: PageType.toOptionable(payload.pageType, pageTypes).id,
                    session: session
                } as CreatePageReq);
                return response;
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        try {
            const response = await toast.promise(
                createPagePromise(),
                {
                    loading: CONSTANTS.LOADING_NEW_PAGE,
                    success: CONSTANTS.SUCCESS_NEW_PAGE,
                    error: (err) => err ? err as string : Errors.UNAUTHORIZED,
                }
            );

            const pageId = response.pageId;
            navigate(`/page/${pageId}`); 
        } catch(error) {}
    } 

    const onCancel = () => {
        navigate(`/user/${userId}`);
    }

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

    return {
        onSubmit,
        onCancel,
        pageTypes,
        user,
        onLogout,
        isSubmitting
    }
}
