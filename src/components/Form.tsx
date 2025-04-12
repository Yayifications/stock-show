import React, { useState } from "react";

interface FormProps {
  symbols: string[];
  onAdd: (symbol: string, alertPrice: number) => void;
}

const Form: React.FC<FormProps> = ({ symbols, onAdd }) => {
  const [selected, setSelected] = useState(symbols[0] ?? "");
  const [alert, setAlert] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = parseFloat(alert);
    if (!selected || isNaN(parsed) || parsed <= 0) {
      console.warn("⚠️ Invalid alert price");
      return;
    }

    onAdd(selected, parsed);
    setAlert(""); // limpiar el input
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="symbol">
          Stock Symbol
        </label>
        <select
          id="symbol"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="alert">
          Alert Price
        </label>
        <input
          id="alert"
          type="text"
          inputMode="decimal"
          value={alert}
          onChange={(e) => setAlert(e.target.value)}
          placeholder="e.g. 150.00"
          className="w-full border rounded p-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        ➕ Add Stock
      </button>
    </form>
  );
};

export default Form;
