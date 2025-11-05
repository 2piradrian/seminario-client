import EditReviewForm from "../../components/molecules/edit-review-form/edit-review-form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditReviewRoute() {
    const { 
        onSubmit, 
        onCancel,
        review,
        onRatingChange,
        rating
    } = ViewModel();

    return(
        <Layout withHeader={true}>
                    { review &&
                        <EditReviewForm 
                            onSubmit={onSubmit}
                            onCancel={onCancel}
                            onRatingChange={onRatingChange}
                            rating={rating}
                        />
                    }
        </Layout>
    )
        
    }