import React from "react";

interface StockCardProps {
  symbol: string;
  price: number;
  alertPrice: number;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, price, alertPrice }) => {
  const isAboveAlert = price >= alertPrice && alertPrice > 0;

  return (
    <div
      className={`rounded p-4 shadow text-white w-full max-w-sm mx-auto ${
        isAboveAlert ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <h2 className="text-xl font-semibold">{symbol}</h2>
      <p className="text-lg">Price: ${price.toFixed(2)}</p>
      <p className="text-sm">
        {isAboveAlert
          ? "🔔 Over Alert"
          : alertPrice > 0
            ? "📉 Under Alert"
            : "No Alert Defined"}
      </p>
    </div>
  );
};

export default StockCard;
