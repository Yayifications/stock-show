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
  showTotalOnly?: boolean;
}

const COLORS = [
  "#e63946",
  "#2a9d8f",
  "#264653",
  "#f4a261",
  "#a8dadc",
  "#ffb703",
  "#6a4c93",
];

const StockChart: React.FC<StockChartProps> = ({ dataSet, showTotalOnly }) => {
  const formattedData = dataSet.map((point) => ({
    time: new Date(point.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: point.price,
    symbol: point.symbol,
  }));

  let symbols = Array.from(new Set(formattedData.map((d) => d.symbol)));

  if (showTotalOnly) {
    symbols = symbols.filter((s) => s === "TOTAL_VALUE");
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
        >
          <XAxis
            dataKey="time"
            stroke="#8884d8"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            interval="preserveStartEnd"
            height={60}
          />
          <YAxis
            stroke="#8884d8"
            tickFormatter={(value) =>
              `$${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            }
            width={80}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${value.toFixed(2)}`,
              name === "TOTAL_VALUE" ? "Total Stock Value ($)" : name,
            ]}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          />
          {symbols.map((symbol, index) => (
            <Line
              key={symbol}
              type="monotone"
              dataKey="price"
              data={formattedData.filter((d) => d.symbol === symbol)}
              name={symbol === "TOTAL_VALUE" ? "Total Stock Value ($)" : symbol}
              stroke={
                symbol === "TOTAL_VALUE"
                  ? "#000"
                  : COLORS[index % COLORS.length]
              }
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
