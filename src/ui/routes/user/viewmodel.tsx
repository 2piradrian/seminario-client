import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRepositories } from "../../../core";
import { Errors , type GetUserByIdReq, UserProfile } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import { useNavigate, useParams } from "react-router-dom";
import type { ToggleFollowReq } from "../../../domain/dto/user/request/ToggleFollowReq";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userProfileRepository } = useRepositories();
    const { userId, sesion } = useSesion();

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    
    const [isFollowing, setIsFollowing] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                navigate("/error-404");
                return; 
            }
            await fetchUserProfile();
        };
        fetchData();
    }, [id]); 

    const fetchUserProfile = async () => {
        try {
            const user = await userProfileRepository.getUserById({
                userId: id
            } as GetUserByIdReq);

            const userProfile = UserProfile.fromObject(user);

            setUserProfile(userProfile);

        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const toggleFollow = async () => {
        setIsFollowing(!isFollowing);

        try {
            await userProfileRepository.toggleFollow({
                sesion: sesion,
                userId: userId
            } as ToggleFollowReq) 
            
            setIsFollowing(true);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    
    const onFollowersClick = () => {};
    const onFollowingClick = () => {};

    
    return {
        isFollowing, 
        toggleFollow,
        userProfile,
        onFollowersClick, 
        onFollowingClick
    };
}