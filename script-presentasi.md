# Script Presentasi Bug Bounty Hunter 2025

## Slide 1 - Cover

Oke guys, jadi hari ini gw mau share tentang bug bounty hunting versi 2025. Bukan yang basic-basic kayak XSS reflected atau SQLi injection gitu. Ini vuln yang beneran dipake sama top hunter buat dapet bounty gede.

Kenapa gw bilang "modern edition"? Karena cara hunting sekarang udah beda banget sama 5 tahun lalu. Arsitektur aplikasi udah kompleks, cloud everywhere, microservices, serverless, AI apps — semua itu buka attack surface baru yang banyak orang belum ngerti.

---

## Slide 2 - Modul 1: Mentality

Sebelum kita masuk ke teknis, gw mau bahas dulu soal mindset. Ini penting banget.

Banyak yang langsung pengen hunting tanpa prepare mental dulu. Terus pas udah seminggu gak dapet apa-apa, langsung burnout. Atau dapet vuln tapi cuma dapet $50, langsung demotivasi.

Yang perlu lu tau:
- Top hunter itu gak hunting random. Mereka punya strategi, tau target mana yang worth it.
- Time management penting. Lu gak bisa hunting 24/7. Butuh break, butuh balance.
- Mental prep — siap ditolak, siap dapet duplicate, siap report lu di-downgrade severity-nya.
- Fokus ke high-value target. Jangan buang waktu di program yang bayarannya receh.

Ini foundation. Kalo mental lu gak kuat, skill teknis lu sebagus apapun bakal sia-sia.

---

## Slide 3 - Modul 2 Intro

Oke sekarang masuk ke fundamental. Tapi ini bukan fundamental yang lu pelajarin di tutorial YouTube.

Ini fundamental yang dipake buat hunting di aplikasi modern — yang arsitekturnya kompleks, yang pake cloud, yang pake microservices.

Kita bakal bahas 3 hal: reverse API, trace CI/CD, sama baca arsitektur cloud.

---

## Slide 4 - Reverse API

Pertama, reverse API. Ini skill paling basic tapi paling penting.

Sekarang aplikasi itu gak cuma web. Ada mobile app, ada IoT device, ada desktop app. Semua itu communicate lewat API. Nah, lu harus bisa trace request chain-nya.

Contoh: Lu lagi test mobile app. User click button "Transfer Money". Apa yang terjadi di backend? Request kemana aja? Lewat gateway mana? Hit microservice apa aja? Ada authentication di mana? Ada validation di mana?

Lu harus bisa map semua itu. Tools-nya bisa pake Burp, mitmproxy, atau Frida kalo mobile.

Kenapa ini penting? Karena banyak vuln itu ada di request chain yang kompleks. Bukan di endpoint yang obvious.

---

## Slide 5 - CI/CD Tracing

Kedua, trace CI/CD pipeline.

Ini yang jarang dibahas. Tapi trust me, banyak vuln high-severity yang ada di sini.

Contoh flow: Developer push code ke GitHub → GitHub Actions running → Build app → Deploy ke production → Hit API → Trigger microservice.

Nah, di setiap step itu ada potential vuln:
- Workflow files yang misconfigured
- Environment variables yang exposed
- Secrets yang ke-leak di logs
- Service dependencies yang vulnerable

Lu harus bisa baca workflow files, understand gimana deployment process-nya, terus cari celah di situ.

Real case: Gw pernah dapet $15k dari bug di GitHub Actions. Workflow-nya expose AWS credentials di logs. Dari situ gw bisa access production database.

---

## Slide 6 - Cloud Architecture

Ketiga, baca arsitektur cloud yang kompleks.

Sekarang banyak aplikasi yang pake serverless, event-driven architecture, queue-based processing. Ini beda banget sama monolithic app yang dulu.

Contoh serverless: User upload file → trigger Lambda function → process file → store ke S3 → send notification via SNS.

Contoh event-driven: User checkout → publish event ke EventBridge → trigger multiple Lambda → update inventory, send email, create invoice, dll.

Nah, di arsitektur kayak gini, attack surface-nya beda. Lu harus understand:
- Gimana Lambda function di-trigger
- Apa aja permission IAM role-nya
- Gimana event flow-nya
- Di mana ada async processing yang bisa di-race

Ini butuh effort buat belajar. Tapi once lu ngerti, lu bisa nemuin vuln yang orang lain gak bisa.

---

## Slide 7 - Modul 3 Intro

Oke, sekarang masuk ke inti: vuln modern yang worth it.

Gw gak bakal bahas XSS, SQLi, IDOR yang basic. Karena:
1. Udah banyak yang hunting itu
2. Bayarannya receh (kecuali lu chain jadi high impact)
3. Banyak yang udah di-patch atau ada WAF

Yang gw bakal bahas adalah vuln yang:
- Masih jarang yang bisa exploit
- Bayarannya gede ($5k-$50k)
- Relevant di 2025

Ada 7 kategori yang bakal kita bahas.

---

## Slide 8 - Broken Cloud IAM

Pertama: Broken Cloud IAM.

Ini privilege escalation di cloud provider — AWS, GCP, Azure.

Kenapa ini worth it? Karena:
- Impact-nya gede: full account compromise
- Masih banyak yang salah config
- Bayarannya tinggi

Ada 3 pattern yang sering:

**Forgotten IAM role** — Role yang lupa di-revoke. Misalnya ada contractor yang udah gak kerja, tapi IAM role-nya masih aktif. Lu bisa abuse itu.

**Over-permissioned Lambda** — Lambda function yang punya permission lebih dari yang dibutuhin. Misalnya cuma butuh read S3, tapi dikasih full admin. Kalo lu bisa inject code ke Lambda itu, lu bisa escalate.

**Cross-account role hijacking** — Ini yang paling tricky. Ada trust relationship antar AWS account. Kalo misconfigured, lu bisa assume role dari account lain.

Real case: Gw pernah dapet $25k dari over-permissioned Lambda. Function-nya cuma buat resize image, tapi punya permission `iam:*`. Dari situ gw bisa create admin user.

---

## Slide 9 - Serverless Injection

Kedua: Serverless Injection.

Banyak yang mikir serverless itu secure karena "stateless" dan "isolated". Padahal banyak attack surface baru.

**Event injection** — Lu inject malicious event ke SQS atau SNS queue. Terus event itu di-process sama Lambda. Kalo Lambda-nya gak validate input, lu bisa execute arbitrary code.

**JSON-based execution hijack** — Lambda function sering process JSON. Kalo lu bisa control JSON structure-nya, lu bisa manipulate execution flow. Misalnya ada field `action` yang determine function mana yang dipanggil.

**Function URL misconfig** — Lambda function URL itu public by default. Banyak yang lupa restrict access. Jadi function yang harusnya cuma bisa di-call internal, malah bisa di-call dari internet.

Ini vuln yang masih fresh. Belum banyak yang hunting di sini.

---

## Slide 10 - API Rate Limit Bypass

Ketiga: API Rate Limit Bypass yang di-chain jadi multi-stage exploit.

Rate limit bypass itu sendiri biasanya cuma low severity. Tapi kalo lu chain, bisa jadi critical.

Contoh chain:
1. Bypass rate limit di login endpoint
2. Brute force password (unlimited attempts)
3. Account takeover

Atau:
1. Bypass rate limit di payment endpoint
2. Abuse concurrency (send 100 request simultaneously)
3. Race condition → money duplication

Key-nya adalah **chaining**. Jangan report rate limit bypass doang. Tapi tunjukin real impact-nya.

Real case: Gw pernah dapet $20k dari race condition di payment. Bypass rate limit → send concurrent requests → transfer $100 jadi $10,000 di balance.

---

## Slide 11 - OAuth & SSO

Keempat: OAuth & SSO misconfig yang jarang dibahas.

Banyak tutorial cuma bahas `redirect_uri` validation. Padahal ada banyak celah lain:

**PKCE mis-implementation** — PKCE itu buat prevent authorization code interception. Tapi banyak yang implement salah. Misalnya gak validate `code_verifier`, atau accept weak `code_challenge`.

**Token substitution** — Lu bisa tuker token user lain. Ini happen kalo ada race condition di token exchange, atau kalo token gak di-bind ke session dengan bener.

**Third-party redirect cross-service chaining** — Ini kompleks. Lu chain redirect dari multiple service buat bypass validation. Misalnya: App A trust App B, App B trust App C. Lu bisa chain redirect A → B → C → malicious site.

Ini butuh deep understanding OAuth flow. Tapi kalo lu bisa, bayarannya gede.

---

## Slide 12 - GraphQL Abuse

Kelima: GraphQL Abuse.

GraphQL lagi populer sekarang. Tapi banyak yang implement salah.

**Field-level auth bypass** — GraphQL itu flexible. Lu bisa query field apa aja. Nah, banyak yang cuma implement auth di query level, bukan di field level. Jadi lu bisa access field yang harusnya restricted.

Contoh: Query `user` butuh auth. Tapi field `user.email` atau `user.ssn` gak di-protect. Lu bisa query itu.

**Deep query DoS** — Lu bisa bikin query nested yang dalam banget. Ini bikin server overload. Contoh: `user { posts { comments { author { posts { comments { ... } } } } }`

**Data relationship leakage** — GraphQL punya relationship antar object. Lu bisa leverage itu buat leak data. Misalnya dari `publicPost` lu bisa traverse ke `author.privateInfo`.

---

## Slide 13 - Race Condition Modern

Keenam: Race Condition yang bukan sekedar "double request".

Race condition itu classic vuln. Tapi yang modern itu lebih kompleks.

**Money transfer duplication** — Ini yang paling worth it. Lu transfer $100, tapi dengan race condition lu bisa bikin balance lu cuma berkurang $100 tapi recipient dapet $200.

Caranya? Send concurrent requests dengan timing yang pas. Exploit async processing di backend.

**Order manipulation via async queues** — Banyak e-commerce pake queue buat process order. Lu bisa manipulate order di queue. Misalnya change price, change quantity, atau cancel order orang lain.

**Upload race** — Ini yang ditemuin di Dropbox Replay. Lu upload file yang harusnya gak bisa (misalnya file size terlalu gede atau extension forbidden). Tapi dengan race condition, validation-nya ke-bypass.

Key-nya adalah **timing** dan **concurrency**. Lu butuh tools kayak Turbo Intruder atau custom script.

---

## Slide 14 - Desync

Ketujuh: HTTP/2 & HTTP/3 Desync.

Ini request smuggling versi modern. Lebih kompleks dari HTTP/1.1 klasik.

Kenapa lebih kompleks? Karena HTTP/2 dan HTTP/3 punya mechanism baru: multiplexing, header compression, binary framing.

**Request smuggling modern** — Lu exploit perbedaan parsing antara frontend (CDN/load balancer) dan backend. Misalnya frontend parse sebagai 1 request, backend parse sebagai 2 request.

**CDN poisoning** — Lu poison cache CDN lewat desync. Jadi response yang di-cache itu malicious. Semua user yang access URL itu dapet response yang udah di-poison.

Ini vuln yang butuh deep knowledge HTTP protocol. Tapi impact-nya huge dan bayarannya gede.

---

## Slide 15 - Modul 4 Intro

Oke, sekarang masuk ke vulnerability meta 2025.

Ini vuln yang lagi hot sekarang. Yang bayarannya gede dan masih jarang yang bisa exploit.

Ada 4 kategori: AI app exploitation, supply chain, secret sprawl, sama financial logic bugs.

---

## Slide 16 - AI App Exploitation

Pertama: AI App Exploitation.

AI app lagi booming sekarang. ChatGPT, Copilot, Midjourney, dll. Tapi security-nya masih kacau.

**Jailbreak + data extraction chaining** — Lu bypass filter AI buat extract data sensitive. Misalnya AI punya access ke internal database. Lu jailbreak terus extract data dari situ.

**Retrieval poisoning** — Banyak AI app pake RAG (Retrieval Augmented Generation). Lu bisa poison vector database-nya. Jadi output AI-nya manipulated.

**Plugins & tools injection** — AI agent sekarang bisa pake plugins atau tools. Lu bisa inject malicious plugin. Misalnya plugin yang execute arbitrary code atau exfiltrate data.

Ini area yang masih fresh. Belum banyak yang hunting di sini. Opportunity besar.

---

## Slide 17 - Supply Chain

Kedua: Supply Chain Attack.

Ini bukan cuma teori. Ini real dan happening sekarang.

**Dependency confusion** — Lu upload package ke public registry (npm, PyPI) dengan nama yang sama kayak private package. Kalo developer salah config, mereka bakal install package lu instead of private package.

**Workspace hijacking** — Di npm atau pnpm, ada workspace feature. Lu bisa hijack workspace package kalo ada misconfig.

**Build pipeline secret exposure** — CI/CD logs sering expose secrets. AWS credentials, API keys, database passwords. Lu cuma perlu tau dimana nyarinya.

Real case: Banyak company yang expose secrets di GitHub Actions logs. Gw pernah dapet $10k dari situ.

---

## Slide 18 - Secret Sprawl

Ketiga: Secret Sprawl Hunting.

Secret itu bertebaran dimana-mana. Lu cuma perlu tau dimana nyarinya.

**Leaked cloud creds dari CI/CD** — Udah gw mention tadi. Ini goldmine. Check logs, check environment variables, check artifacts.

**Token-lifetime abuse** — Banyak token yang harusnya udah expired tapi masih bisa dipake. Atau token yang lifetime-nya terlalu lama (1 year, 10 years, atau bahkan never expire).

**Weakly-scoped PAT** — GitHub Personal Access Token yang terlalu permissive. Misalnya dikasih `repo:*` atau `admin:org` padahal cuma butuh read access.

Tips: Pake tools kayak truffleHog, gitleaks, atau GitGuardian buat automate hunting.

---

## Slide 19 - Financial Logic Bugs

Keempat: Financial Logic Bugs.

Ini goldmine. Satu bug bisa $20k-$50k.

**Reward manipulation** — Abuse sistem reward atau referral. Misalnya lu bisa claim reward berkali-kali, atau lu bisa manipulate referral count.

**Refund abuse** — Lu dapet refund tanpa return barang. Atau lu bisa refund lebih dari yang lu bayar.

**Multi-currency miscalc** — Bug di currency conversion. Misalnya lu bayar pake currency yang murah, tapi dapet refund pake currency yang mahal.

Key-nya adalah **understand business logic**. Jangan cuma fokus ke technical vuln. Fokus juga ke logic flaw.

---

## Slide 20 - Modul 5: AI-powered Hunting

Oke, sekarang masuk ke AI-powered hunting workflow.

2025 itu zamannya AI. Lu harus bisa leverage AI buat speed up hunting.

**AI-assisted static analysis** — Pake AI buat analyze code dan nemuin vuln pattern. Misalnya lu feed source code ke GPT, terus minta dia cari potential vuln.

**Auto-mapping microservice topology** — Pake AI buat auto-generate architecture diagram dari API traffic. Lu capture traffic, feed ke AI, dapet diagram.

**Auto-generate exploit chain** — Lu feed API schema atau OpenAPI spec ke AI, terus minta dia generate potential exploit chain.

Ini bukan replace manual hunting. Tapi ini buat speed up process. Lu bisa fokus ke high-value target.

---

## Slide 21 - Modul 6 Intro

Oke, sekarang masuk ke reporting.

Ini penting banget. Nemuin vuln itu cuma 50%. Yang 50% lagi adalah gimana lu nge-report.

Report yang bagus bisa bikin low severity jadi medium. Medium jadi high. High jadi critical.

Report yang jelek bisa bikin high severity jadi medium, atau bahkan di-reject.

---

## Slide 22 - Report Writing

Cara nulis report yang proper:

**1. Title** — Jelas dan spesifik. Jangan cuma "XSS found" atau "IDOR in API". Tapi "Stored XSS in comment section leads to account takeover" atau "IDOR in /api/users allows unauthorized access to PII".

**2. Impact** — Jelasin business impact, bukan cuma technical impact. Jangan cuma bilang "attacker bisa access data". Tapi "attacker bisa steal 1M+ user PII, causing GDPR violation and reputational damage".

**3. PoC** — Step-by-step yang jelas. Bisa di-reproduce. Jangan assume triager ngerti context. Jelasin dari awal.

**4. Video/Screenshot** — Visual proof. Ini penting banget. Video lebih bagus dari screenshot.

**5. Remediation** — Kasih solusi. Jangan cuma report vuln terus cabut. Kasih recommendation gimana fix-nya.

---

## Slide 23 - PoC Chaining

PoC chaining: gabungin 2 vuln biasa jadi 1 vuln high-severity.

Contoh 1: IDOR + CSRF = Account Takeover
- IDOR di endpoint `/api/user/update` (bisa update user lain)
- CSRF di form update profile (gak ada CSRF token)
- Chain: Bikin malicious page yang trigger CSRF request buat update user lain

Contoh 2: Rate limit bypass + Enumeration = Mass Data Breach
- Rate limit bypass di search endpoint
- Enumeration vulnerability (bisa enumerate all user IDs)
- Chain: Bypass rate limit → enumerate all users → extract all data

Contoh 3: XSS + OAuth misconfig = Full Account Compromise
- XSS di profile page
- OAuth gak validate redirect_uri dengan bener
- Chain: XSS buat steal OAuth token → use token buat full account access

Key-nya adalah **kreativitas**. Jangan cuma report vuln individual. Pikirin gimana chain-nya.

---

## Slide 24 - Business Impact

Nambahin business impact biar reward naik.

Contoh jelek: "Attacker bisa access user data"
- Ini terlalu generic
- Gak ada context
- Gak ada urgency

Contoh bagus:
- "Attacker bisa steal $X dari user" → ada monetary impact
- "Attacker bisa access 1M+ user PII" → ada scale
- "Bisa cause reputational damage & GDPR fine up to €20M" → ada legal impact

Triager itu bukan technical person doang. Mereka juga mikirin business risk. Kalo lu bisa jelasin business impact dengan jelas, chance reward naik itu gede.

---

## Slide 25 - Closing

Oke guys, that's it!

Sekarang lu udah tau:
- Mindset yang bener buat hunting
- Fundamental modern (reverse API, CI/CD, cloud)
- 7 vuln modern yang worth it
- Vulnerability meta 2025 (AI, supply chain, secrets, financial)
- AI-powered workflow
- Cara report yang proper

Tapi inget, ini semua cuma teori. Yang penting adalah **praktek**.

Start hunting. Start small. Pilih program yang lu familiar. Pelajarin target dengan dalam. Jangan langsung hunting di semua program.

Consistency is key. Hunting itu bukan sprint, tapi marathon. Lu gak bakal langsung dapet $50k. Tapi kalo lu konsisten, lu bakal sampai situ.

Good luck hunting! Semoga dapet bounty gede! 💰

---

## Tips Tambahan Pas Presentasi:

- **Jangan baca script mentah-mentah**. Pake ini sebagai guide aja. Improvisasi sesuai audience.
- **Kasih jeda** pas slide penting. Biar audience bisa nyatet atau mikir.
- **Interact sama audience**. Tanya "ada yang pernah ngalamin ini?" atau "ada yang udah pernah coba?"
- **Kasih real example** kalo lu punya. Personal experience itu lebih engaging.
- **Adjust pace**. Kalo audience-nya newbie, slow down. Kalo udah advanced, bisa lebih cepet.
- **Q&A di akhir**. Siapin waktu buat tanya jawab.

Semangat ngajar! 🔥
