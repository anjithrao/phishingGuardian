const TACTIC_CONFIG = {
  FEAR:      { label: "Fear Anchor",     emoji: "😨", color: "text-red-400",    bar: "bg-red-600",    tip: "You respond quickly to account-threat messages. Always pause 10 seconds before clicking anything warning of 'suspension' or 'deletion'." },
  URGENCY:   { label: "Urgency Hijack",  emoji: "⚡", color: "text-orange-400", bar: "bg-orange-500", tip: "You're sensitive to manufactured deadlines. Real services rarely expire in under 24 hours. Time pressure in an email is almost always fake." },
  AUTHORITY: { label: "Authority Spoof", emoji: "🎭", color: "text-yellow-400", bar: "bg-yellow-500", tip: "You respect authority figures in email. Always verify executive requests by calling them directly — never by replying to the email." },
  PRIZE:     { label: "Prize Lure",      emoji: "🎁", color: "text-purple-400", bar: "bg-purple-500", tip: "Reward offers draw your attention. If you didn't enter a contest, you didn't win one." }
};

export default function VulnFingerprint({ history, onClear }) {
  const counts = history.reduce((acc, h) => {
    if (h.type) acc[h.type] = (acc[h.type] || 0) + 1;
    return acc;
  }, {});
  const topVuln = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const maxCount = Math.max(...Object.values(counts), 1);

  return (
    <div>
      <div className="text-xs text-gray-500 tracking-widest mb-3">🔬 YOUR VULNERABILITY PROFILE</div>

      {history.length === 0 ? (
        <div className="text-xs text-gray-600 text-center py-8 leading-relaxed">
          Run a scan to start<br/>building your profile
        </div>
      ) : (
        <>
          {topVuln && (
            <div className="bg-[#12121a] border border-red-900 rounded-lg p-3 mb-4">
              <div className="text-xs text-red-400 mb-1">YOUR WEAK SPOT</div>
              <div className="text-sm font-bold">
                {TACTIC_CONFIG[topVuln[0]]?.emoji} {TACTIC_CONFIG[topVuln[0]]?.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Encountered {topVuln[1]}× — attackers will target this
              </div>
            </div>
          )}

          <div className="space-y-3 mb-4">
            {Object.entries(TACTIC_CONFIG).map(([type, config]) => {
              const count = counts[type] || 0;
              return (
                <div key={type}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={config.color}>{config.emoji} {config.label}</span>
                    <span className="text-gray-500">{count}×</span>
                  </div>
                  <div className="bg-[#1e1e2e] rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${config.bar} transition-all duration-500`}
                      style={{ width: `${(count / maxCount) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-gray-500 tracking-widest mb-2">HISTORY</div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {[...history].reverse().map((h, i) => (
              <div key={i} className="bg-[#12121a] rounded p-2 text-xs">
                <div className="text-gray-300">{TACTIC_CONFIG[h.type]?.emoji} {h.tactic}</div>
                <div className="text-gray-600">{h.time} · Risk: {h.score}/100</div>
              </div>
            ))}
          </div>

          {topVuln && (
            <div className="mt-4 bg-[#0a0a14] border border-blue-900 rounded-lg p-3">
              <div className="text-xs text-blue-400 mb-1">YOUR PERSONAL TIP</div>
              <div className="text-xs text-gray-300 leading-relaxed">
                {TACTIC_CONFIG[topVuln[0]]?.tip}
              </div>
            </div>
          )}

          <button onClick={onClear} className="mt-3 w-full text-xs text-gray-600 hover:text-gray-400 py-1">
            Clear profile
          </button>
        </>
      )}
    </div>
  );
}
