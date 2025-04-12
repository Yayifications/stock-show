import React, { useState } from "react";

interface FormProps {
  symbols: string[];
  onAdd: (symbol: string, alertPrice: number) => void;
}

const Form: React.FC<FormProps> = ({ symbols, onAdd }) => {
  const [selected, setSelected] = useState(symbols[0] ?? "");
  const [alert, setAlert] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selected || !alert) return;

    onAdd(selected, Number(alert));
    setAlert(0);
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
          type="number"
          value={alert}
          onChange={(e) =>
            setAlert(e.target.value ? Number(e.target.value) : 0)
          }
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
