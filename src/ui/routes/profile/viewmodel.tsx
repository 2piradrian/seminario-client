import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { Errors, type GetOwnProfileReq, type GetOwnProfileRes, type UserProfile } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { token } = useSesion();
    const { userRepository } = useRepositories();

    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (token != null){
                await fetchProfile();
            }
        }
        fetchData();
    }, []);

    const fetchProfile = async () => {
        try {
            const getOwnProfileReq: GetOwnProfileReq = {
                token: token!!,
            };
            const profile: GetOwnProfileRes = await userRepository.getOwnProfile(getOwnProfileReq);

            if (profile) {
                setProfile(profile);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const goToEditProfile = () => {
        navigate("/profile/edit");
    };

    return {
        goToEditProfile,
        profile,
    };
}