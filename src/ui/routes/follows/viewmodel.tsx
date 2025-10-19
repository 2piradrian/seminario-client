import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Profile, UserProfile, type ToggleFollowReq } from "../../../domain"
import { useRepositories } from "../../../core";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";
import { EntityType, resolveEntityType } from "../../../core/utils/prefixed-uuid";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { id, type } = useParams(); 
    const { userProfileRepository } = useRepositories();
    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();

    const [loading, setLoading] = useState(true);

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const [followersPage, setFollowersPage] = useState<number | null>(1);
    const [followingPage, setFollowingPage] = useState<number | null>(1);
    const [title, setTitle] = useState<string>("Seguidores");

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            if (session) { 
                await fetchProfiles();
            }
        };

        fetchData().then(() => setLoading(false));
    }, [id, type, session]);

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
                setTitle("Siguiendo")
            }
        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };
    
    const fetchFollowers = async() => {
        const dto = { userId: id, page: followersPage, size: 10, session: session }
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
        const dto = { userId: id, page: followingPage, size: 10, session: session }
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

    const toggleFollow = async (profile: Profile) => {
        try {
            await userProfileRepository.toggleFollow({
                session: session,
                id: profile.id
            } as ToggleFollowReq);

            setProfiles(prevProfiles =>
                prevProfiles
                .map(p =>
                    p.id === profile.id
                        ? { ...p, isFollowing: !p.isFollowing }
                        : p
                )
        );

        toast.success(
            profile.isFollowing
                ? "Dejaste de seguir a " + profile.displayName
                : "Ahora sigues a " + profile.displayName
        );
            
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickOnProfile = (profile: Profile) => {
        if (resolveEntityType(profile.id) === EntityType.PAGE) {
            navigate(`/page/${profile.id}`);
        } else {
            navigate(`/user/${profile.id}`);
        }
    };

    return {
        loading,
        profiles,
        title,
        toggleFollow,
        onClickOnProfile
    }; 
}