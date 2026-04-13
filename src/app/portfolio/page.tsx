"use client";

import { portfolioHoldings, type PortfolioHolding } from "@/lib/data";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import Link from "next/link";

function HoldingRow({ h }: { h: PortfolioHolding }) {
  const marketValue = h.quantity * h.currentPrice;
  const costBasis = h.quantity * h.avgCost;
  const pl = marketValue - costBasis;
  const plPercent = costBasis > 0 ? (pl / costBasis) * 100 : 0;
  const isPositive = pl >= 0;

  return (
    <tr className="border-t border-gray-800 hover:bg-white/[.02] transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
            h.type === "crypto" ? "bg-amber-500/15 text-amber-400" : "bg-blue-500/15 text-blue-400"
          }`}>
            {h.symbol.substring(0, 2)}
          </div>
          <div>
            <span className="font-medium text-white">{h.symbol}</span>
            <p className="text-xs text-gray-500">{h.name}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-right text-sm text-gray-300">
        {h.type === "crypto" ? h.quantity.toFixed(4) : h.quantity}
      </td>
      <td className="py-4 px-4 text-right text-sm text-gray-300">
        ${h.avgCost.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-right text-sm text-gray-300">
        ${h.currentPrice.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-right text-sm font-medium text-white">
        ${marketValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </td>
      <td className={`py-4 px-4 text-right text-sm font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
        <div>{isPositive ? "+" : ""}${pl.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        <div className="text-xs opacity-75">{isPositive ? "+" : ""}{plPercent.toFixed(2)}%</div>
      </td>
    </tr>
  );
}

export default function PortfolioPage() {
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUser(getUser());
    setLoaded(true);
    const handler = () => setUser(getUser());
    window.addEventListener("auth-change", handler);
    return () => window.removeEventListener("auth-change", handler);
  }, []);

  if (!loaded) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl">
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-12 text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-xl font-bold text-white mb-2">Sign in required</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to view your portfolio</p>
          <Link
            href="/login"
            className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl">
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-12 text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-xl font-bold text-white mb-2">Sign in required</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to view your portfolio</p>
          <Link
            href="/login"
            className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const totalValue = portfolioHoldings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
  const totalCost = portfolioHoldings.reduce((sum, h) => sum + h.quantity * h.avgCost, 0);
  const totalPL = totalValue - totalCost;
  const totalPLPercent = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;

  const stockValue = portfolioHoldings.filter(h => h.type === "stock").reduce((s, h) => s + h.quantity * h.currentPrice, 0);
  const cryptoValue = portfolioHoldings.filter(h => h.type === "crypto").reduce((s, h) => s + h.quantity * h.currentPrice, 0);

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
        <p className="text-gray-500">Welcome back, {user.name}</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Total Value</p>
          <p className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Total P&L</p>
          <p className={`text-2xl font-bold ${totalPL >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {totalPL >= 0 ? "+" : ""}${totalPL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm ${totalPL >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            {totalPL >= 0 ? "▲" : "▼"} {Math.abs(totalPLPercent).toFixed(2)}%
          </p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Stocks</p>
          <p className="text-2xl font-bold">${stockValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-sm text-blue-400">{((stockValue / totalValue) * 100).toFixed(1)}% of portfolio</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Crypto</p>
          <p className="text-2xl font-bold">${cryptoValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="text-sm text-amber-400">{((cryptoValue / totalValue) * 100).toFixed(1)}% of portfolio</p>
        </div>
      </div>

      {/* Holdings table */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold">Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-500 uppercase">
                <th className="py-3 px-4 font-medium">Asset</th>
                <th className="py-3 px-4 font-medium text-right">Quantity</th>
                <th className="py-3 px-4 font-medium text-right">Avg Cost</th>
                <th className="py-3 px-4 font-medium text-right">Price</th>
                <th className="py-3 px-4 font-medium text-right">Market Value</th>
                <th className="py-3 px-4 font-medium text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolioHoldings.map((h) => (
                <HoldingRow key={h.symbol} h={h} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
