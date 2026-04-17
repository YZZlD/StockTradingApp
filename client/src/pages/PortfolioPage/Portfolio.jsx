import StockCard from "../../components/ui/StockCard/StockCard";
import { usePortfolio } from "../../contexts/PortfolioProvider"
import styles from "./Portfolio.module.css";

export default function Portfolio()
{
    const {
        portfolio
    } = usePortfolio();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Your Portfolio</h1>
                    <p>Track the Performance and Net Value of your Stocks</p>
                </div>
                {portfolio.map(stockGroup => {
                    return <StockCard stock={stockGroup.stock} variant="portfolio"/>
                })}
            </div>
        </>
    )
}
