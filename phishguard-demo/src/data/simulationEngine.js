// Simulates a 3-stage analysis pipeline with realistic delays.
// All outputs are deterministic per scenario — no randomness in demo mode.

export async function runSimulation(scenario, onStageComplete) {
  // Stage 1: URL + Header Analysis (~800ms)
  await delay(800);
  onStageComplete(1, {
    urlRisk: scenario.simulation.urlFeatures
      ? (scenario.simulation.riskScore > 50 ? "HIGH" : "LOW")
      : "N/A — No URL (BEC attack)",
    domainAge: scenario.simulation.urlFeatures?.domainAge ?? "No domain",
    protocol: scenario.simulation.urlFeatures?.usesHTTP ? "HTTP ⚠️" : "HTTPS ✓",
    entropy: scenario.simulation.urlFeatures?.domainEntropy ?? "N/A"
  });

  // Stage 2: NLP + Behavioral Analysis (~1400ms)
  await delay(1400);
  onStageComplete(2, {
    signals: scenario.simulation.signals,
    tacticDetected: scenario.simulation.tactic,
    confidence: scenario.simulation.confidence
  });

  // Stage 3: XAI Feature Attribution (~900ms)
  await delay(900);
  onStageComplete(3, {
    shapFeatures: scenario.simulation.shapFeatures,
    finalScore: scenario.simulation.riskScore,
    verdict: scenario.simulation.verdict
  });
}

export async function callGeminiExplain(scenario, apiKey) {
  // ONE real free API call — Gemini 1.5 Flash via Google AI Studio
  const signals = scenario.simulation.signals.map(s => `"${s.phrase}" (${s.type})`).join(", ");
  const prompt = `You are a cybersecurity expert explaining a phishing attack to a regular user.

This message was flagged as: ${scenario.simulation.verdict}
Tactic used: ${scenario.simulation.tactic}
Psychological signals found: ${signals}
Risk score: ${scenario.simulation.riskScore}/100

In exactly 3 sentences, explain:
1. What manipulation tactic this attacker used against the user
2. One specific phrase in the message that reveals it is an attack
3. What the user should do RIGHT NOW

Use plain English. No jargon. Be direct and human. Max 80 words total.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 150, temperature: 0.4 }
        })
      }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? getFallbackExplanation(scenario);
  } catch {
    return getFallbackExplanation(scenario);
  }
}

function getFallbackExplanation(scenario) {
  const fallbacks = {
    FEAR: "This attacker is using fear to rush your decision — threatening account loss so you act before thinking. The phrase 'permanently suspended' is designed to trigger panic, not caution. Do not click any link; instead, open PayPal directly in a new tab by typing paypal.com yourself.",
    URGENCY: "The attacker created a false deadline to stop you from verifying the request. The word 'TODAY' in capitals is a manufactured emergency — real services give you days, not hours. Close this email and log in directly to the service's official website.",
    AUTHORITY: "This is a Business Email Compromise — someone impersonating your CEO to bypass your judgment. The instruction to 'keep it confidential' is the biggest red flag; real executives never ask employees to hide financial requests. Call your CEO directly on their known number before doing anything.",
    null: "This message appears to be legitimate. The domain is established, uses HTTPS, and contains no manipulation tactics. No action is needed."
  };
  return fallbacks[scenario.simulation.vulnType] ?? fallbacks[null];
}

const delay = ms => new Promise(r => setTimeout(r, ms));
