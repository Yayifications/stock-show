// src/components/Form.tsx
import React from "react";

interface FormProps {
  symbols: string[];
  selected: string;
  onSelect: (value: string) => void;
  alertPrice: number;
  onAlertChange: (value: number) => void;
}

const Form: React.FC<FormProps> = ({
  symbols,
  selected,
  onSelect,
  alertPrice,
  onAlertChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 w-full sm:items-center">
      <div className="flex flex-col w-full sm:w-auto">
        <label className="text-sm font-medium mb-1" htmlFor="symbol">
          Select Stock
        </label>
        <select
          id="symbol"
          value={selected}
          onChange={(e) => {
            const value = e.target.value;
            if (symbols.includes(value)) {
              onSelect(value);
            } else {
              console.error(`Invalid symbol selected: ${value}`);
            }
          }}
          className="border rounded p-2 bg-white text-sm"
        >
          {symbols.length > 0 ? (
            symbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No symbols available
            </option>
          )}
        </select>
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <label className="text-sm font-medium mb-1" htmlFor="alert">
          Alert Price
        </label>
        <input
          type="number"
          id="alert"
          value={alertPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
              onAlertChange(value);
            } else {
              console.error("Alert price must be a positive number.");
            }
          }}
          className="border rounded p-2 text-sm"
          placeholder="Ej. 150.00"
        />
      </div>
    </div>
  );
};

export default Form;
