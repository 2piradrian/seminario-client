import CalendarEvents from "../../components/molecules/calendar-events/calendar-events";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function CalendarEventsRoute() {

    const { 
            events, 
            onClickOnEvent,
            user,
            onClickOnCreateEvent,
            onLogout,
            currentDate,
            onNavigate
        } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >

            <CalendarEvents 
                events={events}
                onClickOnEvent={onClickOnEvent}   
                onClickOnCreateEvent={onClickOnCreateEvent} 
                onNavigate={onNavigate}
                currentDate={currentDate}
                          
            />
        </Layout>

    )

}
