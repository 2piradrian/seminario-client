import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageHelper, useRepositories } from "../../../core";
import { Regex, Errors, type GetSessionRes, type EditUserReq, type GetAllStyleRes, type GetAllInstrumentRes, type Style, type Instrument, Optionable, type GetUserByIdReq, User, type DeleteUserReq, type LoginUserReq } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {
    
    const navigate = useNavigate();

    const { session, userId } = useSession();
    const { sessionRepository, userRepository, catalogRepository, authRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [styles, setStyles] = useState<Style[]>([]);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        const fetchData = async () => {
            if (user != null){
                await fetchCatalog();
            }
        }
        fetchData().then();
    }, [user]);

    const fetchUser = async () => {
        try {
            const response = await userRepository.getUserById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);
            if (response) {
                setUser(User.fromObject(response));
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchCatalog = async () => {
        try {
            const stylesResponse: GetAllStyleRes = await catalogRepository.getAllStyle();
            const instrumentsResponse: GetAllInstrumentRes = await catalogRepository.getAllInstrument();

            if (stylesResponse) {
                setStyles([...stylesResponse.styles]);
                setSelectedStyles([...Optionable.mapToNames(user?.profile.styles)]);
            }
            if (instrumentsResponse) {
                setInstruments([...instrumentsResponse.instruments]);
                setSelectedInstruments([...Optionable.mapToNames(user?.profile.instruments)]);
            }
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
                surname?: string;
                profileImage?: string;
                portraitImage?: string;
                shortDescription?: string;
                longDescription?: string;
            };

            if (!Regex.NAME.test(form.name || "")) {
                return setError(Errors.INVALID_NAME);
            }

            if (!Regex.SURNAME.test(form.surname || "")) {
                return setError(Errors.INVALID_LASTNAME);
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

            const getSessionRes: GetSessionRes = await sessionRepository.getSession();
            
            const dto: EditUserReq = {
                session: getSessionRes.session,
                name: form.name!!,
                surname: form.surname!!,
                profileImage: profileImageBase64,
                portraitImage: portraitImageBase64,
                shortDescription: form.shortDescription!!,
                longDescription: form.longDescription!!,
                styles: Optionable.mapToOptionable(selectedStyles, styles),
                instruments: Optionable.mapToOptionable(selectedInstruments, instruments),
            }
            await userRepository.edit(dto);
            toast.success("Perfil editado correctamente");
            navigate(`/user/${user.id}`);
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);             
        }
    };

    const onAddStyles = (value: string) => {
        setSelectedStyles((prev) => (prev.includes(value) ? prev : [...prev, value]));
    };

    const onRemoveStyles = (value: string) => {
        setSelectedStyles((prev) => prev.filter((s) => s !== value));
    };

    const onAddInstruments = (value: string) => {
        setSelectedInstruments((prev) => (prev.includes(value) ? prev : [...prev, value]));
    };

    const onRemoveInstruments = (value: string) => {
        setSelectedInstruments((prev) => prev.filter((s) => s !== value));
    };

    const onCancel = () => {
        navigate(`/user/${user.id}`);
    }

    const onClose = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true})
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }

    const onDeleteAccount = async (password: string): Promise<boolean> => {
        if (!user || !session) return false;

        if (!password) {
            toast.error("Debes ingresar tu contraseña para confirmar la eliminación.");
            return false;
        }

        try {
            await authRepository.login({ email: user.email, password } as LoginUserReq);

            await authRepository.delete({ session } as DeleteUserReq);
            await sessionRepository.deleteSession();

            toast.success("Cuenta eliminada correctamente.");
            navigate("/login", { replace: true });
            return true;
        }
        catch (error) {
            toast.error("No se pudo eliminar la cuenta en este momento, por favor inténtalo más tarde.");
            return false;
        }
    }

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const confirmDeleteAccount = async (password: string) => {
        const success = await onDeleteAccount(password);
        if (success) {
            closeDeleteModal();
        }
    };

    const confirmLogout = async () => {
        await onClose();
        closeLogoutModal();
    };

    return {
        onSubmit,
        onCancel,
        styles,
        selectedStyles,
        instruments,
        selectedInstruments,
        onAddStyles,
        onRemoveStyles,
        onAddInstruments,
        onRemoveInstruments,
        user,
        onDeleteAccount,
        isDeleteModalOpen,
        isLogoutModalOpen,
        openDeleteModal,
        closeDeleteModal,
        openLogoutModal,
        closeLogoutModal,
        confirmDeleteAccount,
        confirmLogout
    };
}
