export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sparkline: number[];
}

export interface Crypto {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  icon: string;
  sparkline: number[];
}

// Seeded PRNG for deterministic sparkline data (avoids SSR/client hydration mismatch)
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

let sparklineSeed = 42;
function generateSparkline(base: number, volatility: number): number[] {
  const rng = seededRandom(sparklineSeed++);
  const points: number[] = [];
  let val = base;
  for (let i = 0; i < 20; i++) {
    val += (rng() - 0.48) * volatility;
    points.push(Math.round(val * 100) / 100);
  }
  return points;
}

export const stocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 237.45, change: 3.21, changePercent: 1.37, volume: "52.3M", marketCap: "3.64T", sparkline: generateSparkline(237, 2) },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 468.12, change: -2.87, changePercent: -0.61, volume: "18.7M", marketCap: "3.48T", sparkline: generateSparkline(468, 4) },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 192.34, change: 5.43, changePercent: 2.91, volume: "23.1M", marketCap: "2.37T", sparkline: generateSparkline(192, 3) },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 213.56, change: 1.12, changePercent: 0.53, volume: "41.8M", marketCap: "2.22T", sparkline: generateSparkline(213, 2) },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 142.89, change: -4.56, changePercent: -3.09, volume: "312.5M", marketCap: "3.51T", sparkline: generateSparkline(142, 5) },
  { symbol: "TSLA", name: "Tesla Inc.", price: 342.78, change: 12.34, changePercent: 3.73, volume: "98.2M", marketCap: "1.10T", sparkline: generateSparkline(342, 8) },
  { symbol: "META", name: "Meta Platforms", price: 612.30, change: -8.45, changePercent: -1.36, volume: "14.3M", marketCap: "1.55T", sparkline: generateSparkline(612, 6) },
  { symbol: "JPM", name: "JPMorgan Chase", price: 258.90, change: 1.78, changePercent: 0.69, volume: "8.9M", marketCap: "744.2B", sparkline: generateSparkline(258, 2) },
];

export const cryptos: Crypto[] = [
  { symbol: "BTC", name: "Bitcoin", price: 104820.50, change: 2340.12, changePercent: 2.28, volume: "$38.2B", marketCap: "$2.08T", icon: "₿", sparkline: generateSparkline(104820, 800) },
  { symbol: "ETH", name: "Ethereum", price: 3892.30, change: -45.67, changePercent: -1.16, volume: "$14.5B", marketCap: "$468.7B", icon: "Ξ", sparkline: generateSparkline(3892, 40) },
  { symbol: "SOL", name: "Solana", price: 187.45, change: 8.92, changePercent: 5.0, volume: "$3.8B", marketCap: "$91.2B", icon: "◎", sparkline: generateSparkline(187, 6) },
  { symbol: "BNB", name: "BNB", price: 712.34, change: -12.30, changePercent: -1.70, volume: "$1.9B", marketCap: "$103.5B", icon: "⬡", sparkline: generateSparkline(712, 10) },
  { symbol: "XRP", name: "Ripple", price: 2.43, change: 0.15, changePercent: 6.58, volume: "$5.2B", marketCap: "$140.1B", icon: "✕", sparkline: generateSparkline(2.43, 0.05) },
  { symbol: "ADA", name: "Cardano", price: 0.82, change: -0.03, changePercent: -3.53, volume: "$890M", marketCap: "$29.1B", icon: "₳", sparkline: generateSparkline(0.82, 0.02) },
];

export interface PortfolioHolding {
  symbol: string;
  name: string;
  type: "stock" | "crypto";
  quantity: number;
  avgCost: number;
  currentPrice: number;
}

export const portfolioHoldings: PortfolioHolding[] = [
  { symbol: "AAPL", name: "Apple Inc.", type: "stock", quantity: 50, avgCost: 178.50, currentPrice: 237.45 },
  { symbol: "BTC", name: "Bitcoin", type: "crypto", quantity: 0.85, avgCost: 42300, currentPrice: 104820.50 },
  { symbol: "NVDA", name: "NVIDIA Corp.", type: "stock", quantity: 30, avgCost: 88.20, currentPrice: 142.89 },
  { symbol: "ETH", name: "Ethereum", type: "crypto", quantity: 12, avgCost: 2150.00, currentPrice: 3892.30 },
  { symbol: "TSLA", name: "Tesla Inc.", type: "stock", quantity: 20, avgCost: 215.60, currentPrice: 342.78 },
  { symbol: "SOL", name: "Solana", type: "crypto", quantity: 200, avgCost: 45.80, currentPrice: 187.45 },
];
