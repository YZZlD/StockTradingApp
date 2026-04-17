import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css"

// Search bar directly redirects to a stock page on submission based off of symbol.

export default function SearchBar() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.searchBar.value;
        if(!searchTerm.trim()) return;
        navigate(`/stocks/${searchTerm.toUpperCase()}`);
    }

    return (
        <>
            {/* Hold the search within a form to allow for enter or button submit for the data. */}
            <form onSubmit={handleSubmit}>
                <div className={styles.searchBar}>
                    <input className={styles.searchInput} name="searchBar" type="text" placeholder="Search Symbol (e.g. META, AAPL)..."></input>
                    <button className={styles.searchButton} type="submit">➤</button>
                </div>
            </form>

        </>
    )
}
