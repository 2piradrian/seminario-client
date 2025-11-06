import EditEventForm from "../../components/molecules/edit-event-form/edit-event.form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditEventRoute() {

    const { 
            onSubmit, onCancel, event
        } = ViewModel();

    return(
        <Layout withHeader={true}>
            { event &&
                <EditEventForm 
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    event={event}
                />
            }
        </Layout>
    )
}