import ActionButtons from "../../stock/ActionButtons/ActionButtons";
import styles from "./StockCard.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePortfolio } from "../../../contexts/PortfolioProvider";

// Stock card simply renders all information for the stock with a small variant for portfolio showing more details for value.
// Action buttons handles the conditional showing of actions.
//Stock count is grabbed from portfolio context and is put in state on render

export default function StockCard({ stock, variant })
{
  const navigate = useNavigate();

  const {
    getStockCount
  } = usePortfolio();

  const [stockCount, setStockCount] = useState(0);

  useEffect(() => {
      setStockCount(getStockCount(stock));
  });

  const isPositive = stock.change >= 0;

  return (
    <div className={styles.card} onClick={() => navigate(`/stocks/${stock.symbol}`)}>
      <div className={styles.left}>
        <img
          src={stock.logo}
          alt={stock.symbol}
          className={styles.logo}
        />
      </div>

      <div className={styles.middle}>
        <h3 className={styles.symbol}>{stock.symbol}</h3>
        <p className={styles.name}>{stock.name}</p>
        <p className={styles.industry}>{stock.industry}</p>
      </div>

      <div className={styles.right}>
        <p className={styles.price}>${stock.price.toFixed(2)}</p>

        <p className={isPositive ? styles.positive : styles.negative}>
          {isPositive ? "+" : ""}
          {stock.change.toFixed(2)} (
          {stock.percentChange.toFixed(2)}%)
        </p>
      </div>
      {variant === "portfolio" && (
        <div className={styles.portfolioSection}>
            <div className={styles.portfolioRow}>
                <span className={styles.label}>Shares</span>
                <span className={styles.value}>{stockCount}</span>
            </div>

            <div className={styles.portfolioRow}>
                <span className={styles.label}>Market Value</span>
                <span className={styles.value}>
                    ${(stockCount * stock.price).toFixed(2)}
                </span>
            </div>

            <div className={styles.portfolioRow}>
                <span className={styles.label}>Avg Price</span>
                <span className={styles.valueMuted}>
                    ${stock.price.toFixed(2)}
                </span>
            </div>
        </div>
      )}
      <ActionButtons stock={stock} variant={variant} />
    </div>
  );
};
