import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";
import Chat from "../../components/organisms/chat-window/chat-window";

export default function ChatWindowRoute() {
    const { 
        messages, 
        newMessage, 
        setNewMessage, 
        handleSendMessage,
        isMyMessage,
    } = ViewModel();

    return (
        <Layout withHeader>
            <Chat
                messages={messages}
                newMessage={newMessage}
                onChangeMessage={setNewMessage}
                onSubmit={handleSendMessage}
                isMyMessage={isMyMessage}
            />
        </Layout>
    );
}
