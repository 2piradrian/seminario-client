import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { Regex, Errors, type RegisterUserReq } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export function ViewModel() {

    const navigate = useNavigate();

    const { logged, userId } = useSession();
    const { authRepository } = useRepositories();

    const [error, setError] = useState<string | null>(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null); 
        }
    }, [error]); 

    useEffect(() => {
        if (logged) {
            navigate(`/user/${userId}`);
        }
    }, [logged]);

    const onClickPassword = () => setShowPassword(prev => !prev);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        try {
            e.preventDefault();

            if (isSubmitting) return;

            setIsSubmitting(true);

            const form = Object.fromEntries(new FormData(e.currentTarget));

            const payload = {
                name: form.name?.toString().trim() || "",
                surname: form.surname?.toString().trim() || "",
                email: form.email?.toString().trim().toLowerCase() || "",
                password: form.password?.toString() || ""
            };

            if(!Regex.NAME.test(payload.name)) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_NAME);
            }

            if(!Regex.SURNAME.test(payload.surname)) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_LASTNAME);
            }

            if(!Regex.EMAIL.test(payload.email)) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_EMAIL);
            }
            
            if(!Regex.PASSWORD.test(payload.password)) {
                setIsSubmitting(false);
                return setError(Errors.INVALID_PASSWORD);
            } 

            await authRepository.register({
                name: payload.name,
                surname: payload.surname,
                email: payload.email,
                password: payload.password,
            } as RegisterUserReq);

            toast.success("Cuenta creada correctamente");
            setIsSubmitting(false);
            navigate("/login");
        }
        catch (error) {
            setIsSubmitting(false);
            toast.error(error ? error as string : Errors.UNAUTHORIZED);
        }
    }

    return {
        onSubmit,
        isSubmitting,
        showPassword,
        onClickPassword
    };
    
}
