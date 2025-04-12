export interface StockData {
  symbol: string;
  price: number;
  changePercent: number;
}

export interface StockPoint {
  time: number;
  price: number;
}

export interface Trade {
  s: string;
  p: number;
  t: number;
}
