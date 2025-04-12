# 📈 Stock Show – Real-Time Stock Tracker

A React + Tailwind + Vite app for tracking stock prices in real time using the Finnhub API.

---

## Features

- Dropdown to select stocks (AAPL, TSLA, BTC, etc.)
- Price alert input: green if price is above, red if below 🟩🟥
- Live price chart using `recharts`
- Real-time WebSocket connection to Finnhub
- 100% mobile responsive 📱

---

## Preview

> _(Optional: Add a screenshot or GIF demo here)_

---

## Installation

```bash
git clone https://github.com/Yayifications/stock-show.git
cd stock-show
npm install
```

---

## Environment Setup

1. Copy the `.env.example` file and rename it to `.env`
2. Get your free API key from [https://finnhub.io](https://finnhub.io)
3. Paste it inside `.env` like this:

```env
VITE_FINNHUB_API_KEY=your_api_key_here
```

---

## Run Locally

```bash
npm run dev
```

Then open your browser at:  
👉 [http://localhost:5173](http://localhost:5173)

---

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/) – for real-time chart rendering
- [Finnhub API](https://finnhub.io/) – for financial WebSocket data

---

## Notes

- The free plan on Finnhub allows **only 1 active WebSocket connection**
- Stock symbols like `AAPL` only emit data during US market hours  
  ➤ Use `BINANCE:BTCUSDT` (crypto) for 24/7 testing
