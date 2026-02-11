import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import {
    Errors,
    Instrument,
    User,
    type DeleteInstrumentReq,
    type GetUserByIdReq
} from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();
    const { id } = useParams();

    const { userId, session } = useSession();
    const {
        catalogRepository,
        userRepository,
        sessionRepository,
        instrumentRepository
    } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [instrumentToDelete, setInstrumentToDelete] = useState<Instrument | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
    
    /* Fetch */

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
            toast.error(error?.message || Errors.UNKNOWN_ERROR);
        }
    };

    /* Navigation */

    const onClickOnAddItem = () => {
        navigate("/admin/manage-catalog/instruments/new-instrument");
    };

    const onClickOnEditItem = (item: Instrument) => {
        navigate(`/admin/manage-catalog/instruments/edit-instrument/${item.id}`);
    };

    /* Delete flow */

    const onClickDelete = (item: Instrument) => {
        setInstrumentToDelete(item);
        setIsDeleteOpen(true);
    };

    const cancelDelete = () => {
        setInstrumentToDelete(null);
        setIsDeleteOpen(false);
    };

    const proceedDelete = async () => {
        if (!instrumentToDelete || !session) return;

        try {
            await instrumentRepository.delete({
                session,
                id: instrumentToDelete.id
            } as DeleteInstrumentReq);

            toast.success("Instrumento borrado exitosamente");

            setInstruments(prev =>
                prev.filter(i => i.id !== instrumentToDelete.id)
            );

            cancelDelete();
        } 
        catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
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
        isLoading,
        instruments,
        user,
        onClickOnAddItem,
        onClickOnEditItem,
        onClickDelete,
        cancelDelete,
        proceedDelete,
        onLogout,
        isDeleteOpen
    };
}
