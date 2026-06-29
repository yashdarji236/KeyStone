import React, { useState, useEffect, useRef } from 'react';
import RetroWindow from './RetroWindow';

export default function HeroMockup() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeSessions, setActiveSessions] = useState(1204);
  const [sparklinePoints, setSparklinePoints] = useState([30, 35, 28, 40, 42, 38, 45, 55, 48, 52, 60, 58, 62, 58, 65, 70, 68]);
  const [terminalLines, setTerminalLines] = useState([
    { text: '$ keystone deploy --env=production', color: '#a1a1aa' },
    { text: 'Provisioning JWKS signing keys... done', color: '#ffffff' },
    { text: 'Connecting session store (redis)... done', color: '#ffffff' },
    { text: 'Auth service live at edge — 14 regions', color: 'var(--color-lima)' }
  ]);
  const [jwtPayload, setJwtPayload] = useState({
    sub: "usr_8f2a",
    tenant_id: "ten_44c1",
    exp: 1719234900,
    role: "admin",
    iss: "keystone.sh"
  });
  const [securityEvents, setSecurityEvents] = useState([
    { id: 1, action: 'MFA challenge passed', detail: 'usr_8f2a', time: '2ms ago', success: true },
    { id: 2, action: 'Refresh token rotated', detail: 'usr_22b7', time: '14ms ago', success: true },
    { id: 3, action: 'Suspicious login blocked', detail: 'IP throttled', time: '1.2s ago', success: false }
  ]);

  const securityFeedEndRef = useRef(null);

  // Monitor prefers-reduced-motion query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Periodic ticking counter & sparkline movement (Only if motion is not reduced)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      // Tick active sessions up or down slightly
      setActiveSessions((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const nextVal = prev + delta;
        return nextVal < 100 ? 100 : nextVal;
      });

      // Shift sparkline
      setSparklinePoints((prev) => {
        const nextPoints = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        const delta = Math.floor(Math.random() * 15) - 7; // -7 to +7
        let nextVal = lastVal + delta;
        // Keep within SVG boundary (10 to 80)
        if (nextVal < 10) nextVal = 15;
        if (nextVal > 80) nextVal = 75;
        nextPoints.push(nextVal);
        return nextPoints;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Synchronized simulation event
  const triggerAuthEvent = () => {
    const randomUser = `usr_${Math.random().toString(36).substring(2, 6)}`;
    const randomTenant = `ten_${Math.random().toString(36).substring(2, 6)}`;
    const timestamp = Math.floor(Date.now() / 1000) + 3600;

    // 1. Tick up session count (+12)
    setActiveSessions((prev) => prev + 12);

    // 2. Introduce spike on sparkline
    setSparklinePoints((prev) => {
      const nextPoints = [...prev.slice(2)];
      nextPoints.push(85); // Big spike
      nextPoints.push(75); // Settle down
      return nextPoints;
    });

    // 3. Print terminal deploy
    setTerminalLines((prev) => [
      ...prev,
      { text: `$ keystone auth --verify-jwt -u ${randomUser}`, color: '#a1a1aa' },
      { text: `Token valid: user verified successfully`, color: 'var(--color-lima)' }
    ]);

    // 4. Update Token Payload
    setJwtPayload({
      sub: randomUser,
      tenant_id: randomTenant,
      exp: timestamp,
      role: Math.random() > 0.5 ? "member" : "admin",
      iss: "keystone.sh"
    });

    // 5. Add security feed event at the top
    const eventTypes = [
      { action: 'MFA challenge passed', detail: randomUser, success: true },
      { action: 'Session token rotated', detail: randomUser, success: true },
      { action: 'Token verified at Edge', detail: randomUser, success: true }
    ];
    const chosenEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    setSecurityEvents((prev) => [
      {
        id: Date.now(),
        action: chosenEvent.action,
        detail: chosenEvent.detail,
        time: 'Just now',
        success: chosenEvent.success
      },
      ...prev.slice(0, 7) // keep it reasonably sized
    ]);
  };

  // Build SVG path for sparkline
  const generateSparklinePath = () => {
    const width = 180;
    const height = 40;
    const step = width / (sparklinePoints.length - 1);
    return sparklinePoints
      .map((val, idx) => {
        const x = idx * step;
        // SVG coordinate is y=0 at the top, so invert the value
        const y = height - (val / 100) * height;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Simulation Button */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button
          onClick={triggerAuthEvent}
          className="retro-button success"
          style={{
            fontSize: '1rem',
            padding: '14px 28px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: prefersReducedMotion ? '#000000' : 'transparent',
              border: '2.5px solid #000000',
              animation: prefersReducedMotion ? 'none' : 'ping-dot 1.2s infinite'
            }}
          ></span>
          TRIGGER LIVE AUTH EVENT
        </button>
      </div>

      {/* Modern Neobrutalist Mockup Grid */}
      <div className="mockup-grid" style={{ width: '100%' }}>
        {/* PANEL 1: Terminal Panel (8 Cols on Desktop) */}
        <div className="col-span-12 lg-col-span-8" style={{ minWidth: 0 }}>
          <RetroWindow title="Terminal Console" shadowType="default" className="terminal-window" bodyClassName="bg-black text-lime" style={{ minWidth: 0, width: '100%' }}>
            <div style={{ color: '#00ff00', height: '100%', overflowY: 'auto', overflowX: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {terminalLines.map((line, idx) => (
                <div key={idx} style={{ color: line.color, display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#a6e22e', userSelect: 'none' }}>&gt;</span>
                  <span>{line.text}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#a6e22e', marginRight: '8px' }}>&gt;</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '14px',
                    backgroundColor: 'var(--color-lima)',
                    animation: prefersReducedMotion ? 'none' : 'blink 1.2s step-end infinite'
                  }}
                ></span>
              </div>
            </div>
          </RetroWindow>
        </div>

        {/* PANEL 2: Live Sessions Panel (4 Cols on Desktop) */}
        <div className="col-span-12 lg-col-span-4" style={{ minWidth: 0 }}>
          <RetroWindow title="Session Store" statusText="EDGE LIVE" shadowType="lima" className="sessions-window" style={{ minWidth: 0, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                  Active User Sessions
                </p>
                <h3
                  style={{
                    fontSize: '2.5rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: '700',
                    color: 'var(--color-lima)',
                    marginTop: '8px',
                    letterSpacing: '-0.03em'
                  }}
                >
                  {activeSessions.toLocaleString()}
                </h3>
              </div>

              {/* Sparkline Graph */}
              <div style={{ borderTop: '1px dashed #3f3f46', paddingTop: '16px' }}>
                <p style={{ textTransform: 'uppercase', fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>
                  Traffic Stream (15s Window)
                </p>
                <div style={{ width: '100%', height: '40px', display: 'flex', alignItems: 'flex-end' }}>
                  <svg width="100%" height="40" style={{ overflow: 'visible' }}>
                    <path
                      d={generateSparklinePath()}
                      fill="none"
                      stroke="var(--color-lima)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </RetroWindow>
        </div>

        {/* PANEL 3: Token Inspector (5 Cols on Desktop) */}
        <div className="col-span-12 lg-col-span-5" style={{ minWidth: 0 }}>
          <RetroWindow title="Decoded JWT Payload" statusText="TOKEN" shadowType="violet" className="jwt-window" style={{ minWidth: 0, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <pre
                style={{
                  fontSize: '0.8rem',
                  color: '#ffffff',
                  backgroundColor: '#0a0a0b',
                  padding: '12px',
                  border: '1.5px solid var(--color-border)',
                  flexGrow: 1,
                  overflowY: 'auto',
                  overflowX: 'auto',
                  lineHeight: '1.5',
                  whiteSpace: 'pre'
                }}
              >
                <span style={{ color: '#f8f8f2' }}>{`{`}</span>
                <br />
                <span style={{ color: '#f92672' }}>  "sub"</span>
                <span style={{ color: '#f8f8f2' }}>:</span>
                <span style={{ color: '#a6e22e' }}> "{jwtPayload.sub}"</span>
                <span style={{ color: '#f8f8f2' }}>,</span>
                <br />
                <span style={{ color: '#f92672' }}>  "tenant_id"</span>
                <span style={{ color: '#f8f8f2' }}>:</span>
                <span style={{ color: '#a6e22e' }}> "{jwtPayload.tenant_id}"</span>
                <span style={{ color: '#f8f8f2' }}>,</span>
                <br />
                <span style={{ color: '#f92672' }}>  "exp"</span>
                <span style={{ color: '#f8f8f2' }}>:</span>
                <span style={{ color: '#ae81ff' }}> {jwtPayload.exp}</span>
                <span style={{ color: '#f8f8f2' }}>,</span>
                <br />
                <span style={{ color: '#f92672' }}>  "role"</span>
                <span style={{ color: '#f8f8f2' }}>:</span>
                <span style={{ color: '#a6e22e' }}> "{jwtPayload.role}"</span>
                <span style={{ color: '#f8f8f2' }}>,</span>
                <br />
                <span style={{ color: '#f92672' }}>  "iss"</span>
                <span style={{ color: '#f8f8f2' }}>:</span>
                <span style={{ color: '#a6e22e' }}> "{jwtPayload.iss}"</span>
                <br />
                <span style={{ color: '#f8f8f2' }}>{`}`}</span>
              </pre>
            </div>
          </RetroWindow>
        </div>

        {/* PANEL 4: Security Feed (7 Cols on Desktop) */}
        <div className="col-span-12 lg-col-span-7" style={{ minWidth: 0 }}>
          <RetroWindow title="Live Auth Stream" statusText="SECURITY" shadowType="default" className="stream-window" style={{ minWidth: 0, width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                height: '100%',
                overflowY: 'auto'
              }}
            >
              {securityEvents.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    border: '1.5px solid var(--color-border)',
                    backgroundColor: evt.success ? 'rgba(166, 226, 46, 0.04)' : 'rgba(239, 68, 68, 0.04)',
                    fontSize: '0.8rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: evt.success ? 'var(--color-lima)' : '#ef4444'
                      }}
                    ></span>
                    <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{evt.action}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{evt.detail}</span>
                  </div>
                  <div style={{ color: 'var(--color-text-muted)' }}>{evt.time}</div>
                </div>
              ))}
              <div ref={securityFeedEndRef} />
            </div>
          </RetroWindow>
        </div>
      </div>

      {/* Simple style additions for dynamic mockups */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes ping-dot {
          0% {
            transform: scale(0.9);
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(166, 226, 46, 0.6);
          }
          70% {
            transform: scale(1);
            opacity: 0.8;
            box-shadow: 0 0 0 8px rgba(166, 226, 46, 0);
          }
          100% {
            transform: scale(0.9);
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(166, 226, 46, 0);
          }
        }
        @media (min-width: 1024px) {
          .lg-col-8 { grid-column: span 8 !important; }
          .lg-col-4 { grid-column: span 4 !important; }
          .lg-col-5 { grid-column: span 5 !important; }
          .lg-col-7 { grid-column: span 7 !important; }
        }
      `}</style>
    </div>
  );
}
