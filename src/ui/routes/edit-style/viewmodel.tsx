import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { ImageHelper, useRepositories, CONSTANTS } from "../../../core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Errors,
    Style,
    Regex,
    User,
    type EditStyleReq,
    type GetStyleByIdReq,
    type GetStyleByIdRes,
    type GetUserByIdReq
} from "../../../domain";

export default function ViewModel() {

    const navigate = useNavigate();
    const { id } = useParams();

    const { session, userId } = useSession();
    const {
        styleRepository,
        userRepository,
        sessionRepository
    } = useRepositories();

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [style, setStyle] = useState<Style | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* Effects */

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
                fetchStyle();
                fetchUser();
            }
        }
        fetchData().then();
    }, [session]);


    /* Fetch */

    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session,
                userId: userId!
            } as GetUserByIdReq);

            if (response) {
                setUser(User.fromObject(response));
            }
        } catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchStyle = async () => {
        try {
            const req: GetStyleByIdReq = {
                id,
                session
            };

            const response: GetStyleByIdRes =
                await styleRepository.getById(req);

            if (response) {
                setStyle(Style.fromObject(response));
            }
        } catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    /* Event handlers */

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();

        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const form = Object.fromEntries(formData);

        const payload = {
            name: form.name?.toString().trim() || "",
        };

        if (!Regex.NAME.test(payload.name)) {
            return setError(Errors.INVALID_NAME);
        }

        const editStylePromise = async () => {
            setIsSubmitting(true);
            try {
                const dto: EditStyleReq = {
                    id,
                    name: payload.name,
                    session
                };

                console.log("EDIT STYLE DTO", {
                    id,
                    name: payload.name,
                    session
                    });

                await styleRepository.edit(dto);
            } 
            catch (error) {
                throw(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR)
            }
                finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(editStylePromise(), {
                loading: CONSTANTS.LOADING_EDIT_CATALOG,
                success: CONSTANTS.SUCCESS_EDIT_CATALOG,
                error: err =>
                    err instanceof Error ? err.message : Errors.UNKNOWN_ERROR,
            });

            navigate(`/admin/manage-catalog/styles`);
        } catch {}
    };

    const onCancel = () => {
        navigate(`/admin/manage-catalog/styles`);
    };

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession();
            toast.success("Sesión cerrada");
            navigate("/login", { replace: true });
        } catch {
            toast.error("No se pudo cerrar sesión");
        }
    };

    return {
        onSubmit,
        onCancel,
        style,
        user,
        onLogout,
        isSubmitting
    };
}
