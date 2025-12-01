import CalendarEvents from "../../components/molecules/calendar-events/calendar-events";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function CalendarEventsRoute() {

    const { 
            events, 
            onClickOnEvent,
            user
        } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
        >

            <CalendarEvents 
                events={events}
                onClickOnEvent={onClickOnEvent}              
            />
        </Layout>

    )

}
