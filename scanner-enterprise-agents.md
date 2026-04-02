# Scanner Enterprise Upgrade: 3-Agent Execution Split

This document divides the scanner upgrade into three implementation tracks that can run in parallel with minimal overlap.

Use each section as the exact prompt for the assigned agent.

## Shared Context

Current scanner flow:
- UI entry: `src/pages/Scanner.tsx`
- Wizard: `src/components/scanner/ScannerWizard.tsx`
- Progress view: `src/components/scanner/ScannerProgress.tsx`
- Results view: `src/components/scanner/ScannerResults.tsx`
- Backend worker: `supabase/functions/start-scan/index.ts`
- Schema: `supabase/migrations/20260121150244_0fe2effa-21af-41e1-afd8-50e34109acb4.sql`

Current problems to solve:
- Public RLS is unsafe.
- Scan execution is synchronous and brittle.
- Analysis quality is too shallow.
- Error handling and observability are weak.
- UX is not production-ready.
- Test coverage is effectively absent.

Rules for all agents:
- Do not revert unrelated changes.
- Stay within your assigned files unless necessary.
- If you must touch another agent's area, keep it minimal and document it.
- Prefer additive changes that integrate with the current codebase.
- Include tests for anything non-trivial.

## Agent 1: Security, Data Model, and Job Orchestration

### Mission

Turn the scanner backend from a public synchronous prototype into a secure, durable job-based system.

### File Ownership

Primary ownership:
- `supabase/migrations/*`
- `supabase/functions/start-scan/index.ts`
- Any new backend files under `supabase/functions/`
- `src/integrations/supabase/types.ts` if schema changes require regenerated types

Secondary touch allowed only if required:
- `src/components/scanner/ScannerWizard.tsx`
- `src/components/scanner/ScannerProgress.tsx`

### Exact Task

Implement the following:

1. Secure the schema and access model.
- Remove public read access to all scans and scan results.
- Replace unsafe `USING (true)` policies with ownership- or token-based access.
- Add a `public_token` or equivalent access token model for anonymous scan retrieval if full auth is not being introduced yet.
- Ensure only backend/system code can update scan execution state.

2. Introduce durable job state.
- Extend the schema to support real execution tracking:
  - `status`
  - `current_step`
  - `error_message`
  - `started_at`
  - `completed_at`
  - `retry_count`
  - `last_heartbeat_at`
- Add a `scan_events` table or equivalent for lifecycle events and debugging.
- Add uniqueness/idempotency protection so the same scan cannot produce duplicate result rows unintentionally.

3. Harden backend execution.
- Refactor `start-scan` so it behaves like a real orchestrator rather than a best-effort inline script.
- Persist failure states on any exception.
- Persist structured error messages.
- Add clear status transitions such as:
  - `pending`
  - `queued`
  - `running`
  - `analyzing`
  - `completed`
  - `failed`
- Add idempotent behavior so retries are safe.

4. Add operational safety controls.
- Validate `scanId` and scan eligibility before starting.
- Prevent rerunning already-completed jobs unless explicitly requested.
- Add simple abuse protection hooks where feasible in current architecture:
  - request fingerprint placeholder
  - per-scan start guards
  - rate-limiting extension point

5. Add backend tests where practical.
- Cover status transitions.
- Cover failure persistence.
- Cover duplicate-start behavior.
- Cover access policy assumptions in migration comments or test notes if direct policy tests are not feasible here.

### Deliverables

- New migration(s) for secure policies and orchestration fields.
- Refactored backend execution flow.
- Any supporting helper modules.
- Tests for orchestration logic.
- Short implementation notes at the end of your response listing:
  - files changed
  - schema changes
  - any follow-up needed from Agent 2 or 3

### Non-Goals

- Do not build Playwright or deep rendered-page analysis.
- Do not redesign the scanner UI beyond small changes needed for new status handling.

### Prompt To Give Agent 1

You are implementing the backend/security/orchestration track for the scanner enterprise upgrade.

Work in this repo and own these areas:
- `supabase/migrations/*`
- `supabase/functions/start-scan/index.ts`
- new backend files under `supabase/functions/`
- `src/integrations/supabase/types.ts` only if required

Implement:
- secure RLS and remove public read exposure
- anonymous but controlled result access using a token-based retrieval model if full auth is not added
- durable job status fields and scan lifecycle events
- idempotent orchestration for scan start
- explicit failed-state persistence and structured error recording
- safeguards against duplicate starts and unsafe reruns
- tests for orchestration behavior where practical

Constraints:
- do not revert unrelated changes
- do not take over deep analysis or report UX work
- keep any UI changes minimal and only for compatibility

Return:
- the files you changed
- the schema and policy decisions you made
- any integration notes for the frontend agents

## Agent 2: Analysis Engine, Scoring, and Evidence Model

### Mission

Upgrade the scanner from string-matching heuristics into a more credible analysis engine with structured findings and explainable scoring.

### File Ownership

Primary ownership:
- `supabase/functions/start-scan/index.ts`
- New shared analysis modules under `supabase/functions/start-scan/` or nearby
- New test files related to analysis/scoring

Secondary touch allowed only if required:
- `src/components/scanner/ScannerResults.tsx`

Important:
- Coordinate with Agent 1 if `start-scan/index.ts` changes overlap. Prefer extracting analysis/scoring logic into separate modules to reduce merge pain.

### Exact Task

Implement the following:

1. Extract analysis and scoring out of the monolithic function.
- Move static analysis, scoring, summary input shaping, and recommendation generation into separate modules.
- Keep the orchestration entrypoint thin.

2. Improve analysis quality without requiring a full browser stack yet.
- Make fetch timing measurement correct.
- Validate response status and content type.
- Capture more structured evidence:
  - final URL
  - HTTP status
  - redirect info if available
  - title
  - meta description
  - presence of analytics tags
  - forms count
  - CTA evidence
  - image alt coverage
  - structured data presence
- Return findings with machine-readable evidence fields, not only prose.

3. Improve scoring model.
- Version the scoring model with a `rule_version` or equivalent.
- Make category scoring deterministic and explainable.
- Reduce false positives where possible.
- Ensure missing/failed fetches do not silently look like a low-quality site; they should produce explicit technical failure findings.

4. Improve recommendations.
- Generate recommendations from findings in a structured priority order.
- Separate:
  - critical technical blockers
  - measurement gaps
  - conversion gaps
  - follow-up/CRM gaps
- Ensure recommendations are usable in enterprise reports.

5. Improve summary generation boundaries.
- Keep LLM summarization optional and fallback-safe.
- Ensure prompts are built from structured inputs.
- Clean up corrupted currency/encoding text.

6. Add tests.
- Unit tests for scoring.
- Tests for common HTML fixture cases.
- Tests for failure-mode classification.

### Deliverables

- Extracted analysis/scoring modules.
- Cleaner result shape with evidence-oriented fields.
- Tests for scoring and analysis behavior.
- Short implementation notes listing:
  - files changed
  - score model assumptions
  - any API contract changes Agent 3 must handle

### Non-Goals

- Do not own RLS/security/migrations except where minimal compatibility changes are necessary.
- Do not redesign the whole results UI.
- Do not add Playwright if that requires major infrastructure work in this pass.

### Prompt To Give Agent 2

You are implementing the analysis/scoring track for the scanner enterprise upgrade.

Work in this repo and own these areas:
- `supabase/functions/start-scan/index.ts`
- new modules under the scanner function area
- new tests for analysis and scoring

Implement:
- extraction of analysis and scoring logic into maintainable modules
- improved fetch/response validation and more structured evidence capture
- deterministic scoring with a versioned rule model
- explicit failure findings for technical fetch/analysis issues
- better structured recommendations and safer summary generation
- cleanup of corrupted encoding/currency text
- tests for scoring, fixtures, and failure modes

Constraints:
- avoid taking over security/policy/orchestration work unless needed for compatibility
- coordinate around shared edits to `start-scan/index.ts`
- prefer additive modules that reduce merge conflict risk

Return:
- files changed
- scoring model decisions
- any result payload changes the UI agent must consume

## Agent 3: Frontend UX, Retrieval Flow, and Report Experience

### Mission

Bring the scanner UI up to production quality and align it with the safer backend and richer result model.

### File Ownership

Primary ownership:
- `src/pages/Scanner.tsx`
- `src/components/scanner/ScannerWizard.tsx`
- `src/components/scanner/ScannerProgress.tsx`
- `src/components/scanner/ScannerResults.tsx`
- Any new frontend utilities/components for scanner flows

Secondary touch allowed only if required:
- `src/integrations/supabase/client.ts`
- scanner-related type helpers in `src/`

### Exact Task

Implement the following:

1. Strengthen the submission flow.
- Improve URL validation beyond `includes('.')`.
- Improve email validation.
- Handle submission errors clearly.
- Preserve and use any scan access token returned by the backend.

2. Upgrade progress handling.
- Replace fake progress-phase inference with backend-driven status and step rendering.
- Show:
  - queued
  - running
  - analyzing
  - completed
  - failed
- Surface `error_message` when available.
- Add retry/restart behavior where appropriate.

3. Upgrade results rendering.
- Consume richer result payloads from Agent 2 if available.
- Show evidence cleanly and credibly.
- Distinguish technical failures from business findings.
- Improve recommendation grouping and prioritization.
- Remove or disable dead CTAs unless implemented.

4. Improve report usability.
- Add loading, empty, failed, and partial-result states.
- Make it clear what was scanned and when.
- If feasible, add lightweight export-ready presentation structure for future PDF generation.

5. Clean up presentation quality.
- Fix corrupted currency/encoding text.
- Tighten copy and enterprise tone.
- Ensure mobile layout remains solid.

6. Add tests.
- Component tests for wizard validation and error states.
- Progress-state rendering tests.
- Results rendering tests for success and failure cases.

### Deliverables

- Improved scanner UX and safer retrieval flow.
- Tests for major user states.
- Short implementation notes listing:
  - files changed
  - assumptions about backend payloads
  - any unresolved dependency on Agent 1 or 2

### Non-Goals

- Do not own backend RLS or orchestration.
- Do not rebuild the entire site design system.

### Prompt To Give Agent 3

You are implementing the frontend UX/reporting track for the scanner enterprise upgrade.

Work in this repo and own these areas:
- `src/pages/Scanner.tsx`
- `src/components/scanner/ScannerWizard.tsx`
- `src/components/scanner/ScannerProgress.tsx`
- `src/components/scanner/ScannerResults.tsx`
- any new scanner-focused frontend utilities/components

Implement:
- stronger wizard validation and submission handling
- token-aware scan retrieval if backend now uses controlled access
- backend-driven progress and failure rendering
- richer result presentation with evidence and grouped recommendations
- removal or replacement of dead CTAs
- cleanup of corrupted encoding/currency text
- tests for main scanner UI states

Constraints:
- do not take over backend security or scoring logic
- adapt to backend contract changes cleanly
- keep the UX compatible with existing app patterns

Return:
- files changed
- assumptions made about backend responses
- any blockers caused by backend contract gaps

## Recommended Execution Order

These can run in parallel, but the dependency order is:

1. Agent 1 defines secure retrieval contract and status model.
2. Agent 2 defines result payload shape and evidence model.
3. Agent 3 adapts UI to those contracts.

If parallelizing immediately:
- Agent 1 should publish status/token contract early.
- Agent 2 should publish result JSON shape early.
- Agent 3 should code against thin adapter types to reduce churn.

## Integration Contract To Align On

Before merging, all agents should align on this minimum contract:

- Scan creation response:
  - `scanId`
  - optional `publicToken`

- Scan status payload:
  - `id`
  - `status`
  - `current_step`
  - `progress`
  - `error_message`
  - `started_at`
  - `completed_at`

- Scan result payload:
  - `scan_id`
  - `score`
  - `maturity_level`
  - `rule_version`
  - `findings`
  - `recommendations`
  - `category_scores`
  - `ai_summary`
  - `estimated_revenue_loss`
  - `created_at`

## Suggested Merge Sequence

1. Merge Agent 1 first if schema/policy changes are large.
2. Merge Agent 2 next and update any generated types.
3. Merge Agent 3 last to adapt to final backend contracts.
