import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";
import Chat from "../../components/organisms/chat-window/chat-window";
import ChatWindow from "../../components/organisms/chat-window/chat-window";

export default function ChatWindowRoute() {
    const { 
        messages, 
        newMessage, 
        setNewMessage, 
        handleSendMessage,
        isMyMessage,
        currentUser,
        onLogout
    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={currentUser ? currentUser.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
            <ChatWindow
                messages={messages}
                newMessage={newMessage}
                onChangeMessage={setNewMessage}
                onSubmit={handleSendMessage}
                isMyMessage={isMyMessage}
            />
        </Layout>
    );
}
