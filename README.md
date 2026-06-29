# Keystone

**Authentication-as-a-Service for developers who'd rather ship than build auth from scratch.**

🚧 **Status: actively in development** — currently building out the core auth API and the homepage UI.

Keystone is a secure login system other apps can plug into instead of building their own. It handles sign-up/sign-in, two-factor authentication, and social/enterprise login (Google, SAML, OIDC) — with multi-tenant support so one Keystone instance can serve many customer apps at once.

---

## ✨ Features

- **Email/password auth** — signup, login, password reset
- **Multi-factor authentication** — TOTP, SMS/email OTP, WebAuthn/biometric
- **OAuth & SSO federation** — Google, SAML, OIDC
- **Multi-tenant workspaces** — isolate each customer's users by design
- **JWT access tokens + rotating refresh tokens** — short-lived access, long-lived rotation with revocation
- **Automatic key rotation** — JWKS signing keys rotate without downtime
- **Audit logging** — every login and account change is timestamped and exportable
- **Rate limiting** — built-in protection against credential stuffing

---

## 🏗 Architecture

![Keystone architecture diagram](./diagrams/architecture-diagram.svg)

Requests flow from client apps through an API gateway into the core services (auth, MFA, OAuth/SSO), which read and write to the data layer — a user database, a Redis-backed session store, and a key management service exposing a JWKS endpoint.

---

## 🔐 How Login Works

![Keystone login and token flow diagram](./diagrams/auth-flow-diagram.svg)

1. Client submits credentials to `/login`
2. Auth core verifies the password against its hash (Argon2id)
3. If MFA is enabled, the user completes a TOTP/OTP challenge
4. Keystone issues a short-lived JWT access token and a rotating refresh token, storing the session in Redis
5. Client receives the token pair and uses the access token on subsequent requests

---

## 🎨 Design System

The homepage UI uses a high-contrast, neobrutalist palette:

| Token | Hex | Used for |
|---|---|---|
| Black | `#000000` | Borders, hard shadows, gateway/edge surfaces |
| White | `#FFFFFF` | Primary text on dark surfaces, client-facing UI |
| Violet | `#6D28D9` | Primary accent — CTAs, core service highlights |
| Lima | `#A6E22E` | Secondary accent — live/active states, data layer |

Fonts: **Space Grotesk** (headlines) · **Plus Jakarta Sans** (body) · **JetBrains Mono** (code, stats, terminal output)

---

## 🛠 Tech Stack

**Frontend:** React, Vite, vanilla CSS
**Backend (planned):** Node.js, PostgreSQL, Redis
**Auth internals:** JWT (HS256) + opaque rotating refresh tokens, JWKS key rotation, Argon2id password hashing

---

## 📂 Project Structure

```
keystone/
├── src/
│   ├── components/
│   │   ├── RetroWindow.jsx
│   │   ├── HeroMockup.jsx
│   │   ├── CodePreview.jsx
│   │   ├── PricingCard.jsx
│   │   └── Panel.jsx
│   ├── assets/
│   │   └── Shapes.jsx
│   ├── App.jsx
│   └── index.css
├── diagrams/
│   ├── architecture-diagram.svg
│   └── auth-flow-diagram.svg
└── index.html
```

---

## 🚧 Roadmap

- [x] Homepage UI design & implementation plan
- [ ] Core auth API (signup, login, token issuance)
- [ ] MFA service
- [ ] OAuth/SSO connectors
- [ ] Admin dashboard
- [ ] Audit log export

---

## 🚀 Getting Started

```bash
git clone https://github.com/<your-username>/keystone.git
cd keystone
npm install
npm run dev
```

---




<svg width="680" height="440" viewBox="0 0 680 440" xmlns="http://www.w3.org/2000/svg" role="img">
<title>Keystone high-level architecture</title>
<desc>Clients connect through an API gateway to core auth services (auth core, MFA, OAuth/SSO), which read and write to a data layer of user database, session store, and key management.</desc>
<style>
  text { font-family: Arial, Helvetica, sans-serif; }
  .title { font-size: 14px; font-weight: 700; }
  .subtitle { font-size: 11px; }
  .legend-text { font-size: 11px; fill: #000000; }
  .arrow { stroke: #000000; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
</style>
<defs>
  <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M1 1L9 5L1 9" fill="none" stroke="#000000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>

<rect width="680" height="440" fill="#FFFFFF"/>

<!-- Arrows: clients -> gateway -->
<path class="arrow" d="M160,74 L340,124"/>
<path class="arrow" d="M340,74 L340,124"/>
<path class="arrow" d="M520,74 L340,124"/>

<!-- Arrows: gateway -> core services -->
<path class="arrow" d="M340,180 L140,230"/>
<path class="arrow" d="M340,180 L340,230"/>
<path class="arrow" d="M340,180 L540,230"/>

<!-- Arrows: auth core -> data layer -->
<path class="arrow" d="M140,286 L140,336"/>
<path class="arrow" d="M140,286 L340,336"/>
<path class="arrow" d="M140,286 L540,336"/>

<!-- Tier 1: Clients (white) -->
<g>
  <rect x="84" y="34" width="160" height="44" rx="6" fill="#000000"/>
  <rect x="80" y="30" width="160" height="44" rx="6" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <text class="title" x="160" y="56" text-anchor="middle" fill="#000000">Web App</text>
</g>
<g>
  <rect x="264" y="34" width="160" height="44" rx="6" fill="#000000"/>
  <rect x="260" y="30" width="160" height="44" rx="6" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <text class="title" x="340" y="56" text-anchor="middle" fill="#000000">Mobile App</text>
</g>
<g>
  <rect x="444" y="34" width="160" height="44" rx="6" fill="#000000"/>
  <rect x="440" y="30" width="160" height="44" rx="6" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <text class="title" x="520" y="56" text-anchor="middle" fill="#000000">Partner API</text>
</g>

<!-- Tier 2: Gateway (black) -->
<g>
  <rect x="234" y="128" width="220" height="56" rx="8" fill="#6D28D9"/>
  <rect x="230" y="124" width="220" height="56" rx="8" fill="#000000" stroke="#000000" stroke-width="3"/>
  <text class="title" x="340" y="148" text-anchor="middle" fill="#FFFFFF">API Gateway</text>
  <text class="subtitle" x="340" y="166" text-anchor="middle" fill="#FFFFFF">Routing &amp; rate limiting</text>
</g>

<!-- Tier 3: Core services (violet) -->
<g>
  <rect x="54" y="234" width="180" height="56" rx="8" fill="#000000"/>
  <rect x="50" y="230" width="180" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="140" y="254" text-anchor="middle" fill="#FFFFFF">Auth Core</text>
  <text class="subtitle" x="140" y="272" text-anchor="middle" fill="#FFFFFF">Signup, login, tokens</text>
</g>
<g>
  <rect x="254" y="234" width="180" height="56" rx="8" fill="#000000"/>
  <rect x="250" y="230" width="180" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="340" y="254" text-anchor="middle" fill="#FFFFFF">MFA Service</text>
  <text class="subtitle" x="340" y="272" text-anchor="middle" fill="#FFFFFF">OTP, TOTP, biometric</text>
</g>
<g>
  <rect x="454" y="234" width="180" height="56" rx="8" fill="#000000"/>
  <rect x="450" y="230" width="180" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="540" y="254" text-anchor="middle" fill="#FFFFFF">OAuth / SSO</text>
  <text class="subtitle" x="540" y="272" text-anchor="middle" fill="#FFFFFF">Google, SAML, OIDC</text>
</g>

<!-- Tier 4: Data layer (lima) -->
<g>
  <rect x="54" y="340" width="180" height="56" rx="8" fill="#000000"/>
  <rect x="50" y="336" width="180" height="56" rx="8" fill="#A6E22E" stroke="#000000" stroke-width="3"/>
  <text class="title" x="140" y="360" text-anchor="middle" fill="#000000">User DB</text>
  <text class="subtitle" x="140" y="378" text-anchor="middle" fill="#000000">Users, tenants, roles</text>
</g>
<g>
  <rect x="254" y="340" width="180" height="56" rx="8" fill="#000000"/>
  <rect x="250" y="336" width="180" height="56" rx="8" fill="#A6E22E" stroke="#000000" stroke-width="3"/>
  <text class="title" x="340" y="360" text-anchor="middle" fill="#000000">Session Store</text>
  <text class="subtitle" x="340" y="378" text-anchor="middle" fill="#000000">Redis, refresh tokens</text>
</g>
<g>
  <rect x="454" y="340" width="180" height="56" rx="8" fill="#000000"/>
  <rect x="450" y="336" width="180" height="56" rx="8" fill="#A6E22E" stroke="#000000" stroke-width="3"/>
  <text class="title" x="540" y="360" text-anchor="middle" fill="#000000">Key Management</text>
  <text class="subtitle" x="540" y="378" text-anchor="middle" fill="#000000">JWKS, signing keys</text>
</g>

<!-- Legend -->
<g>
  <rect x="60" y="412" width="14" height="14" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  <text class="legend-text" x="80" y="423">Client surface</text>
  <rect x="210" y="412" width="14" height="14" fill="#000000" stroke="#000000" stroke-width="2"/>
  <text class="legend-text" x="230" y="423">Edge / gateway</text>
  <rect x="370" y="412" width="14" height="14" fill="#6D28D9" stroke="#000000" stroke-width="2"/>
  <text class="legend-text" x="390" y="423">Core services</text>
  <rect x="520" y="412" width="14" height="14" fill="#A6E22E" stroke="#000000" stroke-width="2"/>
  <text class="legend-text" x="540" y="423">Data layer</text>
</g>
</svg>
## 📄 License

MIT — update this once you've decided on a license for the repo.
