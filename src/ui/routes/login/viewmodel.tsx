import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { Regex, Errors, type LoginUserReq, type SaveSessionReq, type LoginUserRes, Session } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";
import { CONSTANTS } from "../../../core";

export function ViewModel() {

    const navigate = useNavigate();

    const { logged } = useSession();
    const { authRepository, sessionRepository } = useRepositories();

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (logged) {
            navigate("/");
        }
    }, [logged]);

    const onClickPassword = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();

        const form = Object.fromEntries(new FormData(e.currentTarget));

        const payload = {
            email: form.email?.toString().trim().toLowerCase() || "",
            password: form.password?.toString() || ""
        };

        if (!Regex.EMAIL.test(payload.email)) {
            return setError(Errors.INVALID_EMAIL);
        }

        if (!Regex.PASSWORD.test(payload.password)) {
            return setError(Errors.INVALID_PASSWORD);
        }

        const loginPromise = async () => {
            const response: LoginUserRes = await authRepository.login({
                email: payload.email!!,
                password: payload.password!!,
            } as LoginUserReq);

            const session: SaveSessionReq = {
                session: new Session(response.token),
            }

            await sessionRepository.saveSession(session);
        };

        try {
            await toast.promise(
                loginPromise(),
                {
                    loading: CONSTANTS.LOADING_SESSION,
                    success: CONSTANTS.SUCCESS_SESSION,
                    error: (err) => err ? err as string : Errors.UNKNOWN_ERROR,
                }
            );
            navigate("/");
        } catch (error) {}
    }

    return {
        onSubmit,
        onClickPassword,
        showPassword
    };

}
