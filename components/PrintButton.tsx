"use client";
export default function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="no-print rounded-xl bg-[#245c43] px-5 py-3 text-sm font-semibold text-white hover:bg-[#173e2e]">Print meeting program</button>;
}
