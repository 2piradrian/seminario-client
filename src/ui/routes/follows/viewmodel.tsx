import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Errors, Profile } from "../../../domain"
import { useRepositories } from "../../../core";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {
    
    const { id, type } = useParams(); 

    const { userProfileRepository } = useRepositories();
    
    const { session } = useSession();
    const navigate = useNavigate();

    const [profiles, setProfiles] = useState<Profile[]>([]);

    const [postPage, setPostPage] = useState<number | null>(1);


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
                response = await userProfileRepository.getFollowers({ userId: id, page: postPage, size: 15 });
            }
            else {
                response = await userProfileRepository.getFollowing({ userId: id, page: postPage, size: 15 });
            }
            setProfiles(response.map(Profile.fromEntity));
        } 
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };
    

    return {
        profiles
    }; 
}