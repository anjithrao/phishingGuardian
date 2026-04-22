const STAGE_CONFIG = [
  { num: 1, label: "URL & Domain Analysis", icon: "🔗", description: "Checking domain age, HTTPS, entropy, redirect chains" },
  { num: 2, label: "NLP Behavioral Analysis", icon: "🧠", description: "DistilBERT scanning for manipulation signals" },
  { num: 3, label: "XAI Feature Attribution", icon: "📊", description: "SHAP scoring: why this is suspicious" }
];

export default function ScanPipeline({ scanning, currentStage, stages, scenario }) {
  const verdict = stages[3]?.verdict;
  const score = stages[3]?.finalScore;

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500 tracking-widest">ANALYSIS PIPELINE</span>
        {verdict && (
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            verdict === "SAFE" ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"
          }`}>
            {verdict === "SAFE" ? "✓ SAFE" : `⚠ ${verdict} — ${score}/100`}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {STAGE_CONFIG.map(stage => {
          const done = stages[stage.num] !== null;
          const active = scanning && currentStage === stage.num;

          return (
            <div key={stage.num}
              className={`rounded-lg p-3 border transition-all duration-300 ${
                done ? "border-purple-700 bg-purple-950/20"
                : active ? "border-yellow-700 bg-yellow-950/20"
                : "border-[#1e1e2e] bg-[#0a0a0f]"
              }`}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  done ? "bg-purple-600" : active ? "bg-yellow-600 animate-pulse" : "bg-[#1e1e2e]"
                }`}>
                  {done ? "✓" : active ? "⟳" : stage.num}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">{stage.icon} {stage.label}</div>
                  <div className="text-xs text-gray-500">{stage.description}</div>
                </div>
                {active && <div className="text-yellow-400 text-xs animate-pulse">Scanning...</div>}
              </div>

              {done && stage.num === 1 && stages[1] && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(stages[1]).map(([k, v]) => (
                    <div key={k} className="bg-[#0a0a0f] rounded p-2">
                      <span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g,' $1').trim()}: </span>
                      <span className={String(v).includes('⚠') ? 'text-red-400' : 'text-gray-300'}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {done && stage.num === 2 && stages[2]?.signals?.length > 0 && (
                <div className="mt-3 space-y-1">
                  {stages[2].signals.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-20 text-gray-500 shrink-0">{s.type}</div>
                      <div className="flex-1 bg-[#0a0a0f] rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-red-500" style={{ width: `${s.weight * 100}%` }} />
                      </div>
                      <div className="text-gray-400 shrink-0">"{s.phrase}"</div>
                    </div>
                  ))}
                </div>
              )}

              {done && stage.num === 3 && stages[3]?.shapFeatures && (
                <div className="mt-3 space-y-1.5">
                  {stages[3].shapFeatures.map((f, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-gray-400">{f.name}</span>
                        <span className={f.safe ? "text-green-400" : "text-red-400"}>
                          {f.safe ? "−" : "+"}{Math.abs(f.value).toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-[#0a0a0f] rounded-full h-1">
                        <div className={`h-1 rounded-full ${f.safe ? "bg-green-600" : "bg-red-500"}`}
                          style={{ width: `${f.bar}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
