import { useNavigate, useParams } from "react-router-dom";
import { useRepositories } from "../../../core";
import type { GetReviewByIdReq } from "../../../domain/dto/review/request/GetReviewByIdReq";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { GetReviewByIdRes } from "../../../domain/dto/review/response/GetREviewByIdRes";
import { Errors, Review, type UpdateReviewReq } from "../../../domain";

export default function ViewModel() {

    const navigate = useNavigate();
    const { id } = useParams();

    const { session } = useSession();
    const { reviewRepository } = useRepositories()

    const [error, setError] = useState<string | null>(null);

    const [review, setReview] = useState<Review | null>(null);
    const [rating, setRating] = useState<number>(0);

    useEffect(()=> {
        if (error != null){
            toast.error(error);
            setError(null);
        }
    }, [error]);

    
    useEffect(()=> {
        const fetchData = async () => {
            if (session != null){
                await fetchReview();
            }
        }
        fetchData().then();
    }, [session]);

    const fetchReview = async () => {
        try{
            const getReviewByIdReq: GetReviewByIdReq = {
                reviewId: id,
                session: session,
            };
            
            const response: GetReviewByIdRes = await reviewRepository.getById(getReviewByIdReq)

            if(response){
                const reviewData = Review.fromObject(response)
                setReview(reviewData);
                setRating(reviewData.rating || 0);
            }
        }
        catch(error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    }
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const form = Object.fromEntries(formData) as {
                review?:string;
            }

            const dto: UpdateReviewReq = {
                id: id,
                review: form.review,
                rating: rating,
                session: session,
            }

            console.log(dto)

            await reviewRepository.update(dto);
            toast.success("Reseña editada correctamente");
            navigate("/profile");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };
    const onCancel = () => {
        navigate("/profile");
    }; 

    return{
        onSubmit,
        onCancel,
        review,
        rating,
        setRating,
    };
}