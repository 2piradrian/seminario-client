import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageHelper, useRepositories } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import { Regex, Errors, PageProfile, User, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const { userRepository, sessionRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<PageProfile | null>(null);
    const [user, setUser] = useState<User | null>(null);


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
                await fetchPage();
            }
        }
        fetchData().then();
    }, [session]);

    const fetchPage = async () => {
        try {
            
            if (page) {
                setPage(page);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
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

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                name?: string;
                profileImage?: string;
                portraitImage?: string;
                shortDescription?: string;
                longDescription?: string;
            };

            if (!Regex.NAME.test(form.name || "")) {
                return setError(Errors.INVALID_NAME);
            }

            const profileFile = formData.get("profileImage") as File | null;
            const portraitFile = formData.get("portraitImage") as File | null;
            
            const profileImageBase64 = profileFile && profileFile.size > 0
                ? await ImageHelper.convertToBase64(profileFile)
                : null;
            
            const portraitImageBase64 = portraitFile && portraitFile.size > 0
                ? await ImageHelper.convertToBase64(portraitFile)
                : null;
            
            if (!Regex.SHORT_DESCRIPTION.test(form.shortDescription || "")) {
                 return setError(Errors.INVALID_SHORTDESCRIPTION);
            }
            
            if (!Regex.LONG_DESCRIPTION.test(form.longDescription || "")) {
                return setError(Errors.INVALID_LONGDESCRIPTION);
            }

            toast.success("Página editada correctamente");
            navigate("/profile");
        }
        catch(error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);             

        }
    }

    const onCancel = () => {
        navigate("/profile");
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
        page,
        user,
        onLogout
    };
}
