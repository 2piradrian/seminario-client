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
                sesion: sesion, 
                userId: id
            } as GetUserByIdReq);

            const userProfile = UserProfile.fromObject(user);
            setIsFollowing(userProfile.isFollowing)

            setUserProfile(userProfile);

        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const toggleFollow = async () => {
        try {
            await userProfileRepository.toggleFollow({
                sesion: sesion,
                id: userId
            } as ToggleFollowReq);

            if (isFollowing) {    // Unfollow
                updateFollowsCounter(false, -1)
            }
            else {               // Follow
                updateFollowsCounter(true, 1)
            }
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const updateFollowsCounter = (follow: boolean, quantity: number) => {
        const updated: UserProfile = {
            ...userProfile,
            followersCount: userProfile.followersCount + quantity
        };
        setUserProfile(updated);
        setIsFollowing(follow);
    }

    
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