import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  BarChart3,
  Zap,
  TrendingUp
} from 'lucide-react';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const HeroSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&family=Syne:wght@700;800&display=swap');

        .process-hero {
          min-height: 100vh;
          background: #060a08;
          color: #f5f0e8;
          font-family: 'Space Mono', monospace;
          display: flex;
          align-items: center;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Subtle ambient glow */
        .process-hero::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(231, 173, 62, 0.08) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .hero-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          z-index: 10;
        }

        .hero-text h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-text .accent {
          color: #e7ad3e;
        }

        .hero-text p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(245, 240, 232, 0.6);
          margin-bottom: 2.5rem;
          max-width: 520px;
        }

        .hero-text .highlight {
          color: rgba(231, 173, 62, 0.85);
          font-weight: 600;
        }

        /* The Pipeline Visualization */
        .pipeline-container {
          position: relative;
          background: rgba(231, 173, 62, 0.02);
          border: 1px solid rgba(231, 173, 62, 0.1);
          border-radius: 24px;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .pipeline-step {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: all 0.5s ease;
          background: rgba(255, 255, 255, 0.01);
        }

        .step-active {
          background: rgba(231, 173, 62, 0.05);
          border-color: rgba(231, 173, 62, 0.3);
          transform: translateX(10px);
        }

        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(231, 173, 62, 0.1);
          color: #e7ad3e;
        }

        .step-active .icon-box {
          background: #e7ad3e;
          color: #060a08;
          box-shadow: 0 0 20px rgba(231, 173, 62, 0.3);
        }

        .step-content h3 {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          margin: 0;
          letter-spacing: 0.05em;
        }

        .step-content p {
          font-size: 0.75rem;
          margin: 4px 0 0;
          color: rgba(245, 240, 232, 0.4);
        }

        /* Connecting Line */
        .connector {
          position: absolute;
          left: 53px;
          top: 80px;
          bottom: 80px;
          width: 2px;
          background: rgba(231, 173, 62, 0.1);
          z-index: -1;
        }

        .connector-progress {
          width: 100%;
          background: #e7ad3e;
          transition: height 0.5s ease;
          box-shadow: 0 0 10px #e7ad3e;
        }

        .cta-button {
          background: #e7ad3e;
          color: #060a08;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
          border: none;
          cursor: pointer;
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
        }

        .cta-button:hover {
          background: #f0c16b;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(231, 173, 62, 0.2);
        }

        .cta-secondary {
          background: transparent;
          color: rgba(231, 173, 62, 0.8);
          border: 1px solid rgba(231, 173, 62, 0.3);
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
          cursor: pointer;
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
        }

        .cta-secondary:hover {
          border-color: rgba(231, 173, 62, 0.6);
          color: #e7ad3e;
          background: rgba(231, 173, 62, 0.05);
        }

        .cta-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .feature-grid {
          margin-top: 3rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
        }

        .feature-item {
          display: flex;
          gap: 10px;
          align-items: start;
        }

        .feature-item svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-item span {
          font-size: 0.8rem;
          opacity: 0.7;
          line-height: 1.4;
        }

        @media (max-width: 968px) {
          .hero-grid { 
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .pipeline-container { order: -1; }
          .feature-grid { grid-template-columns: 1fr; }
          .cta-group { flex-direction: column; }
          .cta-button, .cta-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      <section className="process-hero">
        <div className="hero-grid">
          <div className="hero-text">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', color: '#e7ad3e' }}>
              <Server size={18} />
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>STRATEGIC GROWTH. ENGINEERED.</span>
            </div>
            
            <h1>
              Engineering <span className="accent">Outcomes,</span><br />
              Not Campaigns
            </h1>
            
            <p>
              We build <span className="highlight">automated systems</span> that replace manual marketing work. 
              API-level control. Real-time optimization. Predictive intelligence. 
              <strong style={{ display: 'block', marginTop: '1rem', color: 'rgba(245, 240, 232, 0.85)' }}>
                40% lower costs. 3x faster execution. 294% average ROI.
              </strong>
            </p>
            
            <div className="cta-group">
              <Link to="/scanner" className="cta-button">
                Start Free Technical Audit <ArrowRight size={18} />
              </Link>
              <button className="cta-secondary" onClick={() => scrollToSection('systems')}>
                Explore Our Systems
              </button>
            </div>

            <div className="feature-grid">
              <div className="feature-item">
                <CheckCircle2 size={18} color="#e7ad3e" />
                <span>Programmatic Advertising Automation</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} color="#e7ad3e" />
                <span>Edge SEO Infrastructure</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} color="#e7ad3e" />
                <span>Server-Side Tracking Systems</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={18} color="#e7ad3e" />
                <span>Custom Analytics Pipelines</span>
              </div>
            </div>
          </div>

          <div className="pipeline-container">
            <div className="connector">
              <div className="connector-progress" style={{ height: `${(activeStep / 2) * 100}%` }}></div>
            </div>

            <div className={`pipeline-step ${activeStep === 0 ? 'step-active' : ''}`}>
              <div className="icon-box">
                <Database size={24} />
              </div>
              <div className="step-content">
                <h3>01. DATA LAYER</h3>
                <p>Unify CRM, inventory, margins, and analytics in real-time.</p>
              </div>
            </div>

            <div className={`pipeline-step ${activeStep === 1 ? 'step-active' : ''}`}>
              <div className="icon-box">
                <Cpu size={24} />
              </div>
              <div className="step-content">
                <h3>02. INTELLIGENCE ENGINE</h3>
                <p>ML models predict outcomes, optimize bids, and detect waste.</p>
              </div>
            </div>

            <div className={`pipeline-step ${activeStep === 2 ? 'step-active' : ''}`}>
              <div className="icon-box">
                <Globe size={24} />
              </div>
              <div className="step-content">
                <h3>03. EXECUTION LAYER</h3>
                <p>Deploy changes across Google, Meta, LinkedIn APIs automatically.</p>
              </div>
            </div>

            <div style={{ 
              marginTop: '1rem', 
              padding: '1.5rem', 
              background: 'rgba(0,0,0,0.3)', 
              borderRadius: '12px', 
              border: '1px solid rgba(231, 173, 62, 0.1)' 
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '0.5rem' 
              }}>
                <span style={{ fontSize: '0.7rem', color: '#e7ad3e', letterSpacing: '0.1em' }}>
                  LIVE SYSTEM STATUS
                </span>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    background: '#28c841',
                    boxShadow: '0 0 8px rgba(40,200,65,0.8)',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <BarChart3 size={14} color="#28c841" />
                </div>
              </div>
              <div style={{ 
                fontSize: '0.65rem', 
                color: 'rgba(245,240,232,0.4)', 
                lineHeight: 1.8,
                fontFamily: 'Space Mono, monospace'
              }}>
                <div style={{ color: '#28c841' }}>[OK] Google_Ads_API: Connected</div>
                <div style={{ color: '#28c841' }}>[OK] Meta_Marketing_API: Active</div>
                <div style={{ color: '#e7ad3e' }}>[EXEC] Optimizing 247 campaigns...</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};