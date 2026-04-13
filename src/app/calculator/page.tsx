"use client";

import { useState } from "react";

type CalculatorMode = "compound" | "roi" | "tax";

export default function CalculatorPage() {
  const [mode, setMode] = useState<CalculatorMode>("compound");

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Investment Calculator</h1>
        <p className="text-gray-500">Plan your investments with our financial tools</p>
      </div>

      <div className="flex gap-1 bg-[#111827] border border-gray-800 rounded-lg p-1 w-fit mb-8">
        {(["compound", "roi", "tax"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 text-sm rounded-md transition-colors capitalize ${
              mode === m ? "bg-blue-500/15 text-blue-400 font-medium" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {m === "compound" ? "Compound Interest" : m === "roi" ? "ROI Calculator" : "Tax Calculator"}
          </button>
        ))}
      </div>

      {mode === "compound" && <CompoundCalculator />}
      {mode === "roi" && <ROICalculator />}
      {mode === "tax" && <TaxCalculator />}
    </div>
  );
}

function CompoundCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [monthly, setMonthly] = useState("500");
  const [result, setResult] = useState<{ total: number; contributions: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseInt(years) || 0;
    const m = parseFloat(monthly) || 0;

    const monthlyRate = r / 12;
    const months = t * 12;

    let balance = p;
    for (let i = 0; i < months; i++) {
      balance = (balance + m) * (1 + monthlyRate);
    }

    const totalContributions = p + m * months;
    const totalInterest = balance - totalContributions;

    setResult({ total: balance, contributions: totalContributions, interest: totalInterest });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-6">Compound Interest</h2>
        <div className="flex flex-col gap-5">
          <InputField label="Initial Investment ($)" value={principal} onChange={setPrincipal} id="principal" />
          <InputField label="Annual Interest Rate (%)" value={rate} onChange={setRate} id="rate" />
          <InputField label="Time Period (years)" value={years} onChange={setYears} id="years" />
          <InputField label="Monthly Contribution ($)" value={monthly} onChange={setMonthly} id="monthly" />
          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Calculate
          </button>
        </div>
      </div>
      {result && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Results</h2>
          <div className="flex flex-col gap-4">
            <ResultRow label="Future Value" value={`$${result.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} highlight />
            <ResultRow label="Total Contributions" value={`$${result.contributions.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
            <ResultRow label="Total Interest Earned" value={`$${result.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} accent />
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Interest/Contribution Ratio</span>
                <span className="text-emerald-400">{((result.interest / result.contributions) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ROICalculator() {
  const [invested, setInvested] = useState("5000");
  const [current, setCurrent] = useState("7500");
  const [result, setResult] = useState<{ roi: number; profit: number } | null>(null);

  const calculate = () => {
    const inv = parseFloat(invested) || 0;
    const cur = parseFloat(current) || 0;

    const profit = cur - inv;
    const roi = inv > 0 ? (profit / inv) * 100 : 0;

    setResult({ roi, profit });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-6">Return on Investment</h2>
        <div className="flex flex-col gap-5">
          <InputField label="Amount Invested ($)" value={invested} onChange={setInvested} id="invested" />
          <InputField label="Current Value ($)" value={current} onChange={setCurrent} id="current" />
          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Calculate ROI
          </button>
        </div>
      </div>
      {result && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Results</h2>
          <div className="flex flex-col gap-4">
            <ResultRow label="ROI" value={`${result.roi.toFixed(2)}%`} highlight />
            <ResultRow
              label={result.profit >= 0 ? "Profit" : "Loss"}
              value={`${result.profit >= 0 ? "+" : ""}$${result.profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              accent={result.profit >= 0}
              danger={result.profit < 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TaxCalculator() {
  const [income, setIncome] = useState("85000");
  const [gains, setGains] = useState("12000");
  const [holdingPeriod, setHoldingPeriod] = useState<"short" | "long">("long");
  const [result, setResult] = useState<{
    incomeTax: number;
    capitalGainsTax: number;
    totalTax: number;
    effectiveRate: number;
    netIncome: number;
  } | null>(null);

  const calculate = () => {
    const inc = parseFloat(income) || 0;
    const cap = parseFloat(gains) || 0;

    // Progressive income tax brackets (simplified US 2024)
    let incomeTax = 0;
    const brackets = [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ];

    let remaining = inc;
    let prevLimit = 0;
    for (const bracket of brackets) {
      const taxable = Math.min(remaining, bracket.limit - prevLimit);
      if (taxable <= 0) break;
      incomeTax += taxable * bracket.rate;
      remaining -= taxable;
      prevLimit = bracket.limit;
    }

    // BUG: Capital gains tax rate for long-term is wrong!
    // Should be 15% for most income levels, but we're using 20% always.
    // For short-term it should match income tax rate, but we use a flat 25%.
    let capitalGainsTax: number;
    if (holdingPeriod === "long") {
      capitalGainsTax = cap * 0.20;
    } else {
      capitalGainsTax = cap * 0.25;
    }

    const totalTax = incomeTax + capitalGainsTax;
    const totalIncome = inc + cap;
    const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;
    const netIncome = totalIncome - totalTax;

    setResult({ incomeTax, capitalGainsTax, totalTax, effectiveRate, netIncome });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-6">Tax Estimator</h2>
        <div className="flex flex-col gap-5">
          <InputField label="Annual Income ($)" value={income} onChange={setIncome} id="income" />
          <InputField label="Capital Gains ($)" value={gains} onChange={setGains} id="gains" />
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Holding Period</label>
            <div className="flex gap-2">
              <button
                onClick={() => setHoldingPeriod("short")}
                className={`flex-1 py-2.5 text-sm rounded-lg border transition-colors ${
                  holdingPeriod === "short"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                Short-term (&lt;1yr)
              </button>
              <button
                onClick={() => setHoldingPeriod("long")}
                className={`flex-1 py-2.5 text-sm rounded-lg border transition-colors ${
                  holdingPeriod === "long"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                Long-term (&gt;1yr)
              </button>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            Estimate Tax
          </button>
        </div>
      </div>
      {result && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6">Tax Breakdown</h2>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Estimated Tax</h3>
            <ResultRow label="Income Tax" value={`$${result.incomeTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
            <ResultRow label="Capital Gains Tax" value={`$${result.capitalGainsTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
            <div className="border-t border-gray-800 pt-4">
              <ResultRow label="Total Tax" value={`$${result.totalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} highlight />
            </div>
            <ResultRow label="Effective Tax Rate" value={`${result.effectiveRate.toFixed(1)}%`} />
            <ResultRow label="Net Income" value={`$${result.netIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} accent />
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, id }: { label: string; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-[#0b0f1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
}

function ResultRow({ label, value, highlight, accent, danger }: {
  label: string; value: string; highlight?: boolean; accent?: boolean; danger?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`font-bold ${
        highlight ? "text-xl text-white" : accent ? "text-emerald-400" : danger ? "text-red-400" : "text-gray-200"
      }`}>
        {value}
      </span>
    </div>
  );
}
