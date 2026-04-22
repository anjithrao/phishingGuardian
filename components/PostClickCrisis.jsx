import { useState } from "react";

export default function PostClickCrisis({ scenario }) {
  const [completed, setCompleted] = useState([]);
  const steps = scenario.simulation.crisisSteps;
  const pct = steps.length ? Math.round((completed.length / steps.length) * 100) : 0;

  const toggle = (i) =>
    setCompleted(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="bg-[#1a0a0a] border-2 border-red-600 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">🚨</div>
        <div className="flex-1">
          <div className="text-xs text-red-400 tracking-widest font-bold">POST-CLICK CRISIS ROOM</div>
          <div className="text-lg font-bold">Act in the next 30 minutes</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{pct}%</div>
          <div className="text-xs text-gray-500">recovered</div>
        </div>
      </div>

      <div className="bg-[#0a0a0f] rounded-full h-2 mb-5">
        <div className="h-2 rounded-full bg-gradient-to-r from-red-600 to-green-500 transition-all duration-500"
          style={{ width: `${pct}%` }} />
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} onClick={() => toggle(i)}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              completed.includes(i)
                ? "border-green-700 bg-green-950/30"
                : "border-[#2a1a1a] bg-[#0a0a0f] hover:border-red-800"
            }`}>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs ${
              completed.includes(i) ? "border-green-500 bg-green-600" : "border-gray-600"
            }`}>
              {completed.includes(i) ? "✓" : ""}
            </div>
            <div className="text-lg">{step.icon}</div>
            <div className="flex-1 text-sm">{step.title}</div>
            {step.link && !completed.includes(i) && (
              <a href={step.link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-xs text-blue-400 hover:text-blue-300 underline shrink-0">
                Open →
              </a>
            )}
          </div>
        ))}
      </div>

      {pct === 100 && (
        <div className="mt-4 bg-green-950 border border-green-700 rounded-lg p-3 text-center">
          <div className="text-green-400 font-bold">✅ Incident contained!</div>
          <div className="text-gray-400 text-xs mt-1">
            You responded within the critical window. Damage is minimized.
          </div>
        </div>
      )}
    </div>
  );
}
