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
    const { followRepository, userRepository, sessionRepository } = useRepositories();
    const { trigger } = useScrollLoading();

    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [followersPage, setFollowersPage] = useState<number | null>(1);
    const [followingPage, setFollowingPage] = useState<number | null>(1);
    const [title, setTitle] = useState<string>("Seguidores");
    const currentUserId = userId;

    useEffect(() => {
        initializeView();
    }, [id, type, session]);

    useEffect(() => {
        if (!session) return;
        loadNextPage();
    }, [trigger, type, session]);

    const initializeView = async () => {
        if (!id) {
            navigate("/error-404");
            return;
        }

        if (!session) return;

        setLoading(true);
        setFollowersPage(1);
        setFollowingPage(1);

        try {
            await fetchUser();
            
            const initialPage = 1;
            let newProfiles: Profile[] = [];

            if (type === "followers") {
                const response = await followRepository.getFollowers({ subjectId: id, page: initialPage, size: 10, session });
                
                setFollowersPage(response.nextPage ? initialPage + 1 : null);
                
                newProfiles = response.followers.map(UserProfile.fromObject).map(u => u.toProfile());
                setTitle("Seguidores");

            } else if (type === "following") {
                const response = await followRepository.getFollowing({ subjectId: id, page: initialPage, size: 10, session });
                
                setFollowingPage(response.nextPage ? initialPage + 1 : null);
                
                newProfiles = response.following.map(UserProfile.fromObject).map(u => u.toProfile());
                setTitle("Siguiendo");

            }
            setProfiles(newProfiles);
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        } finally {
            setLoading(false);
        }
    };

    const loadNextPage = async () => {
        if (loading || fetching) return;

        const currentPage = type === "followers" ? followersPage : followingPage;
        
        if (currentPage === null || currentPage === 1) return;

        setFetching(true);
        try {
            if (type === "followers") {
                const response = await followRepository.getFollowers({ subjectId: id, page: currentPage, size: 10, session });

                setFollowersPage(response.nextPage ? currentPage + 1 : null);

                setProfiles(prev => [...prev, ...response.followers.map(UserProfile.fromObject).map(f => f.toProfile())]);
            } else if (type === "following") {
                const response = await followRepository.getFollowing({ subjectId: id, page: currentPage, size: 10, session });

                setFollowingPage(response.nextPage ? currentPage + 1 : null);

                setProfiles(prev => [...prev, ...response.following.map(UserProfile.fromObject).map(f => f.toProfile())]);
            }
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        } finally {
            setFetching(false);
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
        loading,
        profiles,
        title,
        toggleFollow,
        onClickOnProfile,
        currentUserId,
        user,
        onLogout
    }; 
}
