export type FunnelId = 'drive-revenue' | 'own-your-market' | 'win-elections';

export type FunnelTier = {
  key: string;
  label: string;
  minScore: number;
  ctaTitle: string;
  ctaButton: string;
};

export type FunnelQuestionOption = {
  value: string;
  label: string;
  score?: number;
};

export type FunnelQuestion = {
  id: string;
  question: string;
  type: 'single_select' | 'multi_select' | 'yes_no' | 'range_input' | 'open_text';
  options?: FunnelQuestionOption[];
  placeholder?: string;
};

export type FunnelPrequalifierStep = {
  id: string;
  prompt: string;
  type: 'single_select';
  options: FunnelQuestionOption[];
};

export type FunnelConfig = {
  id: FunnelId;
  route: `/${FunnelId}`;
  navLabel: string;
  buttonLabel: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  trustLine: string;
  heroCta: string;
  intentSignal: string;
  destinationLabel: string;
  principle: string;
  positioning: string[];
  process: Array<{ step: string; title: string; body: string }>;
  systems: Array<{ name: string; description: string; code: string }>;
  questions: FunnelQuestion[];
  prequalifier: FunnelPrequalifierStep[];
  scoreTitle: string;
  scoreSubtitle: string;
  leadLabel: string;
  terminalCtaLabel: string;
  bookingUrlEnv: 'VITE_REVENUE_BOOKING_URL' | 'VITE_MARKET_BOOKING_URL' | 'VITE_ELECTORAL_BOOKING_URL';
  tiers: FunnelTier[];
};

export const conversionFunnels: Record<FunnelId, FunnelConfig> = {
  'drive-revenue': {
    id: 'drive-revenue',
    route: '/drive-revenue',
    navLabel: 'Drive Revenue',
    buttonLabel: 'Engineer My Revenue',
    eyebrow: 'Path 01 / 03  //  drive_revenue.sys',
    headline: 'Scan Your Business for Revenue Leaks',
    subheadline:
      "Most businesses don't have a traffic problem. They have an instrumentation problem. We find the exact stage your pipeline is leaking and build custom technology to seal it.",
    trustLine: 'No templates. No guessing. No agencies. Engineers who instrument, measure, and build.',
    heroCta: 'Start My Revenue Scan',
    intentSignal: '"My business is bleeding. Show me where."',
    destinationLabel: 'Revenue Leak Scanner',
    principle: "You don't have a traffic problem. You don't have a conversion problem. You have an instrumentation problem.",
    positioning: [
      'The question is whether you will keep pouring faster or engineer the pipes.',
      'Outcome Labs diagnoses the measured constraint before recommending a build.',
    ],
    process: [
      { step: 'Step 01', title: 'Instrumentation', body: 'Map pipeline stages and install behavioral tracking before a single recommendation is made.' },
      { step: 'Step 02', title: 'Leak Detection', body: 'Find the highest-pressure leak using users affected, revenue per user, and downstream compound impact.' },
      { step: 'Step 03', title: 'Systems Build', body: 'Deploy custom trust, payment, and delivery systems aligned to the measured failure point.' },
      { step: 'Step 04', title: 'Measure & Seal', body: 'Ship the fix, verify the delta, and move to the next highest-impact leak.' },
    ],
    systems: [
      { name: 'Pipeline Instrumentation Engine', description: 'Tracks hesitation, abandonment, and intent degradation at each pipeline stage.', code: 'leak_impact = users * rev_per_user * compound_factor' },
      { name: 'WhatsApp Trust Trigger System', description: 'Detects checkout hesitation and fires a human-verified confirmation message at the right moment.', code: 'trigger: hesitation_score > 0.72 -> wa_confirm()' },
      { name: 'Smart Payment Router', description: 'Surfaces the most reliable payment method first using prior user payment behavior.', code: 'route: history_score -> optimal_gateway()' },
      { name: 'Delivery Commitment Engine', description: 'Turns vague delivery windows into precise dates generated from logistics data.', code: 'display: logistics_data -> precision_date()' },
      { name: 'Conversion Attribution Stack', description: 'Maps revenue back to touchpoints instead of relying on vanity last-click reporting.', code: 'attr: multi_touch -> revenue_source_map()' },
      { name: 'SEO Revenue Pipeline', description: 'Builds entry points around buyer intent, not traffic vanity.', code: 'target: intent_keywords -> pipeline_entry()' },
    ],
    questions: [
      { id: 'traffic_source', question: 'Where does most of your traffic currently come from?', type: 'single_select', options: [{ value: 'paid', label: 'Paid ads', score: 16 }, { value: 'organic', label: 'Organic search / content', score: 8 }, { value: 'social', label: 'Social media', score: 12 }, { value: 'referrals', label: 'Referrals / partnerships', score: 6 }, { value: 'mixed', label: 'Mixed / unclear', score: 14 }] },
      { id: 'dropoff_stage', question: 'At which stage do most potential customers drop off?', type: 'single_select', options: [{ value: 'awareness', label: 'Awareness', score: 10 }, { value: 'consideration', label: 'Consideration', score: 16 }, { value: 'checkout', label: 'Checkout', score: 20 }, { value: 'unknown', label: "We don't know", score: 18 }] },
      { id: 'stage_measurement', question: 'Do you currently measure abandonment at each funnel stage separately?', type: 'yes_no', options: [{ value: 'yes', label: 'Yes', score: 0 }, { value: 'no', label: 'No', score: 18 }] },
      { id: 'trust_verification', question: 'How does your audience typically verify trust before buying?', type: 'multi_select', options: [{ value: 'reviews', label: 'Reviews', score: 4 }, { value: 'whatsapp', label: 'WhatsApp', score: 8 }, { value: 'referrals', label: 'Referrals', score: 3 }, { value: 'phone', label: 'Phone call', score: 6 }, { value: 'unclear', label: 'We are not sure', score: 10 }] },
      { id: 'ad_efficiency', question: 'What best describes your current ad spend versus attributed revenue?', type: 'range_input', options: [{ value: 'no_ads', label: 'No active ad spend', score: 6 }, { value: 'unclear_roas', label: 'We spend, but cannot attribute revenue confidently', score: 20 }, { value: 'break_even', label: 'Roughly break-even', score: 14 }, { value: 'profitable', label: 'Profitable and measurable', score: 4 }] },
      { id: 'behavior_tools', question: 'Do you have session recording or behavioral heatmaps installed?', type: 'yes_no', options: [{ value: 'yes', label: 'Yes', score: 0 }, { value: 'no', label: 'No', score: 16 }] },
      { id: 'biggest_blocker', question: 'What is the single biggest thing you believe is stopping conversions right now?', type: 'open_text', placeholder: 'Describe the bottleneck in your own words.' },
    ],
    prequalifier: [
      { id: 'revenue_pressure', prompt: 'Where is the pressure showing up most right now?', type: 'single_select', options: [{ value: 'traffic_waste', label: 'Traffic is coming, but money is leaking.' }, { value: 'checkout_loss', label: 'People get close, then disappear at checkout.' }, { value: 'measurement_blind', label: "We cannot prove where the leak actually is." }] },
      { id: 'urgency', prompt: 'How quickly do you need the leak identified?', type: 'single_select', options: [{ value: '5_days', label: 'Within 5 business days' }, { value: '30_days', label: 'Within the next month' }, { value: 'planning', label: 'We are planning the next growth phase' }] },
    ],
    scoreTitle: 'Revenue Leak Score',
    scoreSubtitle: 'A deterministic read on where revenue pressure is compounding.',
    leadLabel: 'Business',
    terminalCtaLabel: 'Book Growth Strategy Call',
    bookingUrlEnv: 'VITE_REVENUE_BOOKING_URL',
    tiers: [
      { key: 'critical-bleed', label: 'Critical Bleed', minScore: 75, ctaTitle: 'Your pipeline is actively haemorrhaging revenue. We can instrument the system and start sealing leaks within 5 business days.', ctaButton: 'Book Emergency Session' },
      { key: 'high-leak-pressure', label: 'High Leak Pressure', minScore: 55, ctaTitle: 'Multiple leaks are compounding. A growth strategy session will map your highest-impact fix and build the engineering roadmap.', ctaButton: 'Book Growth Strategy Call' },
      { key: 'detectable-gaps', label: 'Detectable Gaps', minScore: 30, ctaTitle: 'You have a workable foundation. Let us build the instrumentation layer to identify and close the remaining gaps systematically.', ctaButton: 'Book Systems Audit' },
      { key: 'system-optimised', label: 'System Optimised', minScore: 0, ctaTitle: 'Your pipeline is comparatively tight. The next phase is disciplined scale with measurement intact.', ctaButton: 'Book Scale Planning Call' },
    ],
  },
  'own-your-market': {
    id: 'own-your-market',
    route: '/own-your-market',
    navLabel: 'Own Your Market',
    buttonLabel: 'Dominate My Market',
    eyebrow: 'Path 02 / 03  //  own_market.sys',
    headline: "How Strong Is Your Brand's Digital Position?",
    subheadline: 'Most brands post constantly and own nothing. Platforms reward surprise, not volume. We measure your engagement velocity, map authority gaps, and engineer the distribution system.',
    trustLine: 'API-level control of LinkedIn, Meta, and Google. Not a social media manager. A distribution system.',
    heroCta: 'Scan My Market Position',
    intentSignal: '"We exist, but we are not owning enough attention."',
    destinationLabel: 'Brand Intelligence Scan',
    principle: 'Engagement velocity is not how many people react. It is how much faster and stronger they react than the platform expects for an account of that size.',
    positioning: ['Small brands can dominate large ones. Large brands can be algorithmically suppressed.', 'Outcome Labs engineers signal strength, not content volume.'],
    process: [
      { step: 'Step 01', title: 'Signal Audit', body: 'Map active channels and measure engagement velocity against what the algorithm expects for that audience size.' },
      { step: 'Step 02', title: 'Authority Mapping', body: 'Expose the gap between perceived positioning and actual category share, then identify the white-space nodes.' },
      { step: 'Step 03', title: 'Distribution Build', body: 'Engineer content, community, influencer, and API distribution systems that spike velocity.' },
      { step: 'Step 04', title: 'Position Monitor', body: 'Track share of voice, search lift, and sentiment as systems metrics, not vanity numbers.' },
    ],
    systems: [
      { name: 'Engagement Velocity Engine', description: 'Measures performance against the baseline expected for audience size to detect suppression early.', code: 'velocity = events/time ÷ expected_for_audience_size' },
      { name: 'Competitor Intelligence Map', description: 'Tracks competitor output, keyword dominance, and content gaps your brand can claim.', code: 'gap_map: competitor_signals -> opportunity_nodes()' },
      { name: 'API Distribution Stack', description: 'Controls LinkedIn, Meta, and Google at API level for precision audiences and programmatic distribution.', code: 'access: api_control > dashboard_access' },
      { name: 'Community Engineering System', description: 'Structures communities as velocity multipliers with retention and contribution loops.', code: 'community: retention_loop -> organic_amplify()' },
      { name: 'Influencer Activation Network', description: 'Selects micro-influencers by velocity ratio, not follower count.', code: 'select: velocity_ratio > follower_count' },
      { name: 'Reputation Intelligence Layer', description: 'Monitors mentions, sentiment shifts, and narrative threats before they become crises.', code: 'monitor: sentiment_delta -> alert + response_draft()' },
    ],
    questions: [
      { id: 'active_platforms', question: 'Which platforms are you currently active on, and which drives the most inbound leads?', type: 'multi_select', options: [{ value: 'linkedin', label: 'LinkedIn', score: 4 }, { value: 'instagram', label: 'Instagram', score: 6 }, { value: 'facebook', label: 'Facebook', score: 6 }, { value: 'x', label: 'X / Twitter', score: 5 }, { value: 'youtube', label: 'YouTube', score: 4 }, { value: 'unclear', label: 'We are active, but inbound source is unclear', score: 10 }] },
      { id: 'velocity_tracking', question: 'Do you know your engagement velocity ratio, or are you measuring only likes and followers?', type: 'yes_no', options: [{ value: 'yes', label: 'We track velocity', score: 0 }, { value: 'no', label: 'We mostly watch total likes/followers', score: 16 }] },
      { id: 'competitor_tracking', question: 'Do you track competitor content performance systematically?', type: 'single_select', options: [{ value: 'systematic', label: 'Yes, systematically', score: 0 }, { value: 'sporadic', label: 'Only occasionally', score: 10 }, { value: 'none', label: 'No structured tracking', score: 18 }] },
      { id: 'brand_position', question: 'Is your brand currently perceived as an authority, a peer, or a vendor in your market?', type: 'single_select', options: [{ value: 'authority', label: 'Authority', score: 2 }, { value: 'peer', label: 'Peer', score: 10 }, { value: 'vendor', label: 'Vendor', score: 18 }, { value: 'unclear', label: 'Unclear', score: 14 }] },
      { id: 'performance_surprises', question: 'Have you had content perform unexpectedly well or badly without knowing why?', type: 'yes_no', options: [{ value: 'yes', label: 'Yes', score: 14 }, { value: 'no', label: 'No', score: 4 }] },
      { id: 'distribution_system', question: 'Do you have a structured content distribution system, or are you posting and hoping?', type: 'single_select', options: [{ value: 'system', label: 'Structured distribution system', score: 0 }, { value: 'partial', label: 'Partial system', score: 10 }, { value: 'posting', label: 'Posting and hoping', score: 18 }] },
      { id: 'dominance_goal', question: 'What does market dominance look like for your brand in 12 months?', type: 'open_text', placeholder: 'Describe the category position you want to own.' },
    ],
    prequalifier: [
      { id: 'signal_state', prompt: 'Which condition sounds most like your brand today?', type: 'single_select', options: [{ value: 'invisible', label: 'We post, but the market barely feels us.' }, { value: 'visible', label: 'We are visible, but not category-defining.' }, { value: 'challenger', label: 'We are close, but distribution is inconsistent.' }] },
      { id: 'dominance_horizon', prompt: 'What is the timing pressure on this market push?', type: 'single_select', options: [{ value: 'now', label: 'We need authority lift now.' }, { value: 'quarter', label: 'We need it this quarter.' }, { value: 'year', label: 'We are planning the next 12 months.' }] },
    ],
    scoreTitle: 'Authority Score',
    scoreSubtitle: 'A read on your current digital position and distribution strength.',
    leadLabel: 'Brand',
    terminalCtaLabel: 'Book Brand Strategy Call',
    bookingUrlEnv: 'VITE_MARKET_BOOKING_URL',
    tiers: [
      { key: 'invisible-brand', label: 'Invisible Brand', minScore: 75, ctaTitle: 'Your brand has no detectable signal. We will audit the channels, map the algorithm gaps, and build a distribution system from the ground up.', ctaButton: 'Book Brand Audit' },
      { key: 'growing-signal', label: 'Growing Signal', minScore: 55, ctaTitle: 'There is traction, but no reliable amplification system. We can turn momentum into controlled distribution.', ctaButton: 'Book Signal Strategy Call' },
      { key: 'category-challenger', label: 'Category Challenger', minScore: 35, ctaTitle: 'You are visible but not owning the category. One well-engineered distribution push can flip the position.', ctaButton: 'Book Dominance Strategy' },
      { key: 'market-authority', label: 'Market Authority', minScore: 15, ctaTitle: 'You already have a strong signal. The next move is compound authority and defend the category edge.', ctaButton: 'Book Authority Expansion Call' },
      { key: 'dominant-position', label: 'Dominant Position', minScore: 0, ctaTitle: 'The system is already strong. We focus next on protecting velocity and widening the moat.', ctaButton: 'Book Distribution Review' },
    ],
  },
  'win-elections': {
    id: 'win-elections',
    route: '/win-elections',
    navLabel: 'Win Elections',
    buttonLabel: 'Power My Campaign',
    eyebrow: 'Path 03 / 03  //  win_elections.sys',
    headline: 'Is Your Campaign Digitally Ready to Win?',
    subheadline: 'Modern elections are won and lost on digital infrastructure. We assess your campaign across critical readiness vectors and deploy the systems professional campaigns use to control narratives, mobilise voters, and neutralise opposition.',
    trustLine: 'Confidential engagements. Operational discretion. Senior-level access only.',
    heroCta: 'Assess My Campaign Readiness',
    intentSignal: '"I need digital infrastructure that wins elections."',
    destinationLabel: 'Campaign Readiness Assessment',
    principle: 'We build digital war rooms, not social media pages. Every campaign is an intelligence operation.',
    positioning: ['We do not manage Facebook pages for politicians.', 'We deploy systems that win elections.'],
    process: [
      { step: 'Step 01', title: 'Digital Audit', body: 'Assess current digital presence, message discipline, and opposition monitoring before the campaign intensifies.' },
      { step: 'Step 02', title: 'War Room Build', body: 'Deploy rapid response systems, grassroots WhatsApp structures, and targeted messaging infrastructure.' },
      { step: 'Step 03', title: 'Voter Intelligence', body: 'Map sentiment by constituency and design precision message delivery by segment.' },
      { step: 'Step 04', title: 'Rapid Response Ops', body: 'Monitor narrative threats around the clock and counter moves before they reach mass audience.' },
    ],
    systems: [
      { name: 'Digital War Room Platform', description: 'Centralized command dashboard for sentiment, threats, response drafts, and deployment workflows.', code: 'ops: monitor -> detect -> draft -> deploy()' },
      { name: 'Voter Sentiment Engine', description: 'Processes social, community, and local news signals into constituency-level sentiment maps.', code: 'sentiment: signals -> constituency_map -> score()' },
      { name: 'WhatsApp Grassroots Network', description: 'Runs community captains, ward coordinators, and voter mobilisation chains at scale.', code: 'network: api_layer -> coordinator_tree -> voter()' },
      { name: 'Precision Message Targeting', description: 'Matches demographic and issue sensitivity signals to message variants.', code: 'msg: segment_profile -> variant_match -> deliver()' },
      { name: 'Opposition Monitoring System', description: 'Tracks opposition messaging, spend patterns, and threat vectors before they break wide.', code: 'watch: opp_signals -> threat_score -> counter()' },
      { name: 'Data Operations Layer', description: 'Collects, cleans, segments, and activates compliant voter and field data.', code: 'data: collect -> clean -> segment -> activate()' },
    ],
    questions: [
      { id: 'office_context', question: 'What office are you contesting and what is the current state of your digital infrastructure?', type: 'open_text', placeholder: 'Summarize the race and your current digital setup.' },
      { id: 'digital_team', question: 'Do you have a structured digital team or are you relying on a single social media person?', type: 'single_select', options: [{ value: 'war_room', label: 'Structured digital team', score: 2 }, { value: 'partial', label: 'Small team with gaps', score: 12 }, { value: 'single_operator', label: 'Single social media operator', score: 20 }] },
      { id: 'opposition_monitoring', question: 'Are you systematically monitoring opposition digital activity in a documented way?', type: 'yes_no', options: [{ value: 'yes', label: 'Yes', score: 0 }, { value: 'no', label: 'No', score: 16 }] },
      { id: 'grassroots_network', question: 'Do you have an active WhatsApp-based grassroots activation network already deployed?', type: 'yes_no', options: [{ value: 'yes', label: 'Yes', score: 0 }, { value: 'no', label: 'No', score: 18 }] },
      { id: 'sentiment_inputs', question: 'How are you currently tracking voter sentiment?', type: 'multi_select', options: [{ value: 'surveys', label: 'Surveys', score: 3 }, { value: 'social_listening', label: 'Social listening', score: 4 }, { value: 'field_reports', label: 'Field reports', score: 5 }, { value: 'local_news', label: 'Local news monitoring', score: 4 }, { value: 'none', label: 'No structured system', score: 10 }] },
      { id: 'election_timing', question: 'How many weeks until the election, and what stage is your narrative currently in?', type: 'single_select', options: [{ value: '0_6', label: '0 to 6 weeks', score: 20 }, { value: '7_16', label: '7 to 16 weeks', score: 12 }, { value: '17_plus', label: '17+ weeks', score: 6 }] },
      { id: 'active_attacks', question: 'Have you experienced coordinated online attacks or narrative threats from opposition forces?', type: 'yes_no', options: [{ value: 'yes', label: 'Yes', score: 16 }, { value: 'no', label: 'No', score: 4 }] },
      { id: 'critical_vulnerability', question: "What is your campaign's single most critical digital vulnerability right now?", type: 'open_text', placeholder: 'Describe the vulnerability that worries leadership most.' },
    ],
    prequalifier: [
      { id: 'campaign_state', prompt: 'Which condition best describes the campaign right now?', type: 'single_select', options: [{ value: 'exposed', label: 'We are digitally exposed and vulnerable.' }, { value: 'partial', label: 'We have some systems, but major blind spots remain.' }, { value: 'final_push', label: 'We are entering a high-stakes final stretch.' }] },
      { id: 'access_level', prompt: 'Who needs to be in the confidential review?', type: 'single_select', options: [{ value: 'principal', label: 'Principal candidate only' }, { value: 'senior_team', label: 'Candidate and senior campaign team' }, { value: 'digital_lead', label: 'Digital lead preparing the briefing' }] },
    ],
    scoreTitle: 'Campaign Readiness Score',
    scoreSubtitle: 'An operational read on digital readiness, vulnerability, and war room capacity.',
    leadLabel: 'Campaign',
    terminalCtaLabel: 'Request Confidential Assessment',
    bookingUrlEnv: 'VITE_ELECTORAL_BOOKING_URL',
    tiers: [
      { key: 'digitally-exposed', label: 'Digitally Exposed', minScore: 78, ctaTitle: 'Your campaign has critical digital vulnerabilities that opposition forces could exploit before election day. Request a confidential infrastructure assessment.', ctaButton: 'Request Confidential Assessment' },
      { key: 'underprepared', label: 'Underprepared', minScore: 58, ctaTitle: 'Partial systems are in place, but operational gaps remain. A confidential review will identify the missing infrastructure and command risks.', ctaButton: 'Request Strategic Briefing' },
      { key: 'partially-equipped', label: 'Partially Equipped', minScore: 38, ctaTitle: 'You have a foundation. The next step is to close readiness gaps before they become vulnerabilities under pressure.', ctaButton: 'Book Readiness Review' },
      { key: 'campaign-ready', label: 'Campaign Ready', minScore: 18, ctaTitle: 'Your foundation is solid. Let us conduct a full war room capability review and identify the missing systems that separate you from the opposition in the final weeks.', ctaButton: 'Book War Room Review' },
      { key: 'war-room-operational', label: 'War Room Operational', minScore: 0, ctaTitle: 'Core infrastructure is already operating. Focus now shifts to speed, discipline, and pre-emptive narrative control.', ctaButton: 'Request Operator Review' },
    ],
  },
};

export const funnelOrder: FunnelId[] = ['drive-revenue', 'own-your-market', 'win-elections'];
