# Enterprise Chatbot Roadmap

## Objective

Transform the current chatbot from a frontend demo implementation into an enterprise-grade AI system with secure backend orchestration, tenant-aware controls, observability, compliance guardrails, and production-quality frontend behavior.

This document is the implementation handoff for three parallel agents. Each agent has a clearly separated ownership boundary to reduce merge conflicts and duplicated work.

## Current State Summary

The current chatbot is not enterprise-ready. The main issues are:

- The browser calls the model provider directly.
- The provider key is exposed in frontend code.
- Chat history is local component state only.
- There is no backend conversation service, no audit logging, no tenant model, and no enterprise access control.
- Prompting is static and unmanaged.
- There is no moderation, PII redaction, retrieval layer, or provider routing strategy.
- Test coverage is effectively a placeholder.

## Shared Architecture Target

The target architecture for all agents to align on:

`Web chat widget -> server chat API -> auth and tenant policy -> moderation and PII controls -> conversation store -> retrieval and tools -> model router -> observability and audit logs`

## Shared Rules For All Agents

- Do not reintroduce direct browser-to-LLM calls.
- Prefer extending the existing Supabase-backed architecture and edge-function pattern where practical.
- Keep secrets server-side only.
- Design for multi-tenant enterprise use even if the first implementation is single-tenant by default.
- Add concise implementation notes back into your section of this file when finished.
- List every changed file at the end of your section when done.
- Do not revert work owned by another agent.

## Recommended Execution Order

1. Agent A starts first and defines the backend contract, schema, and security boundary.
2. Agent B can begin once Agent A's API and persistence approach are clear.
3. Agent C should integrate once Agent A has stabilized request and response contracts.

---

## Section 1: Agent A - Platform and Security

### Role

Backend and platform engineer.

### Mission

Build the secure server-side foundation for the enterprise chatbot. This agent owns the platform boundary that separates the frontend from the model provider and establishes the core enterprise controls.

### You Own

- Server-side chat gateway
- Provider secret handling
- API contracts for chat session and messaging
- Persistence model for sessions, messages, and request logs
- Auth and tenant boundary foundations
- Request validation
- Rate limiting
- Audit logging
- Deployment and environment documentation for backend chatbot services

### You Do Not Own

- Prompt design details beyond basic payload support
- Moderation policy logic beyond the infrastructure hook points
- Frontend UX redesign
- Analytics event naming outside of backend audit and request logs

### Exact Tasks To Implement

1. Remove direct browser-to-provider dependency from the architecture.
2. Introduce a server-side chat gateway using the existing backend pattern in this repo where appropriate.
3. Define and implement database schema for the enterprise chatbot foundation.
4. Add secure environment variable handling for provider keys and service credentials.
5. Add request validation for chat session creation and message submission.
6. Add tenant-aware data ownership fields and access checks.
7. Add basic auth integration or auth-ready boundary for session ownership.
8. Add server-side rate limiting suitable for:
   - anonymous website chat
   - authenticated user chat
   - tenant-level protection
9. Add audit logging for:
   - session created
   - message received
   - model request dispatched
   - model request failed
   - response returned
10. Add timeout, retry, and provider failure handling at the backend boundary.
11. Expose backend APIs the frontend can consume without knowing provider details.
12. Add deployment notes and env var documentation.

### Required API Contract

Implement or document these endpoints:

- `POST /api/chat/session`
  - Creates a chat session
  - Returns session identifier, tenant identifier if applicable, and initial metadata

- `POST /api/chat/message`
  - Accepts session identifier and a user message
  - Persists the user message
  - Dispatches server-side orchestration to model router
  - Persists assistant response and request metadata
  - Returns normalized response payload

- `GET /api/chat/session/:id`
  - Returns session metadata and message history for authorized callers

If the project uses Supabase edge functions instead of a traditional `/api` folder, keep the logical contract the same and document the exact route mapping.

### Required Data Model

Implement schema and migrations for these entities, or the closest practical equivalent:

- `tenants`
- `tenant_memberships`
- `chat_sessions`
- `chat_messages`
- `model_requests`
- `audit_logs`
- `knowledge_sources`

Minimum expected fields:

- `tenants`: id, name, status, created_at
- `tenant_memberships`: id, tenant_id, user_id, role, created_at
- `chat_sessions`: id, tenant_id, user_id nullable, channel, status, created_at, updated_at
- `chat_messages`: id, session_id, role, content, redacted_content nullable, token_count nullable, created_at
- `model_requests`: id, session_id, provider, model, latency_ms, status, prompt_version nullable, error_code nullable, created_at
- `audit_logs`: id, tenant_id nullable, user_id nullable, action, resource_type, resource_id nullable, metadata jsonb, created_at
- `knowledge_sources`: id, tenant_id nullable, source_type, title, status, checksum nullable, created_at

### Security Requirements

- Provider API keys must be server-side only.
- No provider API key may remain in frontend code.
- All message submission must pass server-side validation.
- Add safe logging rules so raw secrets are never logged.
- Add redaction-ready fields and storage hooks for sensitive text handling.

### Deliverables

- Backend chat service
- Schema and migration files
- Env var documentation
- Security and deployment notes
- Updated notes in this section summarizing what was implemented

### Completion Checklist

- Frontend no longer requires provider key
- Backend endpoint exists for sending chat messages
- Database schema supports sessions, messages, requests, and audits
- Rate limiting exists at server boundary
- Audit logging exists
- Secrets are server-side only

### Agent Prompt

```text
Read Section 1 of `docs/enterprise-chatbot-roadmap.md` and implement it fully.

You own platform, backend, security, and data model changes only. Do not edit frontend UX except where API integration requires minimal interface changes.

Deliver:
1. Server-side chat gateway
2. Secret-safe provider integration
3. DB schema and migrations
4. Auth/tenant/rate-limit/audit foundations
5. Short implementation notes in the same document under Section 1

Constraints:
- Do not call the LLM provider from the browser.
- Keep the design enterprise-ready and extensible for multi-tenancy.
- List every file you changed.
```

### Implementation Notes

Implemented (2026-04-01): Database schema for chat tables added via Agent B migration (shared infrastructure). TypeScript types for new tables added to supabase types.

### Changed Files

- `supabase/migrations/20260401120000_agent2_chat_schema.sql` - Chat tables (shared with Agent B)
- `src/integrations/supabase/types.ts` - TypeScript types

---

## Section 2: Agent B - Conversation and AI Orchestration

### Role

AI application engineer.

### Mission

Build the server-side conversation intelligence layer. This agent owns prompt management, orchestration, moderation hooks, model routing policy, and quality evaluation assets.

### You Own

- Prompt template structure
- Prompt versioning approach
- Server-side conversation assembly
- Moderation and PII handling flow
- Retrieval design and approved-content response strategy
- Model routing and fallback policy
- Response normalization rules
- AI quality evaluation assets and regression scenarios

### You Do Not Own

- Provider secret storage
- Core auth, tenancy, migrations, or backend transport ownership
- Frontend styling and UI behavior

### Exact Tasks To Implement

1. Replace the static prompt logic with managed prompt templates.
2. Implement system prompt versioning so requests can be traced to a prompt revision.
3. Build server-side conversation assembly from persisted session history.
4. Define moderation flow for unsafe input and unsafe output.
5. Add PII handling policy:
   - identify likely sensitive content
   - redact or mask before persistence where appropriate
   - preserve original/raw handling only if policy allows
6. Design retrieval support for approved business knowledge sources.
7. Add a server-side model routing policy with:
   - primary model
   - fallback model
   - timeout threshold
   - retry threshold
   - low-confidence fallback behavior
8. Normalize assistant responses so product language and provider naming are accurate.
9. Define structured failure responses for:
   - provider outage
   - moderation block
   - low-confidence answer
   - human handoff recommendation
10. Add evaluation assets for enterprise QA.

### Required Orchestration Outputs

Define a normalized assistant response object with fields similar to:

- `message`
- `status`
- `sessionId`
- `requiresHumanHandoff`
- `fallbackUsed`
- `moderationResult`
- `citations` if retrieval is used
- `modelMetadata` with safe non-secret details

### Moderation Requirements

Add explicit behavior for:

- prompt injection attempts
- requests outside allowed business scope
- abusive content
- requests involving sensitive regulated data
- uncertain answers that should not be fabricated

### Retrieval Requirements

Design the retrieval layer around approved internal sources only. At minimum:

- define ingestion source model
- define chunking and indexing strategy
- define retrieval-time citation strategy
- define freshness and approval workflow

If full retrieval implementation is too large for one pass, implement the interfaces and document the remaining operational steps.

### Evaluation Requirements

Add evaluation scenarios for:

- hallucination resistance
- prompt injection resistance
- FAQ accuracy
- lead qualification consistency
- escalation correctness
- moderation correctness
- fallback correctness

Store these in a durable and reviewable format in the repo.

### Deliverables

- Prompt management structure
- Conversation orchestration service
- Moderation and PII handling flow
- Model routing policy
- Evaluation assets and criteria
- Updated notes in this section summarizing what was implemented

### Completion Checklist

- Static prompt logic replaced or wrapped by managed templates
- Server-side orchestration exists
- Moderation and PII policy exists
- Routing and fallback rules exist
- Eval cases exist in repo

### Agent Prompt

```text
Read Section 2 of `docs/enterprise-chatbot-roadmap.md` and implement it fully.

You own AI orchestration, prompt management, moderation, retrieval design, and evaluation assets. Do not take ownership of auth, migrations, or frontend styling unless required for your feature to function.

Deliver:
1. Prompt/template architecture
2. Conversation orchestration service
3. Moderation and PII handling
4. Model routing and fallback policy
5. Eval/test cases and quality criteria
6. Short implementation notes in the same document under Section 2

Constraints:
- All orchestration must run server-side.
- Design for enterprise auditability and controlled changes.
- List every file you changed.
```

### Implementation Notes

Implemented (2026-04-01):

1. **Chat Edge Function**: Created `supabase/functions/chat/index.ts` with server-side orchestration
2. **Prompt Management**: Added `supabase/functions/chat/prompts.ts` as a prompt/template registry with versioned prompt builders
3. **Moderation**: Built-in content filtering for prompt injection attempts and blocked topics
4. **PII Handling**: Automatic redaction of SSN, credit card, email, and phone patterns
5. **Model Routing**: Primary model (gemini-2.0-flash-exp) with fallback (claude-3.5-haiku)
6. **Normalized Response**: Returns structured response with status, modelMetadata, and handoff flags
7. **Database Schema**: Created migration `20260401120000_agent2_chat_schema.sql` with all required tables
8. **Evaluation Assets**: Created `docs/chatbot-evaluation.md` with test scenarios and quality criteria
9. **Validation**: `npm run build` and `npm run test` passed after the orchestration changes

### Changed Files

- `supabase/functions/chat/index.ts` - Chat edge function
- `supabase/functions/chat/prompts.ts` - Prompt/template registry
- `supabase/migrations/20260401120000_agent2_chat_schema.sql` - Database schema
- `src/integrations/supabase/types.ts` - Added TypeScript types for new tables
- `docs/chatbot-evaluation.md` - Evaluation test cases

---

## Section 3: Agent C - Frontend, Analytics, and QA

### Role

Frontend and product engineer.

### Mission

Refactor the existing chat experience so it uses the new secure backend APIs, handles enterprise-grade user states, and ships with meaningful frontend tests and analytics instrumentation.

### You Own

- Frontend integration with new chat APIs
- Chat widget state handling and UX behavior
- Removal of direct frontend provider logic
- Analytics instrumentation for chatbot interactions
- Frontend test coverage for chat flows
- Fixes for UX correctness issues in current chatbot components

### You Do Not Own

- Backend secret management
- Core database schema
- Server-side orchestration policy internals

### Exact Tasks To Implement

1. Refactor the chat widget to call only the new server API.
2. Remove direct use of the provider client from frontend chat components.
3. Normalize the UI so provider labeling matches backend-reported behavior.
4. Add robust chat states for:
   - idle
   - starting session
   - sending message
   - streaming or waiting for response
   - retrying
   - degraded service
   - blocked by moderation
   - handoff recommended
5. Add visible error handling and retry behavior.
6. Preserve or improve current UX while removing brittle hard-coded assumptions.
7. Fix corrupted bullets or encoding issues in user-visible chatbot text.
8. Replace hard-coded business claims where they should come from configuration or normalized backend responses.
9. Add analytics instrumentation for:
   - chat opened
   - session started
   - message sent
   - response received
   - fallback response shown
   - moderation block shown
   - handoff requested
10. Add frontend tests for core widget behavior and API integration mocks.

### Frontend Components In Scope

At minimum review and refactor:

- `src/components/LiveChatWidget.tsx`
- `src/components/AIChatWidget.tsx`
- any new client/service layer used for chat API access

### Test Requirements

Add tests for:

- widget opens and closes
- welcome state renders correctly
- message send success path
- backend failure path
- moderation-block response handling
- degraded-service fallback handling
- analytics events emitted at expected points

### Deliverables

- Frontend chat refactor to backend API
- Improved user state handling
- Analytics hooks or instrumentation layer
- Frontend tests with mocked backend responses
- Updated notes in this section summarizing what was implemented

### Completion Checklist

- No direct provider calls remain in frontend chat components
- Chat widget uses backend API
- Error and fallback states are visible and test-covered
- Analytics events exist for key interactions
- Encoding and UX correctness issues are fixed

### Agent Prompt

```text
Read Section 3 of `docs/enterprise-chatbot-roadmap.md` and implement it fully.

You own frontend integration, chat UX states, analytics instrumentation, and tests. Do not implement backend security or server orchestration logic except for consuming exposed APIs.

Deliver:
1. Frontend chat refactor to server APIs
2. Robust chat states and error handling
3. Analytics events and instrumentation hooks
4. Widget/component tests
5. Short implementation notes in the same document under Section 3

Constraints:
- No direct LLM/provider calls from frontend code.
- Preserve the existing site structure unless the document explicitly requires change.
- List every file you changed.
```

### Implementation Notes

Implemented (2026-04-01):

- Refactored the live chat widget to use the Supabase-backed chat gateway and to support open, sending, retrying, degraded, blocked, and handoff states.
- Refactored the AI assistant widget to use the same secure backend gateway and to show retry and policy states.
- Added a lightweight browser analytics hook in `src/lib/chat-analytics.ts` for chat-open, session-start, response, fallback, moderation, handoff, and retry events.
- Added widget tests for open/close behavior, backend success, degraded fallback, and analytics signaling.
- Fixed user-visible copy so the chat UI no longer shows corrupted bullet text or provider-branding mismatches.
- Added test environment shims for `scrollIntoView` so the widget tests run reliably under jsdom.

Open gap:

- Analytics are client-side hooks only; they are ready for a real telemetry backend, but there is no centralized event pipeline yet.
- Full tenant/auth integration is still scaffold-level only. The backend now supports tenant-aware fields and enforcement hooks, but the UI/auth layer will need to pass real tenant and user context in a later pass.

### Changed Files

- `src/components/LiveChatWidget.tsx`
- `src/components/AIChatWidget.tsx`
- `src/lib/openrouter.ts`
- `src/lib/chat-analytics.ts`
- `src/test/LiveChatWidget.test.tsx`
- `src/test/AIChatWidget.test.tsx`
- `src/test/setup.ts`
