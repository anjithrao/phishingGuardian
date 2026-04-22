# Speaker 2: The Core Tech & 3-Stage Pipeline

**Time:** ~45 seconds

## Script / Talking Points

**[Action: Click 'SCAN WITH PHISHGUARD']**
"When we run the scan, PhishGuard executes a deterministic 3-stage pipeline."

**[Stage 1: URL & Domain]**
"First, it analyzes the URL and domain headers. Even if the domain looks safe at a glance, PhishGuard checks the underlying data—like detecting that this domain is only 2 days old and using an unencrypted HTTP connection."

**[Stage 2: NLP Behavioral Analysis]**
"Second, it performs an NLP behavioral scan. It’s looking for psychological signals. Notice how it flags the words '24 HOURS' as Urgency, and 'permanently suspended' as Fear. It maps the emotional intent of the email."

**[Stage 3: XAI Feature Attribution]**
"Finally, it uses SHAP—Explainable AI feature attribution. It calculates exactly *why* this email is dangerous and assigns a final risk score. Here, it scores a critical 94/100."

**[Hand-off]**
"But numbers alone don't stop people from panicking. [Speaker 3] will show how we break the psychological loop."
