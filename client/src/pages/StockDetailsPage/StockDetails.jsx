import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./StockDetails.module.css";
import ActionButtons from "../../components/stock/ActionButtons/ActionButtons";

import { getStock, getStockNews } from "../../services/FinnAPICalls";
import { getHistorical } from "../../services/VantageAPICalls";

const StockDetailsPage = () => {
    const { symbol } = useParams();

    const [stock, setStock] = useState(null);
    const [news, setNews] = useState([]);
    const [history, setHistory] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatHistory = (raw) => {
    if (!raw) return [];

    return Object.keys(raw)
        .sort((a, b) => new Date(b) - new Date(a))
        .slice(0, 30)
        .map(date => ({
            date,
            open: Number(raw[date]["1. open"]),
            high: Number(raw[date]["2. high"]),
            low: Number(raw[date]["3. low"]),
            close: Number(raw[date]["4. close"]),
            volume: Number(raw[date]["5. volume"])
        }));
    };

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);

                const [stockData, newsData, historyData] = await Promise.all([
                    getStock(symbol),
                    getStockNews(symbol),
                    getHistorical(symbol)
                ]);

                setStock(stockData);
                setNews(newsData.slice(0, 5));
                setHistory(historyData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [symbol]);

    if (loading) return <div className={styles.status}>Loading stock data...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    if(stock.name == null || stock.percentChange == null || stock.logo == null) return(
    <>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.title}>Stock Not Found</h2>
    </>);
    return (
        <div className={styles.container}>
            <div className={styles.heroCard}>
                <img src={stock.logo} alt={stock.symbol} className={styles.logo}/>
                <div>

                    <h1 className={styles.title}>
                        {stock.name} ({stock.symbol})
                    </h1>
                    <p className={styles.subText}>{stock.exchange}</p>
                </div>

                <div className={styles.priceSection}>
                    <h2 className={styles.price}>${stock.price}</h2>
                    <p className={styles.change}>
                        {stock.change} ({stock.percentChange}%)
                    </p>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.card}>Open<br />{stock.open}</div>
                <div className={styles.card}>High<br />{stock.high}</div>
                <div className={styles.card}>Low<br />{stock.low}</div>
                <div className={styles.card}>Prev Close<br />{stock.prevClose}</div>
                <div className={styles.card}>Market Cap<br />{stock.marketCap}</div>
            </div>

            <div className={styles.grid}>

                <div className={styles.panel}>
                    <h3 className={styles.sectionTitle}>Historical Prices</h3>

                    <div className={styles.historyList}>
                        {history && formatHistory(history).map((item, i) => (
                            <div key={i} className={styles.historyRow}>

                                <div className={styles.date}>
                                    {item.date}
                                </div>

                                <div className={styles.priceBlock}>
                                    <div className={styles.close}>
                                        Close: ${item.close}
                                    </div>

                                    <div className={styles.meta}>
                                        H: {item.high} | L: {item.low}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.panel}>
                    <h3 className={styles.sectionTitle}>Latest News</h3>

                    {news.map((news, i) => (
                        <div key={i} className={styles.newsItem}>
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <p className={styles.newsTitle}>{news.headline}</p>
                            </a>
                        </div>
                    ))}
                </div>

            </div>
            <div className={styles.buttonWrapper}>
                <ActionButtons stock={stock} variant="details"/>
            </div>
        </div>

    );
};

export default StockDetailsPage;
