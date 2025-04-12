import React, { useState } from "react";

interface FormProps {
  symbols: string[];
  onAdd: (symbol: string, alertPrice: number) => void;
}

const Form: React.FC<FormProps> = ({ symbols, onAdd }) => {
  const [selected, setSelected] = useState(symbols[0] ?? "");
  const [alert, setAlert] = useState<string>("");
  const [formatted, setFormatted] = useState(false);
  const [showError, setShowError] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setAlert(raw);
    setFormatted(false);
  };

  const handleBlur = () => {
    if (!alert) return;
    const parsed = parseFloat(alert);
    if (!isNaN(parsed)) {
      setAlert(formatter.format(parsed));
      setFormatted(true);
    }
  };

  const handleFocus = () => {
    if (formatted) {
      const clean = alert.replace(/[^0-9.]/g, "");
      setAlert(clean);
      setFormatted(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(alert.replace(/[^0-9.]/g, ""));
    if (!selected || isNaN(parsed) || parsed <= 0) {
      setShowError(true);
      return;
    }
    onAdd(selected, parsed);
    setAlert("");
    setFormatted(false);
    setShowError(false);
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
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="$0.00"
          className={`w-full border rounded p-2 text-sm ${
            showError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {showError && (
          <p className="text-red-500 text-xs mt-1">
            Please enter a valid price above 0
          </p>
        )}
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
