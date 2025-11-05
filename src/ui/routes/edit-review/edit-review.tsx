import EditReviewForm from "../../components/molecules/edit-review-form/edit-review-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditReviewRoute() {
    const {
        onSubmit,
        review,
        onCancel,
        rating,
        setRating
    } = ViewModel();

    return(
        <Layout withHeader={true}>
            {review && 
            <EditReviewForm 
                onSubmit={onSubmit}
                review={review}
                onCancel={onCancel}
                rating={rating}
                onRatingChange={setRating}
            />
            }

        </Layout>
    )
}