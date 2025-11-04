import { useNavigate, useParams } from "react-router-dom";
import { useRepositories } from "../../../core";
import useSession from "../../hooks/useSession";
import React, { useEffect, useState } from "react";
import { Errors, User, type CreateReviewReq, type GetUserByIdReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();
    const {id: reviewedUserId} = useParams();

    const { userId, session } = useSession();
    const { userRepository, reviewRepository } = useRepositories()
    
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [rating, setRating] = useState(0);

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
                await fetchUser();
            }
        }
        fetchData().then();
    }, [session]);

       const fetchUser = async () => {
        try {
            const response = await userRepository.getUserById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);

            if (response) setUser(User.fromObject(response));
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const onRatingChange = (value: number) => {
        setRating(value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                review?: string;
            }
            if (!reviewedUserId) {
            toast.error("No se pudo encontrar al usuario a reseñar.");
            return;
            }
            const response = await reviewRepository.create({
                session: session,
                reviewedUserId: reviewedUserId,
                review: form.review,
                rating: rating,
            } as CreateReviewReq)
            toast.success("Reseña creada correctamente");

            const reviewId = response.id;
            navigate(`/event-detail/${reviewId}`); 
        }
        catch(error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickOnAvatar = () => {
        navigate(`/user/${user.id}`);
    };
    

    return {
        onSubmit,
        user,
        onRatingChange,
        onClickOnAvatar,
        rating,
    }

    
}