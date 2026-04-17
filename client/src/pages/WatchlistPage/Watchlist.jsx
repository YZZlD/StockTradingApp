import { useEffect, useState } from "react"
import StockCard from "../../components/ui/StockCard/StockCard";
import { useWatchlist } from "../../contexts/WatchlistProvider";
import styles from "./Watchlist.module.css";

export default function Watchlist()
{
    const {
        watchlist,
    } = useWatchlist();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Your Watchlist</h1>
                    <p>Stocks You Have Watchlisted</p>
                </div>
                {watchlist.map((stock) => {
                    return <StockCard stock={stock} variant="watchlist"/>
                })}
            </div>
        </>
    )
}
