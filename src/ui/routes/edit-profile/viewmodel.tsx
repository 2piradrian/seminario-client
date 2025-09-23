import { useEffect, useState } from "react";
import { useRepositories } from "../../../core";
import { Regex, Errors, type GetSesionRes, type EditUserReq } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {

    const { sesionRepository, userRepository} = useRepositories();

    const [error, setError] = useState<string | null>(null);
    const [styles, setStyles] = useState<string[]>([]);
    const [instruments, setInstruments] = useState<string[]>([]);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const onAddStyles = (value: string) => {
        setStyles((prev) => (prev.includes(value) ? prev : [...prev, value]));
    };

    const onRemoveStyles = (value: string) => {
        setStyles((prev) => prev.filter((s) => s !== value));
    };

    const onAddInstruments = (value: string) => {
        setInstruments((prev) => (prev.includes(value) ? prev : [...prev, value]));
    };

    const onRemoveInstruments = (value: string) => {
        setInstruments((prev) => prev.filter((s) => s !== value));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const form = Object.fromEntries(new FormData(e.currentTarget)) as {
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

            if (!Regex.IMAGE_URL.test(form.profileImage || "")) {
                return setError(Errors.INVALID_PROFILEIMAGE);
            }

            if (!Regex.IMAGE_URL.test(form.portraitImage || "")) {
                return setError(Errors.INVALID_PORTRAITIMAGE);
            }

            if (!Regex.SHORT_DESCRIPTION.test(form.shortDescription || "")) {
                return setError(Errors.INVALID_SHORTDESCRIPTION);
            }

            if (!Regex.LONG_DESCRIPTION.test(form.longDescription || "")) {
                return setError(Errors.INVALID_LONGDESCRIPTION);
            }

            console.log({ ...form, styles, instruments });

            const response = await sesionRepository.getSesion();

            const sesion: GetSesionRes = {
                sesion: response.sesion
            }

            const accessToken = sesion.sesion.token.accessToken

            const dto: EditUserReq = {
                token: accessToken,
                name: form.name!!,
                surname: form.surname!!,
                profileImage: form.profileImage!!,
                portraitImage: form.portraitImage!!,
                shortDescription: form.shortDescription!!,
                longDescription: form.longDescription!!,
                styles: styles,
                instruments: instruments,
            }

            await userRepository.editUser(dto);
        }
        catch (error) {
            toast.error(error ? error as string : "Error desconocido");
        }
    };

    return {
        onSubmit,
        styles,
        instruments,
        onAddStyles,
        onRemoveStyles,
        onAddInstruments,
        onRemoveInstruments,
    };
}
