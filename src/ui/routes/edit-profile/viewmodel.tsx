import { useEffect, useState } from "react";
import { Regex, Errors } from "../../../domain";
import toast from "react-hot-toast";

export function ViewModel() {
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
