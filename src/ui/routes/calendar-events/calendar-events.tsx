import CalendarEvents from "../../components/molecules/calendar-events/calendar-events";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function CalendarEventsRoute() {

    const { 
            events, 
            onClickOnEvent
        } = ViewModel();

    return (
        <Layout withHeader={true} >

            <CalendarEvents 
                events={events}
                onClickOnEvent={onClickOnEvent}              
            />
        </Layout>

    )

}