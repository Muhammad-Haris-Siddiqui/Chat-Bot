    import * as React from 'react';
    import { LuBot, LuSendHorizontal } from 'react-icons/lu';
    import useChatbot from '../hooks/useChatbot';

    interface IChatComponentProps {}

    const ChatComponent: React.FunctionComponent <IChatComponentProps> = (props) => {
        const [input, setInput] = React.useState("");
        const {messages, sendMessage, loading, error} = useChatbot();
        const handleSend = () => {
            if(input.trim()) {
                sendMessage(input);
                setInput("");
            }
        };

    const chatEndRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, loading]);

    return(
        <div className="flex flex-col h-[80vh] bg-white ">
            <h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center items-center gap-2" >
                React + OpenAI Chatbot <LuBot size={25} />
            </h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 ">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-3 rounded-lg max-w-xs ${
                        msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : msg.error ? "bg-red-200 text-red-800" : "bg-gray-300 text-gray-800"
                    }`}>
                        {msg.text}
                    </div>
                ) )}
                {loading && (
                    <div className="p-3 rounded-lg max-w-xs bg-gray-200 text-gray-600">
                        Bot is typing...
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className="flex item-center p-4 bg-gray-50" >
                <input 
                type="text"
                className='flex-1 p-2 border rounded-lg focus:outline-none '
                placeholder='Your message here'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSend();
                    }
                }}
                />
                <button onClick={handleSend} >
                    <LuSendHorizontal size={20} />
                </button>
            </div>
        </div>
    );
    };

    export default ChatComponent;