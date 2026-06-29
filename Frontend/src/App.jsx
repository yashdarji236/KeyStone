import React, { useState, useEffect } from 'react';
import {
  Lock, Globe, Layers, RefreshCw, ShieldAlert, Zap, FileText,
  Menu, X, Check, Activity, Code
} from 'lucide-react';

import Panel from './components/Panel';
import RetroWindow from './components/RetroWindow';
import HeroMockup from './components/HeroMockup';
import CodePreview from './components/CodePreview';
import PricingCard from './components/PricingCard';
import {
  KeyShape, ShieldShape, LogoHexagon, LogoDiamondGrid,
  LogoCrosshairs, LogoDoubleTriangle, LogoIsometricBlock
} from './assets/Shapes';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeStat, setActiveStat] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  // Monitor prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Flow animation loop (How it works diagram)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveFlowStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Features data
  const features = [
    {
      icon: <Lock size={20} />,
      title: 'MULTI-FACTOR AUTHENTICATION',
      desc: 'TOTP, SMS/email OTP, and WebAuthn out of the box. Secure logins in minutes.'
    },
    {
      icon: <Globe size={20} />,
      title: 'OAUTH & SSO FEDERATION',
      desc: 'Google, SAML, and OIDC, configured in minutes. Seamless integration.'
    },
    {
      icon: <Layers size={20} />,
      title: 'MULTI-TENANT WORKSPACES',
      desc: "Isolate every customer's users by design, not by convention. Enterprise ready."
    },
    {
      icon: <RefreshCw size={20} />,
      title: 'AUTOMATIC KEY ROTATION',
      desc: "JWKS keys rotate themselves dynamically. You'll never think about it again."
    },
    {
      icon: <Activity size={20} />,
      title: 'SESSION & TOKEN CONTROL',
      desc: 'Short-lived access tokens, rotating refresh tokens, instant global revocation.'
    },
    {
      icon: <FileText size={20} />,
      title: 'AUDIT & COMPLIANCE LOGS',
      desc: 'Every login, every configuration change, timestamped and exportable.'
    },
    {
      icon: <Zap size={20} />,
      title: 'EDGE TOKEN VERIFICATION',
      desc: 'Tokens verify at the edge (Cloudflare/Vercel), not a slow round trip to your origin.'
    },
    {
      icon: <ShieldAlert size={20} />,
      title: 'RATE LIMITING & ABUSE',
      desc: 'Smart credential-stuffing defense, bot protection, and IP throttling.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      initial: 'A',
      name: 'Alex Rivera',
      role: 'Lead Platform Engineer at Cyberdyne',
      quote: 'We replaced our custom Auth0 setup with Keystone in a single afternoon. The token latency dropped from 120ms to less than 10ms at the edge.',
      avatarColor: 'var(--color-violet)'
    },
    {
      initial: 'S',
      name: 'Sarah Chen',
      role: 'CTO at Apex Labs',
      quote: 'SSO and multi-tenancy are usually a nightmare to configure. Keystone made it as simple as clicking a checkbox in their console. Best dev-tool of the year.',
      avatarColor: 'var(--color-lima)'
    },
    {
      initial: 'M',
      name: 'Marcus Vance',
      role: 'VP Engineering at Bolt.io',
      quote: 'JWKS rotations and session revocations used to keep me up at night. Now I just ship and sleep. Keystone is bulletproof and lightning fast.',
      avatarColor: '#ec4899'
    }
  ];

  // Navigation Links
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Developers', href: '#developers' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#' }
  ];

  return (
    <div className="bg-dot-grid" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>

      {/* SECTION 1: STICKY HEADER */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(10, 10, 11, 0.95)',
          borderBottom: '2px solid var(--color-border)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo / Wordmark */}
          <a
            href="/"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '800',
              fontSize: '1.5rem',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-white)',
            }}
          >
            <KeyShape size={24} color="var(--color-lima)" />
            <span>KEYSTONE</span>
          </a>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
            className="desktop-actions"
          >
            <a
              href="#"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                color: 'var(--color-white)',
              }}
            >
              Sign In
            </a>
            <button className="retro-button success" style={{ padding: '8px 16px' }}>
              GET STARTED
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-white)',
              cursor: 'pointer',
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-bg)',
              borderBottom: '2px solid var(--color-border)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              zIndex: 90,
            }}
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--color-surface)',
                  paddingBottom: '10px',
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  padding: '12px',
                  border: '2px solid var(--color-border)',
                }}
              >
                Sign In
              </a>
              <button
                className="retro-button success"
                onClick={() => setIsMenuOpen(false)}
                style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
              >
                GET STARTED
              </button>
            </div>
          </div>
        )}
      </header>

      {/* SECTION 2: HERO */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px 60px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '40px',
          width: '100%',
        }}
      >
        {/* Main Stacked Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="retro-badge violet" style={{ margin: '0 auto 16px auto', fontSize: '0.8rem' }}>
            AUTH-AS-A-SERVICE FOR DEVELOPERS
          </span>
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: '1.05',
              fontWeight: '900',
              letterSpacing: '-0.03em',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <span>AUTHENTICATE</span>
            <span style={{ color: 'var(--color-lima)' }}>AUTHORIZE</span>
            <span>SHIP FASTER</span>
          </h1>
        </div>

        {/* Subhead */}
        <p
          style={{
            maxWidth: '640px',
            fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
            lineHeight: '1.6',
            color: 'var(--color-text-muted)',
          }}
        >
          Auth, MFA, and SSO that took us years to harden — drop it into your app in an afternoon. No credential stuffing, no key leak nightmares.
        </p>

        {/* Hero CTAs */}
        <div className="cta-buttons-container">
          <button className="retro-button primary cta-button" style={{ fontSize: '1rem', padding: '16px 32px' }}>
            START BUILDING
          </button>
          <button className="retro-button secondary cta-button" style={{ fontSize: '1rem', padding: '16px 32px' }}>
            READ THE DOCS
          </button>
        </div>

        {/* Inline Stats Row */}
        <div
          className="hero-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            width: '100%',
            marginTop: '32px',
          }}
        >
          {[
            { num: '99.99%', label: 'UPTIME SLA' },
            { num: '<10ms', label: 'TOKEN VERIFICATION' },
            { num: '50M+', label: 'LOGINS/DAY' },
            { num: '15 MIN', label: 'TO FIRST LOGIN' },
          ].map((stat, idx) => {
            const isViolet = idx % 2 === 0;
            const isActive = activeStat === idx;
            const isHovered = hoveredStat === idx;
            const borderCol = isViolet ? 'var(--color-violet)' : 'var(--color-lima)';
            
            let bgCol = 'var(--color-surface)';
            if (isActive) {
              bgCol = borderCol;
            } else if (isHovered) {
              bgCol = isViolet ? 'rgba(109, 40, 217, 0.15)' : 'rgba(166, 226, 46, 0.15)';
            }
            
            let numColor = 'var(--color-white)';
            let labelColor = 'var(--color-text-muted)';
            if (isActive) {
              numColor = isViolet ? 'var(--color-white)' : 'var(--color-border)';
              labelColor = isViolet ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)';
            }

            // Neobrutalist active translation & shadow collapsing, matching retro-buttons shadow colors
            let transformVal = 'none';
            let shadowVal = isViolet ? '4px 4px 0 var(--color-violet)' : '4px 4px 0 var(--color-lima)';
            if (isActive) {
              transformVal = 'translate(4px, 4px)';
              shadowVal = isViolet ? '0px 0px 0 var(--color-violet)' : '0px 0px 0 var(--color-lima)';
            } else if (isHovered) {
              transformVal = 'translate(-2px, -2px)';
              shadowVal = isViolet ? '6px 6px 0 var(--color-violet)' : '6px 6px 0 var(--color-lima)';
            }

            return (
              <Panel
                key={idx}
                shadowType="default"
                className="mobile-center-flex"
                onClick={() => setActiveStat(activeStat === idx ? null : idx)}
                onMouseEnter={() => setHoveredStat(idx)}
                onMouseLeave={() => setHoveredStat(null)}
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderLeft: `4px solid ${borderCol}`,
                  backgroundColor: bgCol,
                  cursor: 'pointer',
                  transform: transformVal,
                  boxShadow: shadowVal,
                  transition: 'background-color 0.15s ease, transform 0.1s ease, box-shadow 0.1s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: numColor,
                    transition: 'color 0.15s ease',
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: labelColor,
                    letterSpacing: '0.05em',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {stat.label}
                </div>
              </Panel>
            );
          })}
        </div>

        {/* Hero Mockup */}
        <div style={{ width: '100%', marginTop: '30px', maxWidth: '1200px' }}>
          <HeroMockup />
        </div>
      </section>

      {/* SECTION 3: TRUST STRIP */}
      <section
        style={{
          borderTop: '2px solid var(--color-border)',
          borderBottom: '2px solid var(--color-border)',
          backgroundColor: '#0d0d0e',
          padding: '24px 0',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          className="trust-strip-container"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            width: '100%'
          }}
        >
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '700',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            TRUSTED BY ENGINEERING TEAMS AT:
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontWeight: '800', fontSize: '0.85rem' }}>
              <LogoHexagon size={24} /> HEXA.IO
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontWeight: '800', fontSize: '0.85rem' }}>
              <LogoDiamondGrid size={24} /> DIAMOND
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontWeight: '800', fontSize: '0.85rem' }}>
              <LogoCrosshairs size={24} /> NUCLEUS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontWeight: '800', fontSize: '0.85rem' }}>
              <LogoDoubleTriangle size={24} /> TRINITY
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontWeight: '800', fontSize: '0.85rem' }}>
              <LogoIsometricBlock size={24} /> APEX
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES GRID */}
      <section id="features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            HARDENED AUTH. READY TO DEPLOY.
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            We spent years engineering edge session caches, key distribution channels, and bot throttles so you don't have to.
          </p>
        </div>

        <div className="retro-grid-auto-280">
          {features.map((feat, idx) => (
            <Panel
              key={idx}
              shadowType="default"
              className="retro-card mobile-center-flex"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div
                className="feature-icon-wrapper"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: '2px solid var(--color-border)',
                  backgroundColor: idx % 2 === 0 ? 'var(--color-violet)' : 'var(--color-lima)',
                  color: idx % 2 === 0 ? 'var(--color-white)' : 'var(--color-border)',
                  boxShadow: '2px 2px 0 var(--color-border)',
                }}
              >
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.02em' }}>{feat.title}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>{feat.desc}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* SECTION 5: DEVELOPER EXPERIENCE */}
      <section
        id="developers"
        style={{
          borderTop: '2px solid var(--color-border)',
          backgroundColor: '#0b0b0c',
          padding: '100px 24px',
          width: '100%',
        }}
      >
        <div
          className="retro-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div className="col-span-12 lg-col-span-5 mobile-center-flex">
            <span className="retro-badge lima" style={{ marginBottom: '16px' }}>SDK & API</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '20px', lineHeight: '1.05' }}>
              Three lines of code. <br />
              <span style={{ color: 'var(--color-violet)' }}>Zero 2am auth incidents.</span>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              We deliver auth headless, standard-compliant, and optimized for speed. Bring your own UI components or trigger our pre-configured OAuth sequences in 10ms. Our API-first structure gives you full control.
            </p>
            <div className="mobile-center-flex" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <div className="check-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <Check size={16} style={{ color: 'var(--color-lima)' }} />
                <span>Edge cached verification (reduces DB lookups)</span>
              </div>
              <div className="check-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <Check size={16} style={{ color: 'var(--color-lima)' }} />
                <span>OIDC/OAuth 2.0 specs standard compliant</span>
              </div>
              <div className="check-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <Check size={16} style={{ color: 'var(--color-lima)' }} />
                <span>Bring-Your-Own-UI backend SDK bindings</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg-col-span-7">
            <CodePreview />
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS & SVG FLOW */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            HOW IT FLOWS AT THE EDGE
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Zero-latency validation bypassing database round-trips.
          </p>
        </div>

        <div
          className="retro-grid"
          style={{
            alignItems: 'center',
          }}
        >
          {/* Steps (Left Column) */}
          <div className="col-span-12 md-col-span-5">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                {
                  num: '01',
                  title: 'CONNECT YOUR APP',
                  desc: 'Import the SDK and specify your client keys. Session routing initiates instantly.'
                },
                {
                  num: '02',
                  title: 'CONFIGURE FLOWS',
                  desc: 'Enable MFA, SSO, or social authorization from the dashboard. Changes update live in 10ms.'
                },
                {
                  num: '03',
                  title: 'SHIP WITH CONFIDENCE',
                  desc: 'Our JWKS rotations and rate limit walls protect endpoints without maintenance code.'
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="mobile-step-container"
                  style={{
                    padding: '20px',
                    border: '2px solid var(--color-border)',
                    backgroundColor: activeFlowStep === idx ? 'rgba(166, 226, 46, 0.04)' : 'var(--color-surface)',
                    borderColor: activeFlowStep === idx ? 'var(--color-lima)' : 'var(--color-border)',
                    boxShadow: activeFlowStep === idx ? 'var(--shadow-lima)' : 'var(--shadow-default)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      color: activeFlowStep === idx ? 'var(--color-lima)' : 'var(--color-text-muted)'
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>{step.title}</h3>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Flow SVG (Right Column) */}
          <div className="col-span-12 md-col-span-7">
            <Panel shadowType="default" className="flow-panel" style={{ backgroundColor: '#0a0a0b', minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', width: '100%' }}>

                {/* Node 1: Client */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 5, width: '80px' }}>
                  <div
                    className={activeFlowStep === 0 ? 'flow-node-circle client active' : 'flow-node-circle client'}
                    style={{
                      backgroundColor: activeFlowStep === 0 ? 'var(--color-lima)' : 'var(--color-surface)',
                      color: activeFlowStep === 0 ? '#000' : '#fff'
                    }}
                  >
                    <Code size={20} />
                  </div>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', fontWeight: 'bold' }}>CLIENT APP</span>
                </div>

                {/* Arrow Vector Path */}
                <div style={{ flexGrow: 1, position: 'relative', height: '4px', backgroundColor: 'var(--color-border)', margin: '0 -15px' }}>
                  {!prefersReducedMotion && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-3px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: activeFlowStep === 1 ? 'var(--color-lima)' : 'var(--color-violet)',
                        left: activeFlowStep === 0 ? '10%' : activeFlowStep === 1 ? '50%' : activeFlowStep === 2 ? '90%' : '10%',
                        transition: 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 0 8px currentColor'
                      }}
                    />
                  )}
                </div>

                {/* Node 2: Keystone Edge */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 5, width: '90px' }}>
                  <div
                    className={activeFlowStep === 1 || activeFlowStep === 2 ? 'flow-node-circle edge active' : 'flow-node-circle edge'}
                    style={{
                      backgroundColor: activeFlowStep === 1 || activeFlowStep === 2 ? 'var(--color-violet)' : 'var(--color-surface)',
                      color: '#fff',
                      position: 'relative'
                    }}
                  >
                    <Zap size={24} style={{ color: activeFlowStep === 1 || activeFlowStep === 2 ? 'var(--color-lima)' : '#fff' }} />
                    {/* Badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.55rem',
                        backgroundColor: 'var(--color-border)',
                        color: 'var(--color-lima)',
                        padding: '1px 4px',
                        border: '1px solid var(--color-lima)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      &lt; 10ms
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', fontWeight: 'bold' }}>KEYSTONE EDGE</span>
                </div>

                {/* Arrow Vector Path */}
                <div style={{ flexGrow: 1, position: 'relative', height: '4px', backgroundColor: 'var(--color-border)', margin: '0 -15px' }}>
                  {!prefersReducedMotion && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-3px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-lima)',
                        left: activeFlowStep === 2 ? '50%' : '10%',
                        opacity: activeFlowStep >= 2 ? 1 : 0,
                        transition: 'all 0.5s ease'
                      }}
                    />
                  )}
                </div>

                {/* Node 3: Server Origin */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 5, width: '80px' }}>
                  <div
                    className={activeFlowStep === 3 ? 'flow-node-circle server active' : 'flow-node-circle server'}
                    style={{
                      backgroundColor: activeFlowStep === 3 ? 'var(--color-lima)' : 'var(--color-surface)',
                      color: activeFlowStep === 3 ? '#000' : '#fff'
                    }}
                  >
                    <Layers size={20} />
                  </div>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', fontWeight: 'bold' }}>YOUR API</span>
                </div>

              </div>

              {/* Status Explanation Bar */}
              <div
                style={{
                  marginTop: '40px',
                  padding: '12px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1.5px solid var(--color-border)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  minHeight: '52px',
                  textAlign: 'left'
                }}
              >
                {activeFlowStep === 0 && (
                  <div>
                    <span style={{ color: 'var(--color-lima)' }}>● CLIENT:</span> Initiating token transmission request to secure resource...
                  </div>
                )}
                {activeFlowStep === 1 && (
                  <div>
                    <span style={{ color: 'var(--color-violet)' }}>● EDGE CACHE:</span> Verifying cryptographic signatures on token. Resolving JWKS signing keys locally...
                  </div>
                )}
                {activeFlowStep === 2 && (
                  <div>
                    <span style={{ color: 'var(--color-lima)' }}>● EDGE PASS:</span> Signatures confirmed. Forwarding authorized context headers directly to origin API.
                  </div>
                )}
                {activeFlowStep === 3 && (
                  <div>
                    <span style={{ color: '#ffffff' }}>● ORIGIN SECURED:</span> API processes response immediately. Zero database lookups for session validations.
                  </div>
                )}
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section
        style={{
          borderTop: '2px solid var(--color-border)',
          backgroundColor: '#0a0a0b',
          padding: '100px 24px',
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Banner declaring fictional status to respect honest compliance guidelines */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <span className="retro-badge" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)', borderTop: 'none' }}>
            DEMONSTRATION PLACEHOLDERS
          </span>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              DEV TRUST BY PROTOCOL
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
              What platform teams say when auth works correctly.
            </p>
          </div>

          <div className="retro-grid-auto-300">
            {testimonials.map((test, idx) => (
              <Panel
                key={idx}
                shadowType={idx === 1 ? 'lima' : 'default'}
                className="retro-card mobile-center-flex"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {/* Quote symbol */}
                <div style={{ fontSize: '3rem', fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-text-muted)', lineHeight: '0.1', height: '10px' }}>
                  “
                </div>

                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic', color: '#f3f4f6', flexGrow: 1 }}>
                  {test.quote}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px dashed #27272a', paddingTop: '16px' }}>
                  {/* Avatar Letter */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: test.avatarColor,
                      color: test.avatarColor === 'var(--color-lima)' ? '#000' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: '800',
                      border: '2px solid var(--color-border)'
                    }}
                  >
                    {test.initial}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', textTransform: 'none' }}>{test.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{test.role}</p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING */}
      <section id="pricing" style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="retro-badge lima" style={{ marginBottom: '16px' }}>PRICING PLANS</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            PREDICTABLE PROTOCOLS. Sleek PRICING.
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            Start for free and scale to millions of users with no hidden authentication API surcharges.
          </p>
        </div>

        <div className="retro-grid-auto-300" style={{ alignItems: 'stretch' }}>
          <PricingCard
            title="DEVELOPER"
            price="Free"
            period=""
            description="For side projects, hackers, and exploring the SDK."
            features={[
              "Up to 10,000 Monthly Active Users",
              "Standard Social Logins (Google, GitHub)",
              "Keystone Hosted UI Components",
              "Standard Community Discord Support"
            ]}
            ctaText="START BUILDING"
          />
          <PricingCard
            title="PROFESSIONAL"
            price="$29"
            period="/mo"
            isPopular={true}
            description="For growing applications requiring custom branding and SSO."
            features={[
              "Up to 100,000 Monthly Active Users",
              "WebAuthn / Passkeys & TOTP MFA",
              "Enterprise SSO (SAML & OIDC)",
              "Automatic Key Rotations & JWKS",
              "SMS & Email Custom Gateways",
              "Priority Email Support (24hr SLA)"
            ]}
            ctaText="UPGRADE TO PRO"
            billingNote="Billed monthly. Pause anytime."
          />
          <PricingCard
            title="ENTERPRISE"
            price="Custom"
            period=""
            description="For complex infrastructures and compliance audits."
            features={[
              "Unlimited Monthly Active Users",
              "Fully Isolated Single-Tenant Workspaces",
              "Custom SLA uptime & Edge routing limits",
              "Raw audit and compliance logs exporter",
              "Dedicated 24/7 Slack / Phone support channel",
              "Custom contract & custom feature prioritization"
            ]}
            ctaText="CONTACT SALES"
          />
        </div>
      </section>


      {/* SECTION 9: CLOSING CTA */}
      <section
        style={{
          borderTop: '2px solid var(--color-border)',
          borderBottom: '2px solid var(--color-border)',
          backgroundColor: 'var(--color-violet)',
          color: 'var(--color-white)',
          padding: '120px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {/* Dotted pattern overlay specific to violet container */}
        <div
          style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none'
          }}
        />

        {/* Scattered neobrutalist background shape decorations */}
        <KeyShape
          size={80}
          color="rgba(166, 226, 46, 0.15)"
          className="decor-shape"
          style={{ position: 'absolute', top: '15%', left: '10%', transform: 'rotate(-25deg)' }}
        />
        <ShieldShape
          size={70}
          color="rgba(0, 0, 0, 0.2)"
          className="decor-shape"
          style={{ position: 'absolute', bottom: '20%', right: '12%', transform: 'rotate(15deg)' }}
        />
        <KeyShape
          size={60}
          color="rgba(0, 0, 0, 0.2)"
          className="decor-shape"
          style={{ position: 'absolute', bottom: '15%', left: '15%', transform: 'rotate(45deg)' }}
        />
        <ShieldShape
          size={90}
          color="rgba(166, 226, 46, 0.15)"
          className="decor-shape"
          style={{ position: 'absolute', top: '10%', right: '8%', transform: 'rotate(-10deg)' }}
        />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: '1.0',
              fontWeight: '900',
              marginBottom: '32px',
              textShadow: '3px 3px 0 var(--color-border)',
            }}
          >
            READY TO STOP BUILDING AUTH FROM SCRATCH?
          </h2>

          <div className="cta-buttons-container">
            <button
              className="retro-button success cta-button"
              style={{
                fontSize: '1rem',
                padding: '18px 36px',
                backgroundColor: 'var(--color-lima)',
                color: 'var(--color-border)',
                boxShadow: '4px 4px 0 var(--color-border)'
              }}
            >
              START BUILDING FOR FREE
            </button>
            <button
              className="retro-button secondary cta-button"
              style={{
                fontSize: '1rem',
                padding: '18px 36px',
                backgroundColor: 'transparent',
                color: 'var(--color-white)',
                borderColor: 'var(--color-white)',
                boxShadow: '4px 4px 0 var(--color-white)'
              }}
            >
              SCHEDULE A DEMO
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 10: FOOTER */}
      <footer
        style={{
          backgroundColor: '#070708',
          padding: '80px 24px 40px 24px',
          fontFamily: 'Space Grotesk, sans-serif',
          width: '100%',
        }}
      >
        <div
          className="retro-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            borderBottom: '1.5px dashed #27272a',
            paddingBottom: '60px',
          }}
        >
          {/* Logo & Tagline column */}
          <div className="col-span-12 md-col-span-5">
            <a
              href="/"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: '800',
                fontSize: '1.6rem',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-white)',
                marginBottom: '16px'
              }}
            >
              <KeyShape size={26} color="var(--color-lima)" />
              <span>KEYSTONE</span>
            </a>
            <p style={{ maxWidth: '280px', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              The auth layer built for platform engineering teams who would rather ship actual features than rewrite session checks.
            </p>
          </div>

          {/* Nav columns */}
          <div className="col-span-6 md-col-span-3">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-white)', marginBottom: '16px', letterSpacing: '0.05em' }}>INDEX</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <a href="#features" style={{ color: 'var(--color-text-muted)' }}>Features</a>
              <a href="#developers" style={{ color: 'var(--color-text-muted)' }}>Developers</a>
              <a href="#" style={{ color: 'var(--color-text-muted)' }}>Documentation API</a>
            </div>
          </div>

          <div className="col-span-6 md-col-span-2">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-white)', marginBottom: '16px', letterSpacing: '0.05em' }}>SOCIAL</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <a href="#" style={{ color: 'var(--color-text-muted)' }}>Twitter / X</a>
              <a href="#" style={{ color: 'var(--color-text-muted)' }}>GitHub Org</a>
              <a href="#" style={{ color: 'var(--color-text-muted)' }}>Discord Server</a>
            </div>
          </div>

          <div className="col-span-12 md-col-span-2">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-white)', marginBottom: '16px', letterSpacing: '0.05em' }}>LEGAL</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <a href="#" style={{ color: 'var(--color-text-muted)' }}>Terms of Service</a>
              <a href="#" style={{ color: 'var(--color-text-muted)' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--color-text-muted)' }}>Security Statement</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Keystone Technologies, Inc. MIT License.
          </div>
          <div>
            <span
              className="retro-badge"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#27272a',
                color: 'var(--color-text-muted)',
                boxShadow: '1px 1px 0 #27272a'
              }}
            >
              SOC 2 COMPLIANCE IN PROGRESS
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
