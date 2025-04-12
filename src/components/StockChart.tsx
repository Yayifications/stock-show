import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface StockChartProps {
  dataSet: { time: number; price: number; symbol: string }[];
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ dataSet }) => {
  const formattedData = dataSet.map((point) => ({
    time: new Date(point.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: point.price,
    symbol: point.symbol,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <XAxis dataKey="time" stroke="#8884d8" />
          <YAxis stroke="#8884d8" domain={["dataMin", "dataMax"]} />
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${value.toFixed(2)}`,
              name,
            ]}
          />
          <Legend />
          {Array.from(new Set(formattedData.map((d) => d.symbol))).map(
            (symbol, index) => (
              <Line
                key={symbol}
                type="monotone"
                dataKey="price"
                data={formattedData.filter((d) => d.symbol === symbol)}
                name={symbol}
                stroke={`hsl(${(index * 360) / formattedData.length}, 70%, 50%)`}
                strokeWidth={2}
                dot={false}
              />
            )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
