import styles from "./MessageInput.module.css";

export default function MessageInput({sendMessage}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.elements.inputBar.value;
        sendMessage(message);
        e.target.reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.messageWrapper}>
                    <input className={styles.messageInput} name="inputBar" type="text" placeholder="Send message..."></input>
                    <button className={styles.messageSubmit} type="submit">➤</button>
                </div>

            </form>

        </>
    )
}
