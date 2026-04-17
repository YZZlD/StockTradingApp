import { createContext, useContext, useEffect, useState } from "react";

// Watchlist context is a simple context provider which simply parses and writes to the localstorage using JSON parse and stringify.
// as we must store arrays in string memory. On load it grabs from the watchlist in localstorage memory and updates the localstorage from
// the state. Operations are based off of symbol in the stock object.

const WatchlistContext = createContext();

export default function WatchlistProvider({children}) {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        setWatchlist(JSON.parse(localStorage.getItem("watchlist")) || []);
    }, []);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [])

    const addToWatchlist = (stock) => {
        setWatchlist([...watchlist, stock]);
    }

    const removeFromWatchlist = (stock) => {
        setWatchlist(watchlist.filter(s => s.symbol != stock.symbol));
    }

    const isInWatchlist = (stock ) => {
        if(watchlist == null) return false;
        return watchlist.some(s => s.symbol == stock.symbol);
    }

    return (
        <WatchlistContext.Provider value={{
            watchlist,
            addToWatchlist,
            removeFromWatchlist,
            isInWatchlist
        }}>
            {children}
        </WatchlistContext.Provider>
    )
}

export const useWatchlist = () => useContext(WatchlistContext);
