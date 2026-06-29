import React from 'react';
import Panel from './Panel';

export default function PricingCard({
  title,
  price,
  period = '/mo',
  isPopular = false,
  description,
  features = [],
  ctaText = 'START BUILDING',
  billingNote = ''
}) {
  return (
    <Panel
      shadowType={isPopular ? 'violet' : 'default'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '24px',
        backgroundColor: 'var(--color-surface)',
        borderColor: isPopular ? 'var(--color-violet)' : 'var(--color-border)',
        transform: isPopular ? 'scale(1.02)' : 'none',
        position: 'relative'
      }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <span
          className="retro-badge violet"
          style={{
            position: 'absolute',
            top: '-12px',
            right: '24px',
            zIndex: 10,
          }}
        >
          MOST POPULAR
        </span>
      )}

      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.25rem',
            color: isPopular ? 'var(--color-violet)' : 'var(--color-white)',
            marginBottom: '8px'
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: '0.85rem', minHeight: '36px', color: 'var(--color-text-muted)' }}>
          {description}
        </p>
      </div>

      {/* Price */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontSize: price.startsWith('$') ? '3rem' : '2.5rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: '800',
              color: 'var(--color-white)'
            }}
          >
            {price}
          </span>
          {price !== 'Custom' && (
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'var(--color-text-muted)',
                fontWeight: 'bold'
              }}
            >
              {period}
            </span>
          )}
        </div>
        {billingNote && (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-lima)', fontWeight: '500', marginTop: '4px' }}>
            {billingNote}
          </span>
        )}
      </div>

      {/* Features List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 32px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flexGrow: 1
        }}
      >
        {features.map((feature, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontSize: '0.85rem',
              color: 'var(--color-white)'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                backgroundColor: isPopular ? 'var(--color-violet)' : 'var(--color-surface)',
                border: '1.5px solid var(--color-border)',
                color: 'var(--color-white)',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                flexShrink: 0,
                marginTop: '1px',
                boxShadow: '1px 1px 0 var(--color-border)'
              }}
            >
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`retro-button ${isPopular ? 'primary' : 'secondary'}`}
        style={{
          width: '100%',
          textAlign: 'center',
          justifyContent: 'center'
        }}
      >
        {ctaText}
      </button>
    </Panel>
  );
}
