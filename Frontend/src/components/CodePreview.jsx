import React, { useState } from 'react';
import Panel from './Panel';

const SNIPPETS = {
  js: {
    language: 'JavaScript (Client)',
    install: 'npm install @keystone-auth/react',
    code: `import { KeystoneProvider, useKeystone } 
    from '@keystone-auth/react';

function App() {
  return (
    <KeystoneProvider clientId="keyst_prod_82da">
      <LoginButton />
    </KeystoneProvider>
  );
}

function LoginButton() {
  const { login, isLoading } = useKeystone();
  return (
    <button onClick={() => login({ redirect: '/dashboard' })}>
      {isLoading ? 'Loading...' : 'Sign In'}
    </button>
  );
}`
  },
  node: {
    language: 'Node.js (Backend)',
    install: 'npm install @keystone-auth/node',
    code: `import { KeystoneClient } from '@keystone-auth/node';

const keystone = new KeystoneClient({ 
  apiKey: process.env.KEYSTONE_API_KEY 
});

// Middleware to protect API routes
async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const session = await keystone.sessions.verify(token);
    req.user = session.user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Auth failed' });
  }
}`
  },
  go: {
    language: 'Go',
    install: 'go get github.com/keystone-auth/keystone-go',
    code: `package main

import (
    "github.com/keystone-auth/keystone-go"
    "net/http"
)

func main() {
    client := keystone.NewClient("keyst_prod_82da")

    http.HandleFunc("/api/secure", func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        session, err := client.VerifyToken(token)
        if err != nil {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        w.Write([]byte("Welcome user: " + session.UserID))
    })
    
    http.ListenAndServe(":8080", nil)
}`
  },
  python: {
    language: 'Python',
    install: 'pip install keystone-auth',
    code: `from keystone import Keystone

keystone = Keystone(api_key="keyst_prod_82da")

# Protect endpoints in FastAPI
@app.get("/api/dashboard")
def get_dashboard(request: Request):
    token = request.headers.get("Authorization").split(" ")[1]
    try:
        session = keystone.sessions.verify(token)
        return {"status": "ok", "user": session.user_id}
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")`
  }
};

export default function CodePreview() {
  const [activeTab, setActiveTab] = useState('js');
  const activeSnippet = SNIPPETS[activeTab];

  return (
    <Panel shadowType="violet" style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%' }}>
      {/* Code Header Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid var(--color-border)',
          backgroundColor: '#0a0a0b',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {Object.entries(SNIPPETS).map(([key, data]) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '12px 18px',
                border: 'none',
                borderRight: '2px solid var(--color-border)',
                backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                color: isActive ? 'var(--color-lima)' : 'var(--color-text-muted)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: '700',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                borderBottom: isActive ? '2px solid var(--color-surface)' : 'none',
                marginBottom: '-2px',
                whiteSpace: 'nowrap'
              }}
            >
              {data.language}
            </button>
          );
        })}
      </div>

      {/* Dependency Install Command */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#0a0a0b',
          borderBottom: '1px solid var(--color-border)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--color-text-muted)',
          gap: '12px',
        }}
      >
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', flexGrow: 1, scrollbarWidth: 'none' }}>
          <span style={{ color: 'var(--color-lima)', marginRight: '8px' }}>$</span>
          <span>{activeSnippet.install}</span>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(activeSnippet.install)}
          className="retro-badge"
          style={{
            cursor: 'pointer',
            padding: '2px 8px',
            fontSize: '0.65rem',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-white)',
            boxShadow: '1px 1px 0 var(--color-border)',
            flexShrink: 0
          }}
        >
          COPY
        </button>
      </div>

      <div
        style={{
          padding: '16px',
          backgroundColor: '#0a0a0b',
          minHeight: '260px',
          overflowX: 'auto',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100%'
        }}
      >
        <pre
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            lineHeight: '1.6',
            color: '#f8f8f2',
            margin: 0,
            overflowX: 'auto',
            maxWidth: '100%',
            whiteSpace: 'pre'
          }}
        >
          <code>
            {activeSnippet.code.split('\n').map((line, i) => {
              // Basic highlighting logic
              let lineHtml = line;

              // Highlight Comments
              if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
                return (
                  <div key={i} style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', whiteSpace: 'pre' }}>
                    {line}
                  </div>
                );
              }

              // Highlight imports/requires/def/package/func
              return (
                <div key={i} style={{ whiteSpace: 'pre' }}>
                  {line.split(/(\s+)/).map((part, pIdx) => {
                    const keywords = ['import', 'from', 'function', 'return', 'const', 'new', 'async', 'await', 'try', 'catch', 'package', 'func', 'def', 'raise'];
                    if (keywords.includes(part.trim())) {
                      return <span key={pIdx} style={{ color: '#f92672', fontWeight: 'bold' }}>{part}</span>;
                    }
                    if (part.includes('"') || part.includes("'")) {
                      return <span key={pIdx} style={{ color: 'var(--color-lima)' }}>{part}</span>;
                    }
                    if (part.match(/^[0-9]+$/)) {
                      return <span key={pIdx} style={{ color: '#ae81ff' }}>{part}</span>;
                    }
                    if (part.match(/^[A-Z][a-zA-Z0-9_]*$/)) {
                      return <span key={pIdx} style={{ color: '#66d9ef' }}>{part}</span>;
                    }
                    return <span key={pIdx}>{part}</span>;
                  })}
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </Panel>
  );
}
