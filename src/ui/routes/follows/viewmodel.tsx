import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "../../../domain"
import { useRepositories } from "../../../core";
import useSession from "../../hooks/useSession";

export default function ViewModel() {
    
    const { id, type } = useParams(); 
    const { userProfileRepository } = useRepositories();
    const { session } = useSession();
    const navigate = useNavigate();

    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        if (!id) {
            navigate("/error-404");
            return;
        }
        fetchProfiles();
    }, [id, type]);

    const fetchProfiles = async () => {
        try {
            let response;
            if (type === "followers") {
                response = await userProfileRepository.getFollowers({
                    session: session,
                    userId: id
                });
            } else {
                response = await userProfileRepository.getFollowing({
                    session: session,
                    userId: id
                });
            }
            setProfiles(response.map(Profile.fromObject));
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };
    

    return(
        profiles
    )
}