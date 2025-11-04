import NewReviewForm from "../../components/molecules/new-review-form/new-review-form";
import ViewModel from "./viewmodel";

export default function NewReviewRoute() {

    const {
        onSubmit, onRatingChange, rating
    } = ViewModel();

    return(
        <NewReviewForm
            onRatingChange={onRatingChange}
            onSubmit={onSubmit}
            rating={rating}
        />
    )
}