import ChatList from "../../components/organisms/chat-list/chat-list";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function ChatRouteList() {
    const { 
        user,
        onClickOnChat,
        chats
    } = ViewModel();
    
    return (
        <Layout withHeader={true}>
            {chats && (
                <ChatList 
                    chats={chats}
                    onClickOnChat={onClickOnChat}
                    user={user}
                />
            )}
        </Layout>
    );
}
