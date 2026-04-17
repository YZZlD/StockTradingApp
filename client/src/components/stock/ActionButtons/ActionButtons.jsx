import { useWatchlist } from "../../../contexts/WatchlistProvider";
import { usePortfolio } from "../../../contexts/PortfolioProvider";
import { useNavigate } from "react-router-dom";
import styles from './ActionButtons.module.css';


// Action buttons has a lot going on in it. First action buttons are directly responsible for modifying portfolio and watchlist state.
// Since watchlist and portfolio are used globally within the app I used context providers to reduce state complexity and prop drilling.
// As well the button component uses a variant prop to dynamically change what should be shown per implementation. For example,
// the buttons in details show all, in portfolio show portfolio elements and in watchlist show watchlist.

export default function ActionButtons({stock, variant})
{
    const navigate = useNavigate();

    const {
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist
    } = useWatchlist();

    const {
        addToPortfolio,
        removeFromPortfolio
    } = usePortfolio();

    return (
        <>
            <div className={styles.wrapper}>
                {(variant == "watchlist" || variant == "details") &&
                    <>
                        {!isInWatchlist(stock) && <button className={`${styles.button} ${styles.primary}`} onClick={(event) => { addToWatchlist(stock); event.stopPropagation(); }}>Add to Watchlist</button>}
                        {isInWatchlist(stock) && <button className={`${styles.button} ${styles.danger}`} onClick={(event) => { removeFromWatchlist(stock); event.stopPropagation(); }}>Remove from Watchlist</button>}
                    </>
                }

                {(variant == "portfolio" || variant == "details") &&
                    <>
                        <button className={`${styles.button} ${styles.primary}`} onClick={(event) => {addToPortfolio(stock); event.stopPropagation(); setStockCount(stockCount => stockCount + 1)}}>Add to Portfolio</button>
                        <button className={`${styles.button} ${styles.danger}`} onClick={(event) => {removeFromPortfolio(stock); event.stopPropagation(); setStockCount(stockCount => stockCount - 1)}}>Remove from Portfolio</button>
                    </>
                }
                {variant == "details" &&
                    <button className={`${styles.button} ${styles.chat}`} onClick={() => navigate(`/chat/${stock.symbol}`)}>Open Chat</button>
                }
            </div>


        </>
    )
}
