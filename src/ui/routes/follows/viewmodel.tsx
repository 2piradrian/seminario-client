import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Profile } from "../../../domain"
import { useRepositories } from "../../../core";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {
    
    const { id, type } = useParams(); 

    const { userProfileRepository } = useRepositories();
    
    const { trigger } = useScrollLoading();
    
    const { session } = useSession();
    const navigate = useNavigate();

    const [profiles, setProfiles] = useState<Profile[]>([]);

    const [followersPage, setFollowersPage] = useState<number | null>(1);
    const [followingPage, setFollowingPage] = useState<number | null>(1);

    useEffect(() => {
        if (!id) {
            navigate("/error-404");
            return;
        }
        fetchProfiles();
    }, [id, type]);

    useEffect(() => {
        if (followersPage != null && session != null) {
            setFollowersPage(trigger);
            fetchFollowers().then();
        }
    }, [trigger]);

    useEffect(() => {
        if (followingPage != null && session != null) {
            setFollowingPage(trigger);
            fetchFollowing().then();
        }
    }, [trigger]);

    const fetchProfiles = async () => {
        try {
            if (type === "followers") {
                fetchFollowers();
            }
            else {
                fetchFollowing();
            }
        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };
    
    const fetchFollowers = async() => {
        const dto = { userId: id, page: followersPage, size: 10 }
        const response = await userProfileRepository.getFollowers(dto)
        if (!response.nextPage) {
            setFollowersPage(null);
        }            
        if (followersPage === 1) {
            setProfiles(response.followers.map(follower => Profile.fromEntity(follower, null)));
        } 
        else {
            setProfiles(prevFollowers => [
                ...prevFollowers,
                ...response.followers.map(follower => Profile.fromEntity(follower, null))
            ]);
        }
    }

    const fetchFollowing = async() => {
        const dto = { userId: id, page: followingPage, size: 10 }
        const response = await userProfileRepository.getFollowing(dto)
        if (!response.nextPage) {
            setFollowingPage(null)
        }
        if (followingPage === 1) {
            setProfiles(response.following.map(following => Profile.fromEntity(following, null)));
        }
        else {
            setProfiles(prevFollowing => [
                ...prevFollowing, 
                ...response.following.map(following => Profile.fromEntity(following, null))
            ]);
        }
    } 

    return {
        profiles
    }; 
}