import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Message from "../../components/chat/Message/Message";
import MessageInput from "../../components/chat/MessageInput/MessageInput";
import { useParams } from "react-router-dom";
import styles from './Chat.module.css';

export default function Chat() {
    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    const { symbol } = useParams();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socketRef.current = io(import.meta.env.VITE_API_URL);

        console.log("Connecting to server...");

        socketRef.current.on("connect", () => {
            console.log("Connected with ID:", socketRef.current.id);

            socketRef.current.emit("join_room", {room: symbol});
        });

        socketRef.current.on("chat_logs", (data) => {
            setMessages(data);
        });

        socketRef.current.on("receive_message", (data) => {
            setMessages(prev => [...prev, data]);
        });

        if(localStorage.getItem("username") == undefined)
        {
            localStorage.setItem("username", Math.random().toString(36).slice(-8));
        }


        return () => {
            socketRef.current.disconnect();
            console.log("Socket disconnected");
        };
    }, [symbol]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (message) => {
        if(!message.trim()) return;

        socketRef.current.emit("send_message", {
            username: localStorage.getItem("username"),
            content: message,
            timestamp: new Date().toLocaleTimeString(),
            room: symbol
        });
    }

    return (
        <>
            <div className={styles.header}>
                <h1>{symbol[0].toUpperCase() + symbol.slice(1)} Chat Room</h1>
                <p>Now chatting as {localStorage.getItem("username")}</p>
            </div>

            <div className={styles.chatContainer}>
                <div className={styles.messageContainer}>
                    {messages.map(message => {
                        return <Message message={message} />
                    })}

                    <div ref={bottomRef} />

                </div>
                <MessageInput sendMessage={sendMessage}/>
            </div>
        </>
    );
}
