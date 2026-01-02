import CalendarEvents from "../../components/molecules/calendar-events/calendar-events";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function CalendarEventsRoute() {

    const { 
            events, 
            onClickOnEvent,
            user,
            onClickOnCreateEvent,
            onLogout
        } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >

            <CalendarEvents 
                events={events}
                onClickOnEvent={onClickOnEvent}   
                onClickOnCreateEvent={onClickOnCreateEvent}           
            />
        </Layout>

    )

}
