import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { EntityType, Errors, Profile, UserProfile, User, type ToggleFollowReq, type GetUserByIdReq } from "../../../domain";
import { PrefixedUUID, useRepositories } from "../../../core";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();
    const { id, type } = useParams(); 
    const { userId, session } = useSession();
    const { followRepository, userRepository } = useRepositories();
    const { trigger } = useScrollLoading();

    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [followersPage, setFollowersPage] = useState<number | null>(1);
    const [followingPage, setFollowingPage] = useState<number | null>(1);
    const [title, setTitle] = useState<string>("Seguidores");
    const currentUserId = userId;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            if (session) { 
                await fetchUser();
                await fetchProfiles();
            }
        };
        fetchData().then(() => setLoading(false));
    }, [id, type, session]);

    useEffect(() => {
        if (!session) return;
        const loadNextPage = async () => {
            if (type === "followers" && followersPage != null) {
                await fetchFollowers();
                setFollowersPage(prev => prev! + 1);
            } else if (type === "following" && followingPage != null) {
                await fetchFollowing();
                setFollowingPage(prev => prev! + 1);
            }
        };
        loadNextPage();
    }, [trigger, type, session]);

    const fetchProfiles = async () => {
        try {
            if (type === "followers") {
                await fetchFollowers();
            } else if (type === "following") {
                await fetchFollowing();
                setTitle("Siguiendo");
            }
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchUser = async () => {
        try {
            if (!userId) return;
            const response = await userRepository.getById({ session, userId } as GetUserByIdReq);
            setUser(User.fromObject(response));
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };
    
    const fetchFollowers = async () => {
        const response = await followRepository.getFollowers({ subjectId: id, page: followersPage, size: 10, session });
        if (!response.nextPage) setFollowersPage(null);
        if (followersPage === 1) {
            setProfiles(response.followers.map(UserProfile.fromObject).map(u => u.toProfile()));
        } else {
            setProfiles(prev => [...prev, ...response.followers.map(UserProfile.fromObject).map(f => f.toProfile())]);
        }
    };

    const fetchFollowing = async () => {
        const response = await followRepository.getFollowing({ subjectId: id, page: followingPage, size: 10, session });
        if (!response.nextPage) setFollowingPage(null);
        if (followingPage === 1) {
            setProfiles(response.following.map(UserProfile.fromObject).map(u => u.toProfile()));
        } else {
            setProfiles(prev => [...prev, ...response.following.map(UserProfile.fromObject).map(f => f.toProfile())]);
        }
    };

    const toggleFollow = async (profile: Profile) => {
        try {
            await followRepository.toggleFollow({ session, id: profile.id } as ToggleFollowReq);
            setProfiles(prev => prev.map(p => p.id === profile.id ? { ...p, isFollowing: !p.isFollowing } : p));
            toast.success(profile.isFollowing ? "Dejaste de seguir a " + profile.displayName : "Ahora sigues a " + profile.displayName);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickOnProfile = (profile: Profile) => {
        if (PrefixedUUID.resolveType(profile.id) === EntityType.PAGE) {
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
        onClickOnProfile,
        currentUserId,
        user
    }; 
}
