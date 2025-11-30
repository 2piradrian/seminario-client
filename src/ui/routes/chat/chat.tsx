import Layout from "../../layout/layout";
import { ViewModel } from "./viewmodel";

export default function ChatRoute() {
    const { messages, newMessage, setNewMessage, handleSendMessage, isMyMessage } = ViewModel();

    return (
        <Layout withHeader>
            <div>
                <div>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button type="submit" style={styles.button}>Send</button>
                </form>
            </div>
        </Layout>
    );
}
