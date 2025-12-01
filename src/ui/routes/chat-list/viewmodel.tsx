import { ChatMessage, UserProfile } from "../../../domain";

export default function ViewModel() {
    const user = UserProfile;
    const chats = ChatMessage;
    const onClickOnChat = () => {};

    return {
        user,
        chats, 
        onClickOnChat
    }
}