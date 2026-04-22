import { useState } from "react";
import { SCENARIOS } from "./data/scenarios";
import { runSimulation, callGeminiExplain } from "./data/simulationEngine";
import InputPanel from "./components/InputPanel";
import ScanPipeline from "./components/ScanPipeline";
import ManipulationMirror from "./components/ManipulationMirror";
import PostClickCrisis from "./components/PostClickCrisis";
import VulnFingerprint from "./components/VulnFingerprint";

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gemini_key") || "AIzaSyC9HMYXaTi5dhmYKi4dI31N_bQ8CC3XCgk");
  const [scenario, setScenario] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [stages, setStages] = useState({ 1: null, 2: null, 3: null });
  const [currentStage, setCurrentStage] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [showCrisis, setShowCrisis] = useState(false);
  const [vulnHistory, setVulnHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vuln_history") || "[]"); } catch { return []; }
  });

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("gemini_key", key);
  };

  const startScan = async (selectedScenario) => {
    setScenario(selectedScenario);
    setScanning(true);
    setStages({ 1: null, 2: null, 3: null });
    setCurrentStage(0);
    setExplanation("");
    setShowCrisis(false);

    await runSimulation(selectedScenario, (stageNum, data) => {
      setCurrentStage(stageNum);
      setStages(prev => ({ ...prev, [stageNum]: data }));
    });

    if (selectedScenario.simulation.verdict !== "SAFE") {
      const explain = await callGeminiExplain(selectedScenario, apiKey);
      setExplanation(explain);

      if (selectedScenario.simulation.vulnType) {
        const newHistory = [...vulnHistory, {
          type: selectedScenario.simulation.vulnType,
          tactic: selectedScenario.simulation.tactic,
          score: selectedScenario.simulation.riskScore,
          time: new Date().toLocaleTimeString()
        }];
        setVulnHistory(newHistory);
        localStorage.setItem("vuln_history", JSON.stringify(newHistory));
      }
    }
    setScanning(false);
  };

  const reset = () => {
    setScenario(null);
    setStages({ 1: null, 2: null, 3: null });
    setCurrentStage(0);
    setExplanation("");
    setShowCrisis(false);
    setScanning(false);
  };

  const analysisComplete = stages[3] !== null;
  const isPhishing = scenario?.simulation?.verdict !== "SAFE";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono">
      {/* Header */}
      <div className="border-b border-[#1e1e2e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-widest">🛡️ PHISHGUARD AI</span>
          <span className="text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">LIVE DEMO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Gemini Key:</span>
          <input
            type="password"
            value={apiKey}
            onChange={e => saveApiKey(e.target.value)}
            placeholder="AIza... (free at aistudio.google.com)"
            className="text-xs bg-[#12121a] border border-[#1e1e2e] rounded px-2 py-1 w-52 text-gray-300 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="flex h-[calc(100vh-65px)]">
        {/* LEFT SIDEBAR — Vulnerability Fingerprint */}
        <div className="w-64 border-r border-[#1e1e2e] p-4 overflow-y-auto flex-shrink-0">
          <VulnFingerprint history={vulnHistory} onClear={() => {
            setVulnHistory([]);
            localStorage.removeItem("vuln_history");
          }} />
        </div>

        {/* MAIN AREA */}
        <div className="flex-1 overflow-y-auto p-6">
          {!scenario ? (
            <InputPanel scenarios={SCENARIOS} onScan={startScan} />
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              <button onClick={reset} className="text-xs text-gray-500 hover:text-white mb-2">
                ← Scan another message
              </button>

              <ScanPipeline
                scanning={scanning}
                currentStage={currentStage}
                stages={stages}
                scenario={scenario}
              />

              {analysisComplete && (
                <>
                  {isPhishing ? (
                    <>
                      <ManipulationMirror
                        scenario={scenario}
                        explanation={explanation}
                        onSimulateClick={() => setShowCrisis(true)}
                      />
                      {showCrisis && <PostClickCrisis scenario={scenario} />}
                    </>
                  ) : (
                    <div className="bg-[#0a1a0f] border border-green-800 rounded-xl p-6 text-center">
                      <div className="text-5xl mb-3">✅</div>
                      <div className="text-green-400 font-bold text-lg">Message is Safe</div>
                      <div className="text-gray-400 text-sm mt-2">
                        No manipulation tactics, suspicious domains, or credential harvesting detected.
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                        {stages[3]?.shapFeatures?.map((f, i) => (
                          <div key={i} className="bg-[#12121a] rounded p-2 text-green-400">✓ {f.name}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
