import { useEffect, useState } from "react";
import { useRepositories } from "../../../core";
import { useNavigate } from "react-router-dom";
import { Chat, Errors, User, UserProfile, type GetActiveChatsReq, type GetActiveChatsRes, type GetUserByIdReq } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { userRepository, chatRepository, sessionRepository } = useRepositories();
    const { userId, session } = useSession();
    
    const [user, setUser] = useState<User | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [chats, setChats] = useState<Chat[]>([]);
    
    {/* useEffect */}

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
                await fetchChats();
                await fetchUser();
            }
        }
        fetchData().then();
    }, [session, userId]);

    /* fetch */ 

    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);
            setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : "Error al cargar perfil");
        }
    };

    const fetchChats = async () => {
        try {
            const response = await chatRepository.getActiveChats({
                session: session
            } as GetActiveChatsReq);
            
            setChats(response.activeChats.map((c) => Chat.fromObject(c)) ?? []);

        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }

    }

    const onClickOnChat = (chatId: string) => {
        navigate(`/chat/${chatId}`);
    }

    const onClickOnAvatar = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onLogout = async () => {
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
        chats, 
        onClickOnChat,
        user,
        onLogout,
        onClickOnAvatar
    }

}
