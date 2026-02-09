import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";
import ChatWindow from "../../components/organisms/chat-window/chat-window";
import { User } from "../../../domain";

export default function ChatWindowRoute() {
    const { 
        messages, 
        newMessage, 
        setNewMessage, 
        handleSendMessage,
        isMyMessage,
        currentUser,
        onLogout,
        handleScroll,
        user
    } = ViewModel();

    return (
        <Layout 
            withHeader={true}
            headerProfile={currentUser ? currentUser.profile.toProfile() : undefined}
            onLogout={onLogout}
            user={user}
        >
            <ChatWindow
                messages={messages}
                newMessage={newMessage}
                onChangeMessage={setNewMessage}
                onSubmit={handleSendMessage}
                isMyMessage={isMyMessage}
                onScroll={handleScroll}
            />
        </Layout>
    );
}
