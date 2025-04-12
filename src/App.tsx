import { useState, useMemo, useCallback } from "react";
import Form from "./components/Form";
import StockCard from "./components/StockCard";
import StockChart from "./components/StockChart";
import { useFinnhubSocket } from "./hooks/useFinnHubSocket";
import { StockPoint } from "./types/stock";

const AVAILABLE_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "TSLA", "BINANCE:BTCUSDT"];

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState("BINANCE:BTCUSDT");
  const [alertPrice, setAlertPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceHistory, setPriceHistory] = useState<StockPoint[]>([]);

  const selectedSymbols = useMemo(() => [selectedSymbol], [selectedSymbol]);

  const handleSelect = useCallback((value: string) => {
    setSelectedSymbol(value);
    setCurrentPrice(0);
    setPriceHistory([]);
  }, []);

  const handleAlertChange = useCallback((value: number) => {
    setAlertPrice(value);
  }, []);

  const handleData = useCallback(
    (symbol: string, price: number, timestamp: number) => {
      setCurrentPrice(price);
      setPriceHistory((prev) =>
        [...prev, { time: timestamp, price }].slice(-50)
      );
    },
    []
  );

  useFinnhubSocket(selectedSymbols, handleData);

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📈 Stock Show</h1>

      <Form
        symbols={AVAILABLE_SYMBOLS}
        selected={selectedSymbol}
        onSelect={handleSelect}
        alertPrice={alertPrice}
        onAlertChange={handleAlertChange}
      />

      <StockCard
        symbol={selectedSymbol}
        price={currentPrice}
        alertPrice={alertPrice}
      />

      <StockChart data={priceHistory} symbol={selectedSymbol} />
    </div>
  );
}

export default App;
