import { useEffect, useMemo } from "react";
import { Trade } from "../types/stock";

export function useFinnhubSocket(
  symbols: string[],
  onData: (symbol: string, price: number, timestamp: number) => void
) {
  const stableSymbols = useMemo(() => symbols, [symbols]);

  useEffect(() => {
    const token = import.meta.env.VITE_FINNHUB_API_KEY;

    if (!token) {
      console.error("❌ Finnhub API key is missing.");
      return;
    }

    const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);
    console.log("🧪 WebSocket creado");

    const handleOpen = () => {
      console.log("✅ WebSocket abierto");
      stableSymbols.forEach((symbol) => {
        console.log(`📡 Suscribiéndose a ${symbol}`);
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("📨 Mensaje recibido:", data);

      if (data.type === "trade") {
        (data.data as Trade[]).forEach((trade) => {
          console.log(`📊 ${trade.s}: $${trade.p}`);
          onData(trade.s, trade.p, trade.t);
        });
      } else if (data.type === "ping") {
        console.log("📡 Ping recibido (conexión viva)");
      }
    };

    const handleError = (event: Event) => {
      console.error("❌ WebSocket error:", event);
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("error", handleError);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("error", handleError);

      if (socket.readyState === WebSocket.OPEN) {
        stableSymbols.forEach((symbol) => {
          socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        });
        socket.close();
        console.log("🛑 WebSocket cerrado (OPEN)");
      } else if (socket.readyState === WebSocket.CONNECTING) {
        socket.addEventListener("open", () => {
          stableSymbols.forEach((symbol) => {
            socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
          });
          socket.close();
          console.log("🛑 WebSocket cerrado tras conectar");
        });
      }
    };
  }, [stableSymbols, onData]);
}
