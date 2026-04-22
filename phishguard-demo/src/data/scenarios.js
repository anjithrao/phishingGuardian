export const SCENARIOS = [
  {
    id: "paypal",
    label: "💳 PayPal Suspension",
    subject: "Urgent: Your PayPal account will be suspended in 24 hours",
    body: `Dear Customer,

We have detected unusual activity on your PayPal account. Your account will be permanently suspended within 24 HOURS unless you verify your identity immediately.

Click here to verify now: http://paypa1-secure-verify.xyz/login

Failure to act will result in permanent loss of access and funds.

PayPal Security Team`,
    url: "http://paypa1-secure-verify.xyz/login",
    simulation: {
      riskScore: 94,
      verdict: "PHISHING",
      tactic: "FEAR ANCHOR",
      tacticEmoji: "😨",
      confidence: 97,
      urlFeatures: {
        hasIP: false, hasAt: false, urlLength: 42, urlDepth: 2,
        usesHTTP: true, hasTinyURL: false, hasDash: true,
        domainAge: "2 days old", domainEntropy: 4.21
      },
      signals: [
        { phrase: "24 HOURS", type: "URGENCY", weight: 0.91 },
        { phrase: "permanently suspended", type: "FEAR", weight: 0.88 },
        { phrase: "immediate", type: "URGENCY", weight: 0.74 },
        { phrase: "loss of access and funds", type: "FEAR", weight: 0.82 }
      ],
      shapFeatures: [
        { name: "Domain registered 2 days ago", value: 0.34, bar: 85 },
        { name: "HTTP not HTTPS", value: 0.28, bar: 70 },
        { name: "URL uses digit-substitution (paypa1)", value: 0.22, bar: 55 },
        { name: "Urgency keyword density: HIGH", value: 0.18, bar: 45 },
        { name: "No DMARC record on sender domain", value: 0.14, bar: 35 }
      ],
      impersonatedBrand: "PayPal",
      safeDomain: "https://www.paypal.com",
      crisisSteps: [
        { icon: "🔐", title: "Change your PayPal password NOW", link: "https://www.paypal.com/authflow/password-reset" },
        { icon: "📧", title: "Change your email password if it's the same", link: null },
        { icon: "💳", title: "Check PayPal for unauthorized transactions", link: "https://www.paypal.com/activity/payment" },
        { icon: "📵", title: "Enable 2-factor authentication", link: "https://www.paypal.com/myaccount/security" },
        { icon: "🚨", title: "Report to PhishTank", link: "https://www.phishtank.com/add_web_phish.php" }
      ],
      vulnType: "FEAR"
    }
  },
  {
    id: "netflix",
    label: "🎬 Netflix Payment Failed",
    subject: "Action required: Update your Netflix payment method",
    body: `Hi there,

We were unable to process your payment for Netflix. Your subscription will be cancelled TODAY unless you update your billing information.

Update payment: http://netflix-billing-update.net/card

Your watchlist and account history will be deleted permanently.

Netflix Billing Team`,
    url: "http://netflix-billing-update.net/card",
    simulation: {
      riskScore: 89,
      verdict: "PHISHING",
      tactic: "URGENCY HIJACK",
      tacticEmoji: "⚡",
      confidence: 93,
      urlFeatures: {
        hasIP: false, hasAt: false, urlLength: 38, urlDepth: 2,
        usesHTTP: true, hasTinyURL: false, hasDash: true,
        domainAge: "11 days old", domainEntropy: 3.87
      },
      signals: [
        { phrase: "TODAY", type: "URGENCY", weight: 0.87 },
        { phrase: "cancelled", type: "FEAR", weight: 0.79 },
        { phrase: "deleted permanently", type: "FEAR", weight: 0.84 },
        { phrase: "Update payment", type: "CREDENTIAL_HARVEST", weight: 0.91 }
      ],
      shapFeatures: [
        { name: "Credential harvesting language", value: 0.38, bar: 95 },
        { name: "Domain is not netflix.com", value: 0.31, bar: 77 },
        { name: "Domain registered 11 days ago", value: 0.24, bar: 60 },
        { name: "HTTP not HTTPS", value: 0.19, bar: 47 },
        { name: "Permanent deletion threat", value: 0.16, bar: 40 }
      ],
      impersonatedBrand: "Netflix",
      safeDomain: "https://www.netflix.com/youraccount",
      crisisSteps: [
        { icon: "🔐", title: "Change your Netflix password immediately", link: "https://www.netflix.com/password" },
        { icon: "💳", title: "Contact your bank if card details were entered", link: null },
        { icon: "📧", title: "Check for suspicious login activity", link: "https://www.netflix.com/youraccount" },
        { icon: "🔄", title: "Revoke all active Netflix sessions", link: "https://www.netflix.com/youraccount" },
        { icon: "🚨", title: "Report to PhishTank", link: "https://www.phishtank.com/add_web_phish.php" }
      ],
      vulnType: "URGENCY"
    }
  },
  {
    id: "boss",
    label: "👔 CEO Wire Transfer (BEC)",
    subject: "Confidential — need your help urgently",
    body: `Hi,

I'm currently in a board meeting and can't talk. I need you to process a wire transfer of $12,500 to a new vendor immediately. This is time-sensitive and confidential — please don't discuss with anyone else.

Use this account:
Bank: First National
Account: 8834-2291-0045
Routing: 021000021

I'll explain everything when I'm out. Please confirm when done.

Thanks,
David Chen
CEO`,
    url: null,
    simulation: {
      riskScore: 91,
      verdict: "PHISHING",
      tactic: "AUTHORITY SPOOF",
      tacticEmoji: "🎭",
      confidence: 88,
      urlFeatures: null,
      signals: [
        { phrase: "can't talk", type: "ISOLATION", weight: 0.88 },
        { phrase: "confidential — don't discuss", type: "ISOLATION", weight: 0.93 },
        { phrase: "immediately", type: "URGENCY", weight: 0.77 },
        { phrase: "wire transfer", type: "FINANCIAL", weight: 0.95 }
      ],
      shapFeatures: [
        { name: "Financial transfer request via email", value: 0.42, bar: 100 },
        { name: "Secrecy / isolation instruction", value: 0.35, bar: 87 },
        { name: "Urgency + CEO impersonation combo", value: 0.28, bar: 70 },
        { name: "No links — pure social engineering", value: 0.21, bar: 52 },
        { name: "Out-of-office excuse pattern", value: 0.17, bar: 42 }
      ],
      impersonatedBrand: null,
      safeDomain: null,
      crisisSteps: [
        { icon: "📞", title: "Call the CEO directly on their known number", link: null },
        { icon: "🚫", title: "Do NOT initiate any wire transfer", link: null },
        { icon: "📋", title: "Forward email to your IT / security team", link: null },
        { icon: "🏦", title: "If transfer was made, call your bank immediately", link: null },
        { icon: "🚨", title: "Report to FBI IC3", link: "https://www.ic3.gov" }
      ],
      vulnType: "AUTHORITY"
    }
  },
  {
    id: "safe",
    label: "✅ Legitimate GitHub Alert",
    subject: "New sign-in to your GitHub account",
    body: `Hi username,

A new sign-in to your GitHub account was detected.

Time: April 22, 2026 at 10:34 AM UTC
Location: Hyderabad, India
Device: Chrome on Windows

If this was you, no action is needed.

If you don't recognize this sign-in, secure your account:
https://github.com/settings/security

The GitHub Team`,
    url: "https://github.com/settings/security",
    simulation: {
      riskScore: 4,
      verdict: "SAFE",
      tactic: null,
      tacticEmoji: "✅",
      confidence: 96,
      urlFeatures: {
        hasIP: false, hasAt: false, urlLength: 34, urlDepth: 3,
        usesHTTP: false, hasTinyURL: false, hasDash: false,
        domainAge: "26 years old", domainEntropy: 2.14
      },
      signals: [],
      shapFeatures: [
        { name: "Official github.com domain", value: -0.41, bar: 90, safe: true },
        { name: "HTTPS with valid certificate", value: -0.29, bar: 72, safe: true },
        { name: "Domain age: 26 years", value: -0.22, bar: 55, safe: true },
        { name: "No urgency keywords detected", value: -0.18, bar: 45, safe: true },
        { name: "Sender matches legitimate GitHub headers", value: -0.14, bar: 35, safe: true }
      ],
      impersonatedBrand: null,
      safeDomain: null,
      crisisSteps: [],
      vulnType: null
    }
  }
];
