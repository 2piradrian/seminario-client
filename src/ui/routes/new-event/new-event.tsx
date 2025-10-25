import NewEventForm from "../../components/molecules/new-event-form/new-event-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function NewEvent() {

    const { 
            onSubmit, onCancel, profiles
        } = ViewModel();

    return(
        <Layout withHeader={true}>
            { profiles &&
                <NewEventForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    profiles={profiles}
                />
            }
        </Layout>
    )
}