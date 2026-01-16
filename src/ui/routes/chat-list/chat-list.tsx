import ChatList from "../../components/organisms/chat-list/chat-list";
import Layout from "../../layout/layout";
import ViewModel from "./viewmodel";

export default function ChatRouteList() {
    const { 
        onClickOnChat,
        chats,
        user,
        onLogout,
        onClickOnAvatar
    } = ViewModel();
    
    return (
        <Layout 
            withHeader={true}
            headerProfile={user ? user.profile.toProfile() : undefined}
            onLogout={onLogout}
        >
        { chats &&
                <ChatList 
                    chats={chats}
                    onClickOnChat={onClickOnChat}
                    onClickOnAvatar={onClickOnAvatar}

                />    
        }
        </Layout>
    );
}
