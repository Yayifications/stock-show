import { useEffect, useRef } from "react";
import { Trade } from "../types/stock";

export function useFinnhubSocket(
  symbols: string[],
  onData: (symbol: string, price: number, timestamp: number) => void
) {
  const socketRef = useRef<WebSocket | null>(null);
  const subscribedSymbols = useRef<Set<string>>(new Set());
  const reconnectTimeout = useRef<number | null>(null);

  const connectSocket = () => {
    const token = import.meta.env.VITE_FINNHUB_API_KEY;
    if (!token) return console.error("❌ Finnhub API key is missing");

    const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);
    socketRef.current = socket;
    console.log("🧪 WebSocket creado");

    socket.addEventListener("open", () => {
      console.log("✅ WebSocket abierto");
      symbols.forEach((symbol) => {
        if (!subscribedSymbols.current.has(symbol)) {
          socket.send(JSON.stringify({ type: "subscribe", symbol }));
          subscribedSymbols.current.add(symbol);
          console.log(`📡 Subscribing to ${symbol}`);
        }
      });
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        (data.data as Trade[]).forEach((trade) => {
          onData(trade.s, trade.p, trade.t);
        });
      } else if (data.type === "ping") {
        console.log("📡 Ping recibido");
      }
    });

    socket.addEventListener("error", (event) => {
      console.error("❌ WebSocket error", event);
    });

    socket.addEventListener("close", () => {
      console.warn("🔌 WebSocket cerrado, reintentando en 5s...");
      subscribedSymbols.current.clear();
      reconnectTimeout.current = setTimeout(connectSocket, 5000);
    });
  };

  useEffect(() => {
    if (
      !socketRef.current ||
      socketRef.current.readyState === WebSocket.CLOSED
    ) {
      connectSocket();
    }

    return () => {
      reconnectTimeout.current && clearTimeout(reconnectTimeout.current);
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    symbols.forEach((symbol) => {
      if (!subscribedSymbols.current.has(symbol)) {
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
        subscribedSymbols.current.add(symbol);
        console.log(`📡 Subscribing to ${symbol}`);
      }
    });

    // Unsubscribe de símbolos que ya no están
    subscribedSymbols.current.forEach((symbol) => {
      if (!symbols.includes(symbol)) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        subscribedSymbols.current.delete(symbol);
        console.log(`🛑 Unsubscribed from ${symbol}`);
      }
    });
  }, [symbols, onData]);
}
