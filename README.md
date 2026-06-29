<svg width="680" height="560" viewBox="0 0 680 560" xmlns="http://www.w3.org/2000/svg" role="img">
<title>Keystone login and token issuance flow</title>
<desc>Five steps: client sends credentials, auth core verifies the password against the user database, an MFA check runs if enabled, tokens are issued and the session is stored in Redis, and the client receives the token pair back.</desc>
<style>
  text { font-family: Arial, Helvetica, sans-serif; }
  .title { font-size: 14px; font-weight: 700; }
  .subtitle { font-size: 11px; }
  .legend-text { font-size: 11px; fill: #000000; }
  .arrow { stroke: #000000; stroke-width: 2; fill: none; marker-end: url(#arrowhead2); }
</style>
<defs>
  <marker id="arrowhead2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M1 1L9 5L1 9" fill="none" stroke="#000000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>

<rect width="680" height="560" fill="#FFFFFF"/>

<path class="arrow" d="M240,96 L240,140"/>
<path class="arrow" d="M240,196 L240,240"/>
<path class="arrow" d="M240,296 L240,340"/>
<path class="arrow" d="M240,396 L240,440"/>
<path class="arrow" d="M400,168 L460,168"/>
<path class="arrow" d="M400,368 L460,368"/>

<g>
  <rect x="84" y="44" width="320" height="56" rx="8" fill="#000000"/>
  <rect x="80" y="40" width="320" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="240" y="62" text-anchor="middle" fill="#FFFFFF">1. Client sends credentials</text>
  <text class="subtitle" x="240" y="80" text-anchor="middle" fill="#FFFFFF">POST /login — email, password</text>
</g>

<g>
  <rect x="84" y="144" width="320" height="56" rx="8" fill="#000000"/>
  <rect x="80" y="140" width="320" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="240" y="162" text-anchor="middle" fill="#FFFFFF">2. Auth core verifies password</text>
  <text class="subtitle" x="240" y="180" text-anchor="middle" fill="#FFFFFF">Compare hash via bcrypt/argon2</text>
</g>

<g>
  <rect x="84" y="244" width="320" height="56" rx="8" fill="#000000"/>
  <rect x="80" y="240" width="320" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="240" y="262" text-anchor="middle" fill="#FFFFFF">3. MFA check, if enabled</text>
  <text class="subtitle" x="240" y="280" text-anchor="middle" fill="#FFFFFF">Verify TOTP or OTP code</text>
</g>

<g>
  <rect x="84" y="344" width="320" height="56" rx="8" fill="#000000"/>
  <rect x="80" y="340" width="320" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="240" y="362" text-anchor="middle" fill="#FFFFFF">4. Issue tokens, store session</text>
  <text class="subtitle" x="240" y="380" text-anchor="middle" fill="#FFFFFF">Access token + refresh token</text>
</g>

<g>
  <rect x="84" y="444" width="320" height="56" rx="8" fill="#000000"/>
  <rect x="80" y="440" width="320" height="56" rx="8" fill="#6D28D9" stroke="#000000" stroke-width="3"/>
  <text class="title" x="240" y="462" text-anchor="middle" fill="#FFFFFF">5. Client receives tokens</text>
  <text class="subtitle" x="240" y="480" text-anchor="middle" fill="#FFFFFF">200 OK with token pair</text>
</g>

<g>
  <rect x="464" y="150" width="160" height="44" rx="8" fill="#000000"/>
  <rect x="460" y="146" width="160" height="44" rx="8" fill="#A6E22E" stroke="#000000" stroke-width="3"/>
  <text class="title" x="540" y="168" text-anchor="middle" fill="#000000">User DB</text>
</g>

<g>
  <rect x="464" y="350" width="160" height="44" rx="8" fill="#000000"/>
  <rect x="460" y="346" width="160" height="44" rx="8" fill="#A6E22E" stroke="#000000" stroke-width="3"/>
  <text class="title" x="540" y="368" text-anchor="middle" fill="#000000">Redis Session</text>
</g>

<g>
  <rect x="60" y="520" width="14" height="14" fill="#6D28D9" stroke="#000000" stroke-width="2"/>
  <text class="legend-text" x="80" y="531">Core process</text>
  <rect x="220" y="520" width="14" height="14" fill="#A6E22E" stroke="#000000" stroke-width="2"/>
  <text class="legend-text" x="240" y="531">Data store</text>
</g>
</svg>
