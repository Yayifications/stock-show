import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { StockPoint } from "../types/stock";

interface StockChartProps {
  data: StockPoint[];
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, symbol }) => {
  const formattedData = data.map((point) => ({
    time: new Date(point.time).toLocaleTimeString(),
    price: point.price,
  }));

  return (
    <div className="w-full h-64 sm:h-80">
      <h2 className="text-center font-semibold mb-2">
        Stock History: {symbol}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <XAxis dataKey="time" minTickGap={30} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
