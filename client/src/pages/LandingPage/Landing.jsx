import { useEffect, useState } from "react";
import styles from "./Landing.module.css";
import StockCard from "../../components/ui/StockCard/StockCard";
import { getGeneralNews, getStock } from "../../services/FinnAPICalls";
import SearchBar from "../../components/ui/SearchBar/SearchBar";

const tickers = [
  "AAPL","MSFT","GOOGL", "AMZN", "NVDA", "TSLA", "META", "JPM", "V", "MA"
];

export default function Landing()
{
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadStocks = async () => {
      const results = await Promise.all(
        tickers.map(symbol => getStock(symbol))
      );

      setStocks(results);
    };

    const loadNews = async () => {
      const results = await getGeneralNews();
      setNews(results.slice(0, 5));
    }

    loadNews();
    loadStocks();
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1>Market Overview</h1>
        <p>Track popular stocks in real time</p>
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

      <SearchBar />
      <div className={styles.grid}>
        {stocks.map(stock => {
          return <StockCard key={stock.symbol} stock={stock} />
        })}
      </div>


    </div>
  );
};
