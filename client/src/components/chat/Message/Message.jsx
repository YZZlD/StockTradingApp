import isImageURL from "../../../helpers/isImageURL";
import IsURL from "../../../helpers/isURL";
import styles from "./Message.module.css";

// The message component has two complexities.
// 1. It checks the current username in localstorage against the username in the message object to tell if it is the current user showing for styling.
// 2. It parses the message content word for word to dynamically show images and links based off of helper functions and maps it to the inside of the
//      containing div.

export default function Message({ message }) {

    const words = message.content.split(" ");

    return (
        <div className={`${styles.messageWrapper} ${localStorage.getItem("username") == message.username ? styles.own : ""}`}>
            <div className={styles.messageBubble}>
                <div className={styles.messageHeader}>
                    <span className={styles.username}>{message.username}</span>
                    <span className={styles.timestamp}>{message.timestamp}</span>
                </div>
                <div className={styles.content}>
                    {words.map((word) => {
                        if(isImageURL(word)) return <img src={word} />
                        else if(IsURL(word)) return <a href={word}>{word} </a>
                        else return <span>{word} </span>
                    })}
                </div>

            </div>
        </div>
    );
}
