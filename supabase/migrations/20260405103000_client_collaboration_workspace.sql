BEGIN;

CREATE TABLE IF NOT EXISTS public.client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  workspace_label TEXT NOT NULL DEFAULT 'Client Operations Hub',
  summary TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'archived')),
  health_score INTEGER NOT NULL DEFAULT 0 CHECK (health_score >= 0 AND health_score <= 100),
  budget_status TEXT NOT NULL DEFAULT 'Monitoring',
  launch_gate_title TEXT NOT NULL DEFAULT 'Release gate',
  launch_gate_summary TEXT NOT NULL DEFAULT 'Project workspace is connected to live collaboration records.',
  due_date TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_workstreams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT NOT NULL DEFAULT 'on-track' CHECK (status IN ('ahead', 'on-track', 'attention')),
  due_date TIMESTAMPTZ,
  summary TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  due_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Changes requested')),
  detail TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  requester_name TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  impact_summary TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'Backlog',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  actor_name TEXT NOT NULL,
  action TEXT NOT NULL,
  context TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size_label TEXT NOT NULL,
  file_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'Medium' CHECK (severity IN ('Low', 'Medium', 'High')),
  mitigation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_client_projects_tenant_id ON public.client_projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_client_projects_slug ON public.client_projects(slug);
CREATE INDEX IF NOT EXISTS idx_project_workstreams_project_id ON public.project_workstreams(project_id);
CREATE INDEX IF NOT EXISTS idx_project_approvals_project_id ON public.project_approvals(project_id);
CREATE INDEX IF NOT EXISTS idx_project_requests_project_id ON public.project_requests(project_id);
CREATE INDEX IF NOT EXISTS idx_project_decisions_project_id ON public.project_decisions(project_id);
CREATE INDEX IF NOT EXISTS idx_project_activities_project_id ON public.project_activities(project_id);
CREATE INDEX IF NOT EXISTS idx_project_artifacts_project_id ON public.project_artifacts(project_id);
CREATE INDEX IF NOT EXISTS idx_project_risks_project_id ON public.project_risks(project_id);

ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_workstreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_risks ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.current_tenant_member_role(p_tenant_id UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT tm.role
  FROM public.tenant_memberships tm
  WHERE tm.tenant_id = p_tenant_id
    AND tm.user_id = auth.uid()::text
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_tenant_member(p_tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.tenant_memberships tm
    WHERE tm.tenant_id = p_tenant_id
      AND tm.user_id = auth.uid()::text
  );
$$;

CREATE OR REPLACE FUNCTION public.can_manage_tenant_content(p_tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(public.current_tenant_member_role(p_tenant_id) IN ('owner', 'admin'), false);
$$;

CREATE POLICY "Tenant members can view client projects"
ON public.client_projects
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can manage client projects"
ON public.client_projects
FOR ALL
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE POLICY "Tenant members can view workstreams"
ON public.project_workstreams
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can manage workstreams"
ON public.project_workstreams
FOR ALL
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE POLICY "Tenant members can view approvals"
ON public.project_approvals
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can manage approvals"
ON public.project_approvals
FOR ALL
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE POLICY "Tenant members can view requests"
ON public.project_requests
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant members can create requests"
ON public.project_requests
FOR INSERT
WITH CHECK (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can update requests"
ON public.project_requests
FOR UPDATE
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE POLICY "Tenant members can view decisions"
ON public.project_decisions
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can manage decisions"
ON public.project_decisions
FOR ALL
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE POLICY "Tenant members can view activities"
ON public.project_activities
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can manage activities"
ON public.project_activities
FOR ALL
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE POLICY "Tenant members can view artifacts"
ON public.project_artifacts
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can manage artifacts"
ON public.project_artifacts
FOR ALL
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE POLICY "Tenant members can view risks"
ON public.project_risks
FOR SELECT
USING (public.is_tenant_member(tenant_id));

CREATE POLICY "Tenant managers can manage risks"
ON public.project_risks
FOR ALL
USING (public.can_manage_tenant_content(tenant_id))
WITH CHECK (public.can_manage_tenant_content(tenant_id));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_client_projects_touch ON public.client_projects;
CREATE TRIGGER trg_client_projects_touch
BEFORE UPDATE ON public.client_projects
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_project_workstreams_touch ON public.project_workstreams;
CREATE TRIGGER trg_project_workstreams_touch
BEFORE UPDATE ON public.project_workstreams
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_project_approvals_touch ON public.project_approvals;
CREATE TRIGGER trg_project_approvals_touch
BEFORE UPDATE ON public.project_approvals
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_project_requests_touch ON public.project_requests;
CREATE TRIGGER trg_project_requests_touch
BEFORE UPDATE ON public.project_requests
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_project_artifacts_touch ON public.project_artifacts;
CREATE TRIGGER trg_project_artifacts_touch
BEFORE UPDATE ON public.project_artifacts
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS trg_project_risks_touch ON public.project_risks;
CREATE TRIGGER trg_project_risks_touch
BEFORE UPDATE ON public.project_risks
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

COMMIT;
