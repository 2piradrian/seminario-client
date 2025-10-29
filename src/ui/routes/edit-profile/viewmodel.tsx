import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageHelper, useRepositories } from "../../../core";
import { Regex, Errors, type GetSessionRes, type EditUserReq, type UserProfile, type GetAllStyleRes, type GetAllInstrumentRes, type Style, type Instrument, Optionable, type GetUserByIdReq, User } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {
    
    const navigate = useNavigate();

    const { session, userId } = useSession();
    const { sessionRepository, userProfileRepository, catalogRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [styles, setStyles] = useState<Style[]>([]);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

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
            const response = await userProfileRepository.getUserById({
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
            await userProfileRepository.edit(dto);
            toast.success("Perfil editado correctamente");
            navigate("/profile");
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
        navigate("/profile");
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
        onClose
    };
}
