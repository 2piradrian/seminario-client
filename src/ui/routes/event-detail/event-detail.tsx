import EventDetail from "../../components/organisms/event-detail/event-detail";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function EventDetailRoute() {

    const { 
        onClickOnAvatar,
        onClickOnEvent,
        onClickDelete,
        isMine,
        event,
        proceedDelete,
        cancelDelete,
        isDeleteOpen,
        onClickEdit,
        handleToggleAssist,
        isAssisting,
        assistsQuantity
    } = ViewModel();

    return (
        <Layout withHeader={true}>
            { 
            event && 
                <EventDetail 
                    cancelDelete={cancelDelete}
                    event={event}
                    isDeleteOpen={isDeleteOpen}
                    isMine={isMine}
                    onClickDelete={onClickDelete}
                    onClickOnAvatar={onClickOnAvatar}
                    onClickOnEvent={onClickOnEvent}
                    proceedDelete={proceedDelete}
                    onClickEdit={onClickEdit}
                    handleToggleAssist={handleToggleAssist}
                    isAssisting={isAssisting}
                    assistsQuantity={assistsQuantity}
                />
            }
        </Layout>
    )
}