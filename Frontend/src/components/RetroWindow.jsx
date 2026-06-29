import React from 'react';
import Panel from './Panel';

export default function RetroWindow({
  title = 'TERMINAL',
  children,
  className = '',
  shadowType = 'default',
  style = {},
  headerStyle = {},
  bodyClassName = '',
  statusText = 'ONLINE',
  ...props
}) {
  return (
    <Panel
      shadowType={shadowType}
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...props}
    >
      {/* Title bar */}
      <div
        className="retro-window-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '2px solid var(--color-border)',
          backgroundColor: '#0a0a0b',
          userSelect: 'none',
          ...headerStyle
        }}
      >
        {/* Left window control buttons */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', border: '1px solid var(--color-border)' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fbbf24', border: '1px solid var(--color-border)' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', border: '1px solid var(--color-border)' }}></span>
        </div>

        {/* Center title */}
        <div
          style={{
            fontFamily: 'Space Grotesk, monospace',
            fontWeight: '700',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-white)',
          }}
        >
          {title}
        </div>

        {/* Right status badge */}
        <div>
          <span
            className="retro-badge"
            style={{
              padding: '2px 6px',
              fontSize: '0.6rem',
              backgroundColor: statusText === 'ONLINE' ? 'var(--color-lima)' : 'var(--color-violet)',
              color: statusText === 'ONLINE' ? 'var(--color-border)' : 'var(--color-white)',
              boxShadow: '1px 1px 0 var(--color-border)',
            }}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div
        className={`retro-window-body ${bodyClassName}`}
        style={{
          padding: '16px',
          flexGrow: 1,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.85rem',
          lineHeight: '1.4',
        }}
      >
        {children}
      </div>
    </Panel>
  );
}
