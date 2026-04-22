import { useState } from "react";

export default function InputPanel({ scenarios, onScan }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Analyze a Message</h1>
        <p className="text-gray-500 text-sm">Select a demo scenario to see PhishGuard in action</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {scenarios.map(s => (
          <button key={s.id} onClick={() => setSelected(s)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selected?.id === s.id
                ? "border-purple-500 bg-purple-900/20"
                : "border-[#1e1e2e] bg-[#12121a] hover:border-gray-600"
            }`}>
            <div className="font-bold text-sm">{s.label}</div>
            <div className="text-gray-500 text-xs mt-1 truncate">{s.subject}</div>
            {s.simulation.verdict === "SAFE"
              ? <div className="mt-2 text-xs text-green-400">✓ Legitimate email</div>
              : <div className="mt-2 text-xs text-red-400">Risk: {s.simulation.riskScore}/100</div>
            }
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-4 mb-4">
          <div className="text-xs text-gray-500 mb-1">SUBJECT</div>
          <div className="text-sm font-bold mb-3">{selected.subject}</div>
          <div className="text-xs text-gray-500 mb-1">BODY</div>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-[#0a0a0f] rounded p-3">
            {selected.body}
          </pre>
          {selected.url && (
            <div className="mt-3 text-xs">
              <span className="text-gray-500">URL: </span>
              <span className={selected.simulation.urlFeatures?.usesHTTP ? "text-red-400" : "text-green-400"}>
                {selected.url}
              </span>
            </div>
          )}
        </div>
      )}

      <button onClick={() => selected && onScan(selected)} disabled={!selected}
        className={`w-full py-3 rounded-xl font-bold text-sm tracking-widest transition-all ${
          selected
            ? "bg-gradient-to-r from-red-600 to-purple-600 hover:opacity-90 cursor-pointer"
            : "bg-[#1e1e2e] text-gray-600 cursor-not-allowed"
        }`}>
        🛡️ SCAN WITH PHISHGUARD
      </button>
    </div>
  );
}
