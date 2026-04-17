import { createContext, Profiler, useContext, useEffect, useReducer, useState } from "react";

//Portfolio

const PortfolioContext = createContext();

function portfolioReducer(state, action){
    let index;
    switch (action.type)
    {
        case "INIT":
            return action.payload || [];

        case "ADD":
            index = state.findIndex(stockGroup => stockGroup.stock.symbol == action.payload.symbol);

            if(index !== -1)
            {
                return state.map((stockGroup, i) => {
                    return i === index ? {...stockGroup, count: stockGroup.count + 1} : stockGroup
                });
            }

            return [...state, {stock: action.payload, count: 1}];

        case "REMOVE":
            index = state.findIndex(stockGroup => stockGroup.stock.symbol == action.payload.symbol);

            if(index === -1) return state;

            if(state[index].count === 1) return state.filter(stockGroup => stockGroup.stock.symbol !== action.payload.symbol);

            return state.map((stockGroup, i) => {
                return i === index ? {...stockGroup, count: stockGroup.count - 1} : stockGroup
            });

        default:
            return state;
    }

}

export default function PortfolioProvider({children}){
    const [portfolio, dispatch] = useReducer(portfolioReducer, []);

    useEffect(() => {
        const portfolio = JSON.parse(localStorage.getItem("portfolio"));
        dispatch({type: "INIT", payload: portfolio});
    }, []);

    useEffect(() => {
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }, [portfolio]);

    const addToPortfolio = (stock) => {
        dispatch({type: "ADD", payload: stock});
    }

    const removeFromPortfolio = (stock) => {
        dispatch({type: "REMOVE", payload: stock});
    }

    const getStockCount = (stock) => {
        const stockGroup = portfolio.find(stockGroup => stockGroup.stock.symbol === stock.symbol);
        return stockGroup ? stockGroup.count : 0;
    }

    return (
        <PortfolioContext.Provider value={{
            portfolio,
            addToPortfolio,
            removeFromPortfolio,
            getStockCount
        }}>
            {children}
        </PortfolioContext.Provider>
    )
}

export const usePortfolio = () => useContext(PortfolioContext);
