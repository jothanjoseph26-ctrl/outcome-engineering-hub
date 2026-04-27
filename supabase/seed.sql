BEGIN;

-- Seed demo tenant for Client Portal
INSERT INTO public.tenants (id, name, status) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Acme Corporation', 'active')
ON CONFLICT DO NOTHING;

-- Add membership for demo user
INSERT INTO public.tenant_memberships (tenant_id, user_id, role) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0000-0000-000000000001', 'owner')
ON CONFLICT DO NOTHING;

-- Seed demo client project
INSERT INTO public.client_projects (id, tenant_id, name, slug, workspace_label, summary, status, health_score, budget_status, launch_gate_title, launch_gate_summary, due_date) VALUES
  (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Q2 2026 Digital Transformation Initiative',
    'acme-digital-transformation-2026',
    'Acme Corp Operations Hub',
    'End-to-end modernization of customer-facing platforms and internal tooling.',
    'active',
    78,
    'On Track',
    'Production Release Gate',
    'All pre-launch criteria have been met. Ready for staged rollout to production.',
    '2026-06-30T23:59:59Z'
  )
ON CONFLICT DO NOTHING;

-- Seed workstreams
INSERT INTO public.project_workstreams (id, project_id, tenant_id, name, owner_name, progress, status, due_date, summary, sort_order) VALUES
  (
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Platform Migration',
    'Sarah Chen',
    65,
    'on-track',
    '2026-05-15T23:59:59Z',
    'Migrating legacy monolith to microservices architecture.',
    1
  ),
  (
    'd4e5f6a7-b8c9-0123-def0-234567890123',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'API Gateway Implementation',
    'Marcus Johnson',
    100,
    'ahead',
    '2026-04-01T23:59:59Z',
    'New API gateway with rate limiting and authentication.',
    2
  ),
  (
    'e5f6a7b8-c9d0-1234-ef01-345678901234',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Customer Portal Redesign',
    'Emily Rodriguez',
    42,
    'attention',
    '2026-07-01T23:59:59Z',
    'New responsive UI with improved UX and accessibility.',
    3
  ),
  (
    'f6a7b8c9-d0e1-2345-f012-456789012345',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Analytics Dashboard',
    'David Kim',
    88,
    'on-track',
    '2026-05-30T23:59:59Z',
    'Real-time business intelligence and reporting suite.',
    4
  )
ON CONFLICT DO NOTHING;

-- Seed approvals
INSERT INTO public.project_approvals (id, project_id, tenant_id, title, owner_name, due_date, status, detail) VALUES
  (
    'a7b8c9d0-e1f2-3456-0123-567890123456',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Security Audit Sign-off',
    'Sarah Chen',
    '2026-04-15T23:59:59Z',
    'Approved',
    'Third-party security audit completed with no critical findings.'
  ),
  (
    'b8c9d0e1-f2a3-4567-1234-678901234567',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'API Gateway Production Release',
    'Marcus Johnson',
    '2026-04-10T23:59:59Z',
    'Pending',
    'Final review required before promoting API gateway to production.'
  ),
  (
    'c9d0e1f2-a3b4-5678-2345-789012345678',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Customer Portal Beta Access',
    'Emily Rodriguez',
    '2026-04-20T23:59:59Z',
    'Changes requested',
    'Accessibility compliance review flagged 3 issues that need addressing.'
  )
ON CONFLICT DO NOTHING;

-- Seed requests
INSERT INTO public.project_requests (id, project_id, tenant_id, title, requester_name, priority, impact_summary, stage) VALUES
  (
    'd0e1f2a3-b4c5-6789-3456-890123456789',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Add OAuth 2.0 Support to API Gateway',
    'Product Team',
    'High',
    'Required for enterprise customer SSO integration.',
    'In Progress'
  ),
  (
    'e1f2a3b4-c5d6-7890-4567-901234567890',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Export Dashboard Data to CSV',
    'Sales Operations',
    'Medium',
    'Weekly reports require manual data extraction.',
    'Backlog'
  ),
  (
    'f2a3b4c5-d6e7-8901-5678-012345678901',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Mobile-responsive Navigation',
    'Customer Success',
    'Low',
    'Navigation menu difficult to use on mobile devices.',
    'Backlog'
  )
ON CONFLICT DO NOTHING;

-- Seed decisions
INSERT INTO public.project_decisions (id, project_id, tenant_id, title, owner_name) VALUES
  (
    'a3b4c5d6-e7f8-9012-6789-123456789012',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Adopt Kubernetes over Docker Swarm',
    'Infrastructure Team'
  ),
  (
    'b4c5d6e7-f8a9-0123-7890-234567890123',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'PostgreSQL as Primary Database',
    'Data Architecture'
  )
ON CONFLICT DO NOTHING;

-- Seed activities
INSERT INTO public.project_activities (id, project_id, tenant_id, actor_name, action, context) VALUES
  (
    'c5d6e7f8-a9b0-1234-8901-345678901234',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Sarah Chen',
    'approved',
    'Security Audit Sign-off'
  ),
  (
    'd6e7f8a9-b0c1-2345-9012-456789012345',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Marcus Johnson',
    'completed',
    'API Gateway Implementation'
  ),
  (
    'e7f8a9b0-c1d2-3456-0123-567890123456',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Emily Rodriguez',
    'requested changes on',
    'Customer Portal Beta Access'
  ),
  (
    'f8a9b0c1-d2e3-4567-1234-678901234567',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'David Kim',
    'updated',
    'Analytics Dashboard progress to 88%'
  )
ON CONFLICT DO NOTHING;

-- Seed artifacts
INSERT INTO public.project_artifacts (id, project_id, tenant_id, name, file_type, file_size_label, file_url) VALUES
  (
    'a9b0c1d2-e3f4-5678-2345-789012345678',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Architecture Diagram v2.pdf',
    'PDF',
    '2.4 MB',
    'https://storage.example.com/artifacts/arch-diagram-v2.pdf'
  ),
  (
    'b0c1d2e3-f4a5-6789-3456-890123456789',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'API Documentation',
    'Link',
    'External',
    'https://api.example.com/docs'
  ),
  (
    'c1d2e3f4-a5b6-7890-4567-901234567890',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Q1 Progress Report.xlsx',
    'Spreadsheet',
    '845 KB',
    'https://storage.example.com/artifacts/q1-report.xlsx'
  )
ON CONFLICT DO NOTHING;

-- Seed risks
INSERT INTO public.project_risks (id, project_id, tenant_id, title, severity, mitigation) VALUES
  (
    'd2e3f4a5-b6c7-8901-5678-012345678901',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Third-party API dependency on payment processor',
    'High',
    'Implementing fallback to secondary provider; scheduled maintenance window for May 5th.'
  ),
  (
    'e3f4a5b6-c7d8-9012-6789-123456789012',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Limited QA capacity during summer holidays',
    'Medium',
    'Cross-training additional team members; prioritizing critical paths.'
  ),
  (
    'f4a5b6c7-d8e9-0123-7890-234567890123',
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Legacy data migration complexity',
    'Low',
    'Phased migration approach with validation checkpoints at each stage.'
  )
ON CONFLICT DO NOTHING;

COMMIT;
