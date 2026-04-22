import { useState } from "react";

export default function ManipulationMirror({ scenario, explanation, onSimulateClick }) {
  const [countdown, setCountdown] = useState(5);
  const [timerState, setTimerState] = useState("idle"); // idle | running | done
  const sim = scenario.simulation;

  const startCooldown = () => {
    setTimerState("running");
    let c = 5;
    const interval = setInterval(() => {
      c--;
      setCountdown(c);
      if (c === 0) { clearInterval(interval); setTimerState("done"); }
    }, 1000);
  };

  return (
    <div className="bg-[#12121a] border-2 border-red-800 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{sim.tacticEmoji}</div>
        <div className="flex-1">
          <div className="text-xs text-red-400 tracking-widest font-bold">🧠 MANIPULATION MIRROR</div>
          <div className="text-xl font-bold">{sim.tactic}</div>
          <div className="text-xs text-gray-500">Detection confidence: {sim.confidence}%</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400">{sim.riskScore}</div>
          <div className="text-xs text-gray-500">/ 100</div>
        </div>
      </div>

      {/* Gemini AI Explanation */}
      <div className="bg-[#0a0a0f] border border-purple-800 rounded-lg p-4 mb-4">
        <div className="text-xs text-purple-400 tracking-widest mb-2">⚡ AI EXPLANATION (Gemini)</div>
        {explanation
          ? <p className="text-sm text-gray-200 leading-relaxed">{explanation}</p>
          : <div className="text-gray-500 text-sm flex items-center gap-2">
              <span className="animate-pulse">●</span> Generating plain-English explanation...
            </div>
        }
      </div>

      {/* Detected Signal Phrases */}
      {sim.signals.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 tracking-widest mb-2">MANIPULATION PHRASES DETECTED</div>
          <div className="flex flex-wrap gap-2">
            {sim.signals.map((s, i) => (
              <div key={i} className={`rounded-lg px-3 py-1.5 text-xs font-bold border ${
                s.type === "URGENCY"    ? "bg-orange-950 border-orange-700 text-orange-300" :
                s.type === "FEAR"      ? "bg-red-950 border-red-700 text-red-300" :
                s.type === "ISOLATION" ? "bg-yellow-950 border-yellow-700 text-yellow-300" :
                                         "bg-purple-950 border-purple-700 text-purple-300"
              }`}>
                "{s.phrase}" <span className="opacity-60 text-[10px] ml-1">{s.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5-Second Cognitive Cooldown */}
      <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg p-4 mb-4">
        <div className="text-xs text-gray-500 mb-2">
          This attack creates artificial urgency. Break the psychological loop:
        </div>
        {timerState === "idle" && (
          <button onClick={startCooldown}
            className="w-full py-2 bg-yellow-900 hover:bg-yellow-800 border border-yellow-700 rounded-lg text-yellow-300 text-sm font-bold">
            ⏱ Take 5 Seconds — Break the Urgency Loop
          </button>
        )}
        {timerState === "running" && (
          <div className="text-center py-2">
            <div className="text-4xl font-bold text-yellow-400">{countdown}</div>
            <div className="text-xs text-gray-500 mt-1">breathe — then decide consciously</div>
          </div>
        )}
        {timerState === "done" && (
          <div className="text-center py-2 text-green-400 font-bold text-sm">
            ✓ Good. Now you can make a clear-headed decision.
          </div>
        )}
      </div>

      {/* Safe Redirect */}
      {sim.safeDomain && (
        <div className="bg-[#031208] border border-green-800 rounded-lg p-4 mb-4">
          <div className="text-xs text-green-400 tracking-widest mb-1">PHISHGUARD REDIRECT</div>
          <div className="text-sm text-gray-300 mb-2">
            If you need {sim.impersonatedBrand}, go directly to the real site:
          </div>
          <a href={sim.safeDomain} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between bg-green-900 hover:bg-green-800 rounded-lg px-4 py-2 text-green-300 font-bold text-sm">
            ✅ Open real {sim.impersonatedBrand} →
            <span className="text-xs font-normal opacity-70">{sim.safeDomain}</span>
          </a>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onSimulateClick}
          className="flex-1 py-2 bg-red-950 hover:bg-red-900 border border-red-700 rounded-lg text-red-400 text-xs font-bold">
          🚨 I already clicked — show recovery
        </button>
        <button className="flex-1 py-2 bg-[#1e1e2e] hover:bg-[#2a2a3e] rounded-lg text-gray-400 text-xs">
          ✓ Understood, dismiss
        </button>
      </div>
    </div>
  );
}
