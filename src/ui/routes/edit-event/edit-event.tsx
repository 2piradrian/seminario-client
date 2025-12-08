import EditEventForm from "../../components/molecules/edit-event-form/edit-event.form";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EditEventRoute() {

    const { 
        onSubmit, onCancel, event, user, onLogout
    } = ViewModel();

    return(
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
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
