import { useState, useCallback, useMemo } from "react";
import Form from "./components/Form";
import StockCard from "./components/StockCard";
import StockChart from "./components/StockChart";
import { useFinnhubSocket } from "./hooks/useFinnHubSocket";
import { StockPoint } from "./types/stock";

const AVAILABLE_SYMBOLS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "TSLA",
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:SOLUSDT",
  "BINANCE:DOGEUSDT",
  "BINANCE:AVAXUSDT",
];

function App() {
  const [watchedStocks, setWatchedStocks] = useState<
    {
      symbol: string;
      alertPrice: number;
      initialPrice?: number;
      currentPrice?: number;
      priceHistory: StockPoint[];
    }[]
  >([]);

  const handleAddStock = useCallback((symbol: string, alertPrice: number) => {
    setWatchedStocks((prev) => {
      const existing = prev.find((stock) => stock.symbol === symbol);
      if (existing) {
        return prev.map((stock) =>
          stock.symbol === symbol ? { ...stock, alertPrice } : stock
        );
      }
      return [
        {
          symbol,
          alertPrice,
          priceHistory: [],
        },
        ...prev,
      ];
    });
  }, []);

  const totalValueHistory = useMemo(() => {
    const timeToPrices: Record<number, number> = {};

    watchedStocks.forEach((stock) => {
      stock.priceHistory.forEach(({ time, price }) => {
        if (!timeToPrices[time]) {
          timeToPrices[time] = 0;
        }
        timeToPrices[time] += price;
      });
    });

    return Object.entries(timeToPrices)
      .map(([time, total]) => ({
        time: Number(time),
        price: total,
        symbol: "TOTAL_VALUE",
      }))
      .sort((a, b) => a.time - b.time);
  }, [watchedStocks]);

  const handleData = useCallback(
    (symbol: string, price: number, timestamp: number) => {
      setWatchedStocks((prev) =>
        prev.map((stock) => {
          if (stock.symbol !== symbol) return stock;

          const updatedHistory = [
            ...stock.priceHistory,
            { time: timestamp, price },
          ].slice(-50);

          const isFirstData = stock.currentPrice === undefined;

          return {
            ...stock,
            currentPrice: price,
            initialPrice: isFirstData ? price : stock.initialPrice,
            priceHistory: updatedHistory,
          };
        })
      );
    },
    []
  );

  const symbols = useMemo(
    () => watchedStocks.map((stock) => stock.symbol),
    [watchedStocks]
  );

  useFinnhubSocket(symbols, handleData);

  const chartData = watchedStocks.flatMap((stock) =>
    stock.priceHistory.map((point) => ({
      time: point.time,
      price: point.price,
      symbol: stock.symbol,
    }))
  );

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📈 Stock Show</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-1/3">
          <Form symbols={AVAILABLE_SYMBOLS} onAdd={handleAddStock} />
        </div>

        <div className="flex-1">
          <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-x-visible">
            {watchedStocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                price={stock.currentPrice ?? 0}
                alertPrice={stock.alertPrice}
                changePercent={
                  stock.initialPrice
                    ? ((stock.currentPrice! - stock.initialPrice) /
                        stock.initialPrice) *
                      100
                    : 0
                }
              />
            ))}
          </div>

          <div className="mt-6">
            <StockChart dataSet={chartData} />
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-center">
              📊 Total Stock Value
            </h2>
            <StockChart dataSet={totalValueHistory} showTotalOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
