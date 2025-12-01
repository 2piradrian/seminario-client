import NewEventForm from "../../components/molecules/new-event-form/new-event-form";
import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function NewEventRoute() {

    const { 
            onSubmit, onCancel, profiles
        } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={profiles && profiles[0] ? profiles[0] : undefined}
        >
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
