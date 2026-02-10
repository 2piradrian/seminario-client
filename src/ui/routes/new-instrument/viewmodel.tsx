import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Regex,
    Errors,
    User,
    Instrument,
    type CreateInstrumentReq,
    type GetUserByIdReq
} from "../../../domain";
import { useRepositories, CONSTANTS } from "../../../core";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { userId, session } = useSession();
    const {
        instrumentRepository,
        userRepository,
        sessionRepository,
        catalogRepository
    } = useRepositories();

    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* Effects */

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (session != null) {
            fetchInstruments();
        }
    }, [session]);

    useEffect(() => {
        if (!session || !userId) return;
        fetchUser();
    }, [session, userId]);
    
    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);

            setUser(User.fromObject(response));
        } catch (error) {
            toast.error(error ? (error as string) : "Error al cargar perfil");
        }
    };

    const fetchInstruments = async () => {
        try {
            const response = await catalogRepository.getAllInstrument();
            setInstruments(response.instruments);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
    };

    /* Handlers */

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

        const createInstrumentPromise = async () => {
            setIsSubmitting(true);
            try {
                return await instrumentRepository.create({
                    session,
                    name: payload.name
                } as CreateInstrumentReq);
            } finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(createInstrumentPromise(), {
                loading: CONSTANTS.LOADING_EDIT_CATALOG,
                success: CONSTANTS.SUCCESS_EDIT_CATALOG,
                error: err =>
                    err instanceof Error
                        ? err.message
                        : Errors.UNKNOWN_ERROR,
            });

            navigate("/admin/manage-catalog/instruments");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
    };

    const onCancel = () => {
        navigate("/admin/manage-catalog/instruments");
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
        error,
        user,
        onLogout,
        isSubmitting
    };
}
