import React from 'react';

// Neobrutalist Key SVG
export function KeyShape({ className = '', size = 24, color = 'currentColor', style = {}, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={style}
      {...props}
    >
      <circle cx="7.5" cy="16.5" r="4.5" fill="none" />
      <path d="M11 13L20 4M17 7L20 10M14 10L17 13" />
    </svg>
  );
}

// Neobrutalist Shield SVG
export function ShieldShape({ className = '', size = 24, color = 'currentColor', style = {}, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={style}
      {...props}
    >
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="none" />
    </svg>
  );
}

// Geometric Trust Logos for the strip
export function LogoHexagon({ className = '', size = 32, style = {}, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" fill="var(--color-violet)" stroke="none" />
    </svg>
  );
}

export function LogoDiamondGrid({ className = '', size = 32, style = {}, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <rect x="16" y="2" width="10" height="10" transform="rotate(45 16 2)" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <rect x="16" y="16" width="10" height="10" transform="rotate(45 16 16)" fill="var(--color-lima)" />
    </svg>
  );
}

export function LogoCrosshairs({ className = '', size = 32, style = {}, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="2.5" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export function LogoDoubleTriangle({ className = '', size = 32, style = {}, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <polygon points="16,2 30,26 2,26" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <polygon points="16,14 24,26 8,26" fill="var(--color-violet)" stroke="none" />
    </svg>
  );
}

export function LogoIsometricBlock({ className = '', size = 32, style = {}, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} style={style} {...props}>
      <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M16 2 L16 30 M4 9 L16 16 L28 9" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
