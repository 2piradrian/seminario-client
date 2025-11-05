import NewReviewForm from "../../components/molecules/new-review-form/new-review-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function NewReviewRoute() {

    const {
        onSubmit, onRatingChange, rating
    } = ViewModel();

    return(
        <Layout withHeader={true}>
            <NewReviewForm
                onRatingChange={onRatingChange}
                onSubmit={onSubmit}
                rating={rating}
            />
        </Layout>
    )
}