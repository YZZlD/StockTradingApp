export const getStock = async (symbol) => {
    const detailsURL = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;
    const quoteURL = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;

    const quoteRes = await fetch(quoteURL);
    const detailsRes = await fetch(detailsURL);

    const quote = await quoteRes.json();
    const details = await detailsRes.json();

    return {
        symbol: symbol,

        price: quote.c,
        change: quote.d,
        percentChange: quote.dp,
        high: quote.h,
        low: quote.l,
        open: quote.o,
        prevClose: quote.pc,

        name: details.name,
        logo: details.logo,
        industry: details.finnhubIndustry,
        country: details.country,
        exchange: details.exchange,
        marketCap: details.marketCapitalization
    };
}

export const getStockNews = async (symbol) => {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - 7);

    const format = (d) => d.toISOString().split("T")[0];

    const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${format(from)}&to=${format(today)}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
};

export const getGeneralNews = async () => {
    const url = `https://finnhub.io/api/v1/news?category=general&token=${import.meta.env.VITE_FINNHUB_API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}
