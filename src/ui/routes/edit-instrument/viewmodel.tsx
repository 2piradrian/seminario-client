import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { ImageHelper, useRepositories, CONSTANTS } from "../../../core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Errors,
    Regex,
    User,
    Instrument,
    type EditInstrumentReq,
    type GetInstrumentByIdReq,
    type GetInstrumentByIdRes,
    type GetUserByIdReq
} from "../../../domain";

export default function ViewModel() {

    const navigate = useNavigate();
    const { id } = useParams();

    const { session, userId } = useSession();
    const { instrumentRepository, userRepository, catalogRepository, sessionRepository } = useRepositories();

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [instrument, setInstrument] = useState<Instrument | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* Effects */

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchInstrument();
                await fetchUser();
            }
        };
        fetchData();
    }, [session]);

    /* Fetch */

    const fetchUser = async () => {
        try {
            const response = await userRepository.getById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);

            if (response) {
                setUser(User.fromObject(response));
            }
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchInstrument = async () => {
        try {
            const req: GetInstrumentByIdReq = {
                id: id,
                session: session
            };

            const response: GetInstrumentByIdRes =
                await instrumentRepository.getById(req);

            if (response) {
                setInstrument(Instrument.fromObject(response));
            }
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
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

        const editInstrumentPromise = async () => {
            setIsSubmitting(true);
            try {
                const dto: EditInstrumentReq = {
                    id: id,
                    name: payload.name,
                    session: session
                };

                await instrumentRepository.edit(dto);
            } 
            catch (error) {
                toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
            } 
            finally {
                setIsSubmitting(false);
            }
        };

        try {
            await toast.promise(editInstrumentPromise(), {
                loading: CONSTANTS.LOADING_EDIT_CATALOG,
                success: CONSTANTS.SUCCESS_EDIT_CATALOG,
                error: (err) =>
                    err instanceof Error ? err.message : Errors.UNKNOWN_ERROR,
            });

            navigate(`/admin/manage-catalog/instruments`);
        } catch (error) {}
    };

    const onCancel = () => {
        navigate(`/admin/manage-catalog/instruments`);
    };

    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession();
            toast.success("Sesión cerrada");
            navigate("/login", { replace: true });
        } catch (e) {
            toast.error("No se pudo cerrar sesión");
        }
    };

    return {
        onSubmit,
        onCancel,
        instrument,
        user,
        onLogout,
        isSubmitting
    };
}
