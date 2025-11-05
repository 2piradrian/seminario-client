import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { Errors, Review, User, type CreateReviewReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();

    const { id: reviewedUserId} = useParams();

    const { session } = useSession();
    const { userRepository, reviewRepository } = useRepositories()
    
    const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState<User | null>(null);
    const [rating, setRating] = useState<1 | null>(null);

    { /* useEffect */ }

    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchUser();
            }
        }
        fetchData().then();
    }, [session]);

    { /* fetch */ }

    const fetchUser = async () => {
        try {
            const response = await userRepository.getUserById({
                session: session,
                userId: reviewedUserId!
            } as GetUserByIdReq);

            if (response) setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                review?: string;
            }

            toast.success("Rview editada correctamente");
            navigate("/profile");
            
        } 
        catch(error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onCancel = () => {
        navigate("/profile");
    };

    const review = Review;  
    const onRatingChange = () => {};
    
    return {
        onSubmit,
        onCancel, 
        review,
        rating,
        onRatingChange
    }
}