export const getHistorical = async (ticker) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${import.meta.env.VITE_VANTAGE_API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data["Time Series (Daily)"];
};
