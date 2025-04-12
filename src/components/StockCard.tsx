import React from "react";

interface StockCardProps {
  symbol: string;
  price: number;
  alertPrice: number;
  changePercent?: number;
}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  price,
  alertPrice,
  changePercent = 0,
}) => {
  const isAboveAlert = price >= alertPrice && alertPrice > 0;

  const bgColor =
    alertPrice === 0
      ? "bg-gray-500"
      : isAboveAlert
        ? "bg-green-500"
        : "bg-red-500";

  const formattedChange =
    changePercent === 0 ? "0.00" : changePercent.toFixed(2);

  return (
    <div
      className={`rounded p-4 shadow text-white w-full max-w-sm mx-auto transition-colors duration-300 ${bgColor}`}
    >
      <h2
        data-testid={`stock-title-${symbol}`}
        className="text-xl font-semibold"
      >
        {symbol}
      </h2>
      <p className="text-lg">Price: ${price.toFixed(2)}</p>
      <p className="text-sm">
        {alertPrice === 0
          ? "No Alert Defined"
          : isAboveAlert
            ? "🔔 Over Alert"
            : "📉 Under Alert"}
      </p>
      <p className="text-sm">Alert Price: ${alertPrice.toFixed(2)}</p>
      <p className="text-sm">
        Change:{" "}
        {changePercent >= 0 ? (
          <span className="text-green-200">+{formattedChange}%</span>
        ) : (
          <span className="text-red-200">{formattedChange}%</span>
        )}
      </p>
    </div>
  );
};

export default StockCard;
