import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageHelper } from "../../../core";
import { Regex, Errors, ErrorHandler } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);


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

            toast.success("Página edtada correctamente");
            navigate("/profile");
        }
        catch(error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);             

        }
    }

    const onCancel = () => {
        navigate("/profile");
    }

    return {
        onSubmit, 
        onCancel,
        pageProfile
    };
}