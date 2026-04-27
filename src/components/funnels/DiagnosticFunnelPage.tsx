import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Briefcase,
  Compass,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Vote,
} from 'lucide-react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { conversionFunnels, type FunnelConfig, type FunnelId, type FunnelTier } from '@/data/conversionFunnels';

type AnswerValue = string | string[];

type LeadState = {
  fullName: string;
  organization: string;
  whatsapp: string;
  email: string;
};

const icons = {
  'drive-revenue': Briefcase,
  'own-your-market': Compass,
  'win-elections': Vote,
};

const bookingLinks: Record<FunnelId, string> = {
  'drive-revenue': process.env.NEXT_PUBLIC_REVENUE_BOOKING_URL ?? '#',
  'own-your-market': process.env.NEXT_PUBLIC_MARKET_BOOKING_URL ?? '#',
  'win-elections': process.env.NEXT_PUBLIC_ELECTORAL_BOOKING_URL ?? '#',
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isPhone = (value: string) => /^[+\d][\d\s()-]{6,}$/.test(value.trim());

const getAnsweredScore = (config: FunnelConfig, answers: Record<string, AnswerValue>) => {
  let score = 0;

  for (const question of config.questions) {
    const answer = answers[question.id];
    if (!answer) continue;

    if (question.type === 'multi_select' && Array.isArray(answer)) {
      score += answer.reduce((sum, value) => {
        const option = question.options?.find((entry) => entry.value === value);
        return sum + (option?.score ?? 0);
      }, 0);
      continue;
    }

    if (typeof answer === 'string') {
      const option = question.options?.find((entry) => entry.value === answer);
      score += option?.score ?? 6;
    }
  }

  return Math.max(0, Math.min(100, Math.round((score / (config.questions.length * 20)) * 100)));
};

const getTier = (config: FunnelConfig, score: number): FunnelTier =>
  config.tiers.find((tier) => score >= tier.minScore) ?? config.tiers[config.tiers.length - 1];

const getScoreColor = (score: number) => {
  if (score >= 75) return 'text-red-400';
  if (score >= 55) return 'text-amber-300';
  if (score >= 30) return 'text-teal-300';
  return 'text-emerald-300';
};

export const DiagnosticFunnelPage = ({ funnelId }: { funnelId: FunnelId }) => {
  const config = conversionFunnels[funnelId];
  const [searchParams] = useSearchParams();
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [lead, setLead] = useState<LeadState>({
    fullName: '',
    organization: '',
    whatsapp: '',
    email: '',
  });
  const [showScore, setShowScore] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const Icon = icons[funnelId];
  const bookingUrl = bookingLinks[funnelId];
  const score = useMemo(() => getAnsweredScore(config, answers), [answers, config]);
  const tier = useMemo(() => getTier(config, score), [config, score]);

  const prefilledContext = useMemo(
    () =>
      config.prequalifier
        .map((step) => {
          const value = searchParams.get(step.id);
          const option = step.options.find((entry) => entry.value === value);
          if (!option) return null;
          return { label: step.prompt, value: option.label };
        })
        .filter(Boolean) as Array<{ label: string; value: string }>,
    [config.prequalifier, searchParams],
  );

  const completedQuestions = config.questions.filter((question) => {
    const answer = answers[question.id];
    if (Array.isArray(answer)) return answer.length > 0;
    return typeof answer === 'string' && answer.trim().length > 0;
  }).length;

  const allQuestionsAnswered = completedQuestions === config.questions.length;
  const leadValid =
    lead.fullName.trim().length > 1 &&
    lead.organization.trim().length > 1 &&
    isPhone(lead.whatsapp) &&
    isEmail(lead.email);

  const updateAnswer = (questionId: string, value: AnswerValue) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setShowScore(false);
  };

  const toggleMultiSelect = (questionId: string, value: string) => {
    const currentValue = answers[questionId];
    const currentList = Array.isArray(currentValue) ? currentValue : [];
    updateAnswer(
      questionId,
      currentList.includes(value)
        ? currentList.filter((entry) => entry !== value)
        : [...currentList, value],
    );
  };

  const submitLeadGate = () => {
    setAttemptedSubmit(true);
    if (!allQuestionsAnswered || !leadValid) return;
    setShowScore(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border/50 pb-20 pt-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--gold)/0.12),transparent_36%),radial-gradient(circle_at_bottom_right,hsl(var(--teal)/0.14),transparent_40%)]" />
          <div className="container-lg relative">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_380px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{config.eyebrow}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-gold/25 bg-gold/10 text-gold">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm text-muted-foreground">
                    Intent Signal: <span className="text-foreground">{config.intentSignal}</span>
                  </div>
                </div>
                <h1 className="mt-8 max-w-4xl text-5xl font-display font-bold leading-tight text-foreground md:text-6xl">
                  {config.headline}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{config.subheadline}</p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{config.trustLine}</p>

                <div className="mt-8 rounded-3xl border border-gold/25 bg-card/45 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Core Positioning</p>
                  <p className="mt-3 text-2xl font-display text-foreground">{config.principle}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {config.positioning.map((point) => (
                      <div key={point} className="rounded-2xl border border-border/50 bg-background/35 p-4 text-sm leading-6 text-muted-foreground">
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="glass-card h-fit border-border/50 p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gold" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Routing Context</p>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-border/50 bg-background/35 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Destination</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{config.destinationLabel}</p>
                  </div>
                  {prefilledContext.length > 0 ? (
                    prefilledContext.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-border/50 bg-background/35 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                        <p className="mt-2 text-sm leading-6 text-foreground">{item.value}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border/50 bg-background/30 p-4 text-sm leading-6 text-muted-foreground">
                      Opened directly without homepage pre-qualification. The diagnostic still works normally.
                    </div>
                  )}
                  <Button asChild variant="gold" size="lg" className="w-full gap-2">
                    <a href="#diagnostic">
                      {config.heroCta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-padding border-b border-border/50">
          <div className="container-lg">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Operational Sequence</p>
                <h2 className="mt-3 text-4xl font-display font-bold text-foreground">The four-step system behind this path</h2>
              </div>
              <div className="max-w-xl text-sm leading-7 text-muted-foreground">
                Homepage click, two-step pre-qualifier, full diagnostic, score output, then the correct booking pathway.
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {config.process.map((item) => (
                <Card key={item.title} className="glass-card border-border/50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{item.step}</p>
                  <h3 className="mt-3 text-2xl font-display text-foreground">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding border-b border-border/50">
          <div className="container-lg">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Systems Stack</p>
              <h2 className="mt-3 text-4xl font-display font-bold text-foreground">Instrumentation and deployment layers</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {config.systems.map((system) => (
                <Card key={system.name} className="glass-card border-border/50 p-6">
                  <h3 className="text-xl font-display text-foreground">{system.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{system.description}</p>
                  <pre className="mt-5 overflow-x-auto rounded-2xl border border-border/50 bg-background/55 p-4 font-mono text-xs text-gold">
                    {system.code}
                  </pre>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="diagnostic" className="section-padding">
          <div className="container-lg">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_380px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Diagnostic</p>
                <h2 className="mt-3 text-4xl font-display font-bold text-foreground">{config.destinationLabel}</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                  Complete the full diagnostic, then unlock your score by providing contact details for delivery and follow-up.
                </p>

                <div className="mt-8 space-y-5">
                  {config.questions.map((question, index) => (
                    <Card key={question.id} className="glass-card border-border/50 p-6">
                      <div className="mb-5 flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-sm font-semibold text-gold">
                          {index + 1}
                        </div>
                        <p className="text-lg font-semibold text-foreground">{question.question}</p>
                      </div>

                      {(question.type === 'single_select' || question.type === 'range_input' || question.type === 'yes_no') && (
                        <div className="grid gap-3 md:grid-cols-2">
                          {question.options?.map((option) => {
                            const selected = answers[question.id] === option.value;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => updateAnswer(question.id, option.value)}
                                className={cn(
                                  'rounded-2xl border px-4 py-4 text-left transition-all',
                                  selected
                                    ? 'border-gold bg-gold/10 text-foreground'
                                    : 'border-border/60 bg-background/30 text-muted-foreground hover:border-gold/40 hover:text-foreground',
                                )}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {question.type === 'multi_select' && (
                        <div className="grid gap-3 md:grid-cols-2">
                          {question.options?.map((option) => {
                            const selected = Array.isArray(answers[question.id]) && answers[question.id].includes(option.value);
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => toggleMultiSelect(question.id, option.value)}
                                className={cn(
                                  'rounded-2xl border px-4 py-4 text-left transition-all',
                                  selected
                                    ? 'border-gold bg-gold/10 text-foreground'
                                    : 'border-border/60 bg-background/30 text-muted-foreground hover:border-gold/40 hover:text-foreground',
                                )}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {question.type === 'open_text' && (
                        <Textarea
                          value={typeof answers[question.id] === 'string' ? answers[question.id] : ''}
                          onChange={(event) => updateAnswer(question.id, event.target.value)}
                          placeholder={question.placeholder}
                          className="min-h-32 border-border/60 bg-background/35"
                        />
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="glass-card sticky top-28 border-border/50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Lead Capture Gate</p>
                  <h3 className="mt-3 text-3xl font-display text-foreground">Unlock the score</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Required before the score is shown on-screen. This mirrors the CRM handoff fields in the blueprint.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor={`${funnelId}-name`}>Full Name</Label>
                      <Input id={`${funnelId}-name`} value={lead.fullName} onChange={(event) => setLead((current) => ({ ...current, fullName: event.target.value }))} className="mt-2 border-border/60 bg-background/35" />
                    </div>
                    <div>
                      <Label htmlFor={`${funnelId}-organization`}>{config.leadLabel} / Organisation</Label>
                      <Input id={`${funnelId}-organization`} value={lead.organization} onChange={(event) => setLead((current) => ({ ...current, organization: event.target.value }))} className="mt-2 border-border/60 bg-background/35" />
                    </div>
                    <div>
                      <Label htmlFor={`${funnelId}-whatsapp`}>WhatsApp Number</Label>
                      <Input id={`${funnelId}-whatsapp`} value={lead.whatsapp} onChange={(event) => setLead((current) => ({ ...current, whatsapp: event.target.value }))} className="mt-2 border-border/60 bg-background/35" />
                    </div>
                    <div>
                      <Label htmlFor={`${funnelId}-email`}>Email Address</Label>
                      <Input id={`${funnelId}-email`} type="email" value={lead.email} onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} className="mt-2 border-border/60 bg-background/35" />
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border/50 bg-background/35 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Diagnostic completion</span>
                      <span className="font-semibold text-foreground">{completedQuestions}/{config.questions.length}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-gradient-to-r from-gold to-gold-glow transition-all" style={{ width: `${(completedQuestions / config.questions.length) * 100}%` }} />
                    </div>
                  </div>

                  {attemptedSubmit && (!allQuestionsAnswered || !leadValid) && (
                    <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-6 text-red-200">
                      Complete every diagnostic question and provide valid contact details before the score is revealed.
                    </div>
                  )}

                  <Button variant="gold" size="lg" onClick={submitLeadGate} className="mt-6 w-full gap-2">
                    Reveal My Score
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gold" />
                      Score summary email
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-gold" />
                      WhatsApp follow-up sequence ready
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gold" />
                      CTA output matched to score tier
                    </div>
                  </div>
                </Card>

                {showScore && (
                  <Card className="glass-card border-gold/30 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{config.scoreTitle}</p>
                    <div className="mt-4 flex items-end justify-between gap-6">
                      <div>
                        <p className={cn('text-6xl font-bold', getScoreColor(score))}>{score}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{config.scoreSubtitle}</p>
                      </div>
                      <div className="rounded-2xl border border-gold/25 bg-gold/10 px-4 py-3 text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Tier</p>
                        <p className="mt-2 text-lg font-semibold text-foreground">{tier.label}</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-border/50 bg-background/35 p-5">
                      <p className="text-sm leading-7 text-muted-foreground">{tier.ctaTitle}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <Button asChild={bookingUrl !== '#'} variant="gold" size="lg" className="w-full gap-2">
                        {bookingUrl !== '#' ? (
                          <a href={bookingUrl} target="_blank" rel="noreferrer">
                            {tier.ctaButton}
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        ) : (
                          <span>
                            {tier.ctaButton}
                            <ArrowRight className="ml-2 inline h-4 w-4" />
                          </span>
                        )}
                      </Button>
                      <Button variant="heroOutline" asChild className="w-full">
                        <Link href="/">Back to Homepage Router</Link>
                      </Button>
                    </div>

                    {bookingUrl === '#' && (
                      <p className="mt-4 text-xs leading-6 text-muted-foreground">
                        Booking link is environment-driven. Set {config.bookingUrlEnv} to connect the live CTA.
                      </p>
                    )}
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
