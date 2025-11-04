import { Profile } from "../../../domain";
import NewReviewForm from "../../components/molecules/new-review-form/new-review-form";
import ViewModel from "./viewmodel";

export default function NewReviewRoute() {

    const {
        onSubmit, user, onRatingChange, onClickOnAvatar, rating
    } = ViewModel();
    if (!user) {
        return null; 
    }
    return(
        <NewReviewForm
            profile={Profile.fromEntity(user.profile, undefined)}
            onClickOnAvatar={onClickOnAvatar}
            onRatingChange={onRatingChange}
            onSubmit={onSubmit}
            rating={rating}
        />
    )
}