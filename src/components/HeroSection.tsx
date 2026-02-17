import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Metrics = {
  revenue: number;
  campaigns: number;
  roi: number;
};

const START_METRICS: Metrics = {
  revenue: 2847392,
  campaigns: 23,
  roi: 294.02,
};

export const HeroSection = () => {
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({ revenue: 0, campaigns: 0, roi: 0 });

  const matrixCharacters = useMemo(
    () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$#%*+-'.split(''),
    [],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setMetrics(START_METRICS);
      return;
    }

    let animationFrame = 0;
    const startedAt = performance.now();
    const duration = 1400;

    const animateIn = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setMetrics({
        revenue: Math.round(START_METRICS.revenue * easeOut),
        campaigns: Math.round(START_METRICS.campaigns * easeOut),
        roi: Number((START_METRICS.roi * easeOut).toFixed(2)),
      });

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animateIn);
      }
    };

    animationFrame = window.requestAnimationFrame(animateIn);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return;
    }

    const ticker = window.setInterval(() => {
      setMetrics((current) => ({
        revenue: current.revenue + Math.floor(Math.random() * 1200),
        campaigns: current.campaigns + (Math.random() > 0.68 ? 1 : 0),
        roi: Number((current.roi + (Math.random() * 0.1 - 0.05)).toFixed(2)),
      }));
    }, 3200);

    return () => window.clearInterval(ticker);
  }, []);

  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }

    let rafId = 0;
    let drops: number[] = [];
    const fontSize = 16;
    const rootStyles = window.getComputedStyle(document.documentElement);
    const gold = rootStyles.getPropertyValue('--gold').trim();
    const matrixColor = gold ? `hsl(${gold})` : '#e7ad3e';

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * (canvas.height / fontSize)));
    };

    resize();

    if (reducedMotion) {
      ctx.fillStyle = 'rgba(15, 26, 22, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 12, 10, 0.11)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = matrixColor;
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const text = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }

      rafId = window.requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [matrixCharacters]);

  return (
    <section className="ol-hero" aria-label="Outcome Labs Hero">
      <canvas ref={matrixCanvasRef} className="ol-hero__matrix" aria-hidden="true" />
      <div className="ol-hero__vignette" aria-hidden="true" />

      <div className="container-lg ol-hero__container">
        <div className="ol-terminal" role="presentation">
          <header className="ol-terminal__header">
            <div className="ol-terminal__dots" aria-hidden="true">
              <span className="dot dot-red" />
              <span className="dot dot-amber" />
              <span className="dot dot-green" />
            </div>
            <p className="ol-terminal__title">outcome_labs@growth-engine:~$</p>
          </header>

          <div className="ol-terminal__body">
            <div className="ol-terminal__left">
              <p className="ol-commandline">
                <span className="ol-prompt">root@marketing:~$</span>
                <span className="ol-typing">./optimize --mode=engineering</span>
              </p>

              <pre className="ol-code-block" aria-hidden="true">
                <span className="comment">// Traditional agency approach</span>
                {'\n'}function manualCampaignManagement() {'{'}
                {'\n  '}return {'{'} cost: "$10k/month", optimization: "manual", speed: "weekly" {'}'}
                {'\n'}{'}'}
                {'\n\n'}<span className="comment">// Outcome Labs engineering approach</span>
                {'\n'}function automatedGrowth() {'{'}
                {'\n  '}return {'{'} cost: "$5k + performance", optimization: "API automation", speed: "24/7" {'}'}
                {'\n'}{'}'}
                {'\n\n'}<span className="success">// Build success: 40% cost reduction compiled</span>
              </pre>

              <h1 className="ol-headline" data-text="Engineering Outcomes, Not Campaigns">
                Engineering Outcomes, Not Campaigns
              </h1>

              <p className="ol-tagline">
                We write code that controls ad platform APIs. While agencies click buttons,
                our systems optimize continuously.
              </p>

              <div className="ol-metrics" aria-live="polite">
                <article className="ol-metric-item">
                  <p className="label">LIVE REV</p>
                  <p className="value">${metrics.revenue.toLocaleString()}</p>
                  <p className="suffix">generated last hour</p>
                </article>
                <article className="ol-metric-item">
                  <p className="label">CAMPAIGNS</p>
                  <p className="value">{metrics.campaigns}</p>
                  <p className="suffix">optimized today</p>
                </article>
                <article className="ol-metric-item">
                  <p className="label">ROI</p>
                  <p className="value">{metrics.roi.toFixed(2)}%</p>
                  <p className="suffix">blended average</p>
                </article>
              </div>

              <div className="ol-cta-group">
                <Button variant="hero" size="xl" asChild className="ol-cta-primary">
                  <Link to="/scanner">
                    Start Free Audit
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" className="ol-cta-secondary">
                  Book Strategy Call
                </Button>
              </div>

              <div className="ol-social-proof">
                <p>Trusted by 131 technical teams:</p>
                <div className="ol-logo-row" aria-hidden="true">
                  <span>[FINTECH-01]</span>
                  <span>[SAAS-OPS]</span>
                  <span>[RETAIL-AI]</span>
                  <span>[B2B-CLOUD]</span>
                </div>
              </div>
            </div>

            <aside className="ol-terminal__right" aria-label="Traditional vs Engineering comparison">
              <div className="ol-split-card ol-split-card--left">
                <h2>Traditional Agency</h2>
                <ul>
                  <li><X className="h-4 w-4" /> Manual campaign changes</li>
                  <li><X className="h-4 w-4" /> Flat $10k monthly retainer</li>
                  <li><X className="h-4 w-4" /> Weekly optimization cadence</li>
                  <li><X className="h-4 w-4" /> Lagging attribution</li>
                </ul>
              </div>

              <div className="ol-versus">VS</div>

              <div className="ol-split-card ol-split-card--right">
                <h2>Engineering Approach</h2>
                <ul>
                  <li><Check className="h-4 w-4" /> API-level automation</li>
                  <li><Check className="h-4 w-4" /> $5k + performance model</li>
                  <li><Check className="h-4 w-4" /> Real-time optimization loop</li>
                  <li><Check className="h-4 w-4" /> End-to-end instrumentation</li>
                </ul>
              </div>
            </aside>
          </div>

          <footer className="ol-terminal__footer">
            <span className="status-dot" aria-hidden="true" />
            <span>System: OPTIMIZING</span>
            <span className="sep">|</span>
            <span>Connection: SECURE</span>
            <span className="sep">|</span>
            <span>
              Performance: <span className="ol-bars" aria-hidden="true" />
            </span>
          </footer>
        </div>
      </div>
    </section>
  );
};
