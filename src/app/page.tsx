"use client";

import { stocks, cryptos, type Stock, type Crypto } from "@/lib/data";
import { SparklineChart } from "@/components/SparklineChart";
import { useState } from "react";

function StockCard({ stock }: { stock: Stock }) {
  const isPositive = stock.change >= 0;
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-white">{stock.symbol}</h3>
          <p className="text-xs text-gray-500">{stock.name}</p>
        </div>
        <SparklineChart data={stock.sparkline} color={isPositive ? "#10b981" : "#ef4444"} width={80} height={32} />
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold">${stock.price.toLocaleString()}</span>
        <div className="text-right">
          <span className={`text-sm font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
            {isPositive ? "+" : ""}{stock.change.toFixed(2)}
          </span>
          <span className={`block text-xs ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
            {isPositive ? "▲" : "▼"} {Math.abs(stock.changePercent).toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-3 pt-3 border-t border-gray-800 text-xs text-gray-500">
        <span>Vol: {stock.volume}</span>
        <span>MCap: {stock.marketCap}</span>
      </div>
    </div>
  );
}

function CryptoCard({ crypto }: { crypto: Crypto }) {
  const isPositive = crypto.change >= 0;
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{crypto.icon}</span>
          <div>
            <h3 className="font-bold text-white">{crypto.symbol}</h3>
            <p className="text-xs text-gray-500">{crypto.name}</p>
          </div>
        </div>
        <SparklineChart data={crypto.sparkline} color={isPositive ? "#10b981" : "#ef4444"} width={80} height={32} />
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold">${crypto.price.toLocaleString()}</span>
        <div className="text-right">
          <span className={`text-sm font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
            {isPositive ? "+" : ""}{crypto.change.toFixed(2)}
          </span>
          <span className={`block text-xs ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
            {isPositive ? "▲" : "▼"} {Math.abs(crypto.changePercent).toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-3 pt-3 border-t border-gray-800 text-xs text-gray-500">
        <span>Vol: {crypto.volume}</span>
        <span>MCap: {crypto.marketCap}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [tab, setTab] = useState<"stocks" | "crypto">("stocks");

  const totalStockMktChange = stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length;
  const totalCryptoMktChange = cryptos.reduce((sum, c) => sum + c.changePercent, 0) / cryptos.length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Market Overview</h1>
        <p className="text-gray-500">Real-time stock and cryptocurrency prices</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">S&P 500</p>
          <p className="text-2xl font-bold">5,842.31</p>
          <p className="text-sm text-emerald-400">▲ 0.74%</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">NASDAQ</p>
          <p className="text-2xl font-bold">18,439.17</p>
          <p className="text-sm text-emerald-400">▲ 1.12%</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Avg Stock Change</p>
          <p className="text-2xl font-bold">{totalStockMktChange >= 0 ? "+" : ""}{totalStockMktChange.toFixed(2)}%</p>
          <p className={`text-sm ${totalStockMktChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>Tracked stocks</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Avg Crypto Change</p>
          <p className="text-2xl font-bold">{totalCryptoMktChange >= 0 ? "+" : ""}{totalCryptoMktChange.toFixed(2)}%</p>
          <p className={`text-sm ${totalCryptoMktChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>Tracked coins</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111827] border border-gray-800 rounded-lg p-1 w-fit mb-6">
        <button
          onClick={() => setTab("stocks")}
          data-testid="tab-stocks"
          className={`px-4 py-2 text-sm rounded-md ${
            tab === "stocks" ? "bg-blue-500/15 text-blue-400 font-medium" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Stocks ({stocks.length})
        </button>
        <button
          onClick={() => setTab("crypto")}
          data-testid="tab-crypto"
          className={`px-4 py-2 text-sm rounded-md ${
            tab === "crypto" ? "bg-blue-500/15 text-blue-400 font-medium" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Crypto ({cryptos.length})
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tab === "stocks"
          ? stocks.map((s) => <StockCard key={s.symbol} stock={s} />)
          : cryptos.map((c) => <CryptoCard key={c.symbol} crypto={c} />)}
      </div>
    </div>
  );
}
