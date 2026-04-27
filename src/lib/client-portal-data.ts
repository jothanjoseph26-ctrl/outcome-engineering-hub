import { formatDistanceToNowStrict, format as formatDate } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import type {
  ApprovalStatus,
  ClientPortalWorkspace,
  PortalActivity,
  PortalApproval,
  PortalArtifact,
  PortalDecision,
  PortalMetric,
  PortalRequest,
  PortalRisk,
  PortalWorkstream,
  WorkstreamStatus,
} from "@/types/client-portal";

const fallbackWorkspace: ClientPortalWorkspace = {
  tenantId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  projectId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  workspaceLabel: "Client Operations Hub",
  projectName: "Outcome Labs x Enterprise Client Portal",
  projectSummary:
    "Track execution, review deliverables, approve changes, and keep one audit trail for every milestone, decision, and blocker.",
  dataSourceLabel: "Demo workspace",
  launchGateTitle: "Portal v1 release gate",
  launchGateSummary:
    "Deployment checklist is complete. Security review, content QA, and release notes are ready.",
  projectDue: "Apr 15",
  overviewStats: [
    { label: "Delivery health", value: "86%", detail: "Across product, design, and integrations" },
    { label: "Tasks completed", value: "42 / 56", detail: "75% of committed sprint items shipped" },
    { label: "Pending client actions", value: "3", detail: "Approvals and one scope decision required" },
    { label: "Budget confidence", value: "On track", detail: "Forecast holds within current scope" },
  ],
  workstreams: [
    {
      id: "ws-1",
      name: "Client workspace",
      owner: "Product team",
      progress: 92,
      status: "ahead",
      due: "Apr 09",
      summary: "Dashboard shell, approvals, and activity feed are implementation-complete.",
    },
    {
      id: "ws-2",
      name: "Approval workflows",
      owner: "Operations",
      progress: 71,
      status: "on-track",
      due: "Apr 11",
      summary: "Review routing and signoff history are in QA with stakeholder templates loaded.",
    },
    {
      id: "ws-3",
      name: "Client request intake",
      owner: "Platform",
      progress: 58,
      status: "attention",
      due: "Apr 13",
      summary: "Needs final rules for change-order thresholds and budget escalation.",
    },
    {
      id: "ws-4",
      name: "Reporting automation",
      owner: "Data team",
      progress: 64,
      status: "on-track",
      due: "Apr 15",
      summary: "Weekly digest and milestone rollup are connected to delivery events.",
    },
  ],
  approvals: [
    {
      id: "ap-1",
      title: "Portal v1 production release",
      owner: "Outcome Lab",
      due: "Today",
      status: "Pending",
      detail: "Release checklist is complete. Waiting for final client signoff to deploy.",
    },
    {
      id: "ap-2",
      title: "Change request: billing export",
      owner: "Client finance",
      due: "Apr 06",
      status: "Changes requested",
      detail: "Requested CSV formatting updates before budget approval.",
    },
    {
      id: "ap-3",
      title: "Stakeholder access matrix",
      owner: "Security",
      due: "Apr 05",
      status: "Approved",
      detail: "Role-based visibility confirmed for executives, PMs, and reviewers.",
    },
  ],
  requests: [
    {
      id: "rq-1",
      title: "Expose milestone variance against original baseline",
      requester: "Client PMO",
      priority: "High",
      impact: "Improves executive review before steering meetings.",
      stage: "Sizing",
    },
    {
      id: "rq-2",
      title: "Add downloadable monthly compliance packet",
      requester: "Legal",
      priority: "Medium",
      impact: "Reduces manual document requests across audits.",
      stage: "Planned",
    },
    {
      id: "rq-3",
      title: "Sync approvals to WhatsApp alert channel",
      requester: "Regional director",
      priority: "Low",
      impact: "Adds faster visibility for late-night review windows.",
      stage: "Backlog",
    },
  ],
  decisions: [
    {
      id: "de-1",
      title: "Client sees real-time progress, not weekly snapshots only",
      owner: "Steering committee",
      time: "2 hours ago",
    },
    {
      id: "de-2",
      title: "Scope changes above 10% require budget review before scheduling",
      owner: "PMO + finance",
      time: "Yesterday",
    },
    {
      id: "de-3",
      title: "Design approvals remain in-portal to keep a signed audit trail",
      owner: "Creative ops",
      time: "Yesterday",
    },
  ],
  activity: [
    {
      id: "ac-1",
      actor: "Amina Okafor",
      action: "approved stakeholder access matrix",
      context: "Security review",
      time: "14 min ago",
    },
    {
      id: "ac-2",
      actor: "Delivery bot",
      action: "flagged a dependency risk on request intake",
      context: "Needs policy rules",
      time: "47 min ago",
    },
    {
      id: "ac-3",
      actor: "Tomiwa James",
      action: "uploaded release checklist and deployment notes",
      context: "Portal v1",
      time: "1 hr ago",
    },
    {
      id: "ac-4",
      actor: "Client PMO",
      action: "submitted milestone variance visibility request",
      context: "Executive reporting",
      time: "3 hrs ago",
    },
  ],
  artifacts: [
    { id: "ar-1", name: "Release readiness report", type: "PDF", updated: "Today", size: "1.8 MB" },
    { id: "ar-2", name: "Steering dashboard export", type: "XLSX", updated: "Today", size: "820 KB" },
    { id: "ar-3", name: "Decision log", type: "DOC", updated: "Apr 04", size: "320 KB" },
    { id: "ar-4", name: "Access matrix", type: "CSV", updated: "Apr 04", size: "92 KB" },
  ],
  risks: [
    {
      id: "ri-1",
      title: "Change-order policy not fully approved",
      severity: "Medium",
      mitigation: "Keep requests visible but lock scheduling until finance signs off.",
    },
    {
      id: "ri-2",
      title: "One client approver is traveling during release window",
      severity: "Low",
      mitigation: "Route a backup approver and shorten the reminder interval.",
    },
    {
      id: "ri-3",
      title: "Reporting automation still needs final field mapping",
      severity: "Medium",
      mitigation: "Use current digest template for launch and complete mapping next sprint.",
    },
  ],
};

function formatPortalDate(value: string | null): string {
  if (!value) return "TBD";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";
  return formatDate(date, "MMM dd");
}

function formatPortalTimeAgo(value: string | null): string {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return `${formatDistanceToNowStrict(date, { addSuffix: true })}`;
}

function statusFromDb(value: string): WorkstreamStatus {
  if (value === "ahead") return "ahead";
  if (value === "attention") return "attention";
  return "on-track";
}

function approvalStatusFromDb(value: string): ApprovalStatus {
  if (value === "Approved") return "Approved";
  if (value === "Changes requested") return "Changes requested";
  return "Pending";
}

function calculateMetrics(
  workstreams: PortalWorkstream[],
  approvals: PortalApproval[],
  project: any,
): PortalMetric[] {
  const completed = workstreams.filter((item) => item.progress >= 100).length;
  const averageProgress =
    workstreams.length > 0
      ? Math.round(workstreams.reduce((sum, item) => sum + item.progress, 0) / workstreams.length)
      : project.health_score ?? 0;
  const pendingApprovals = approvals.filter((item) => item.status === "Pending").length;

  return [
    {
      label: "Delivery health",
      value: `${project.health_score ?? averageProgress}%`,
      detail: "Calculated from live project, workstream, and approval records",
    },
    {
      label: "Tasks completed",
      value: `${completed} / ${workstreams.length || 0}`,
      detail: "Workstreams at or beyond full completion in the current workspace",
    },
    {
      label: "Pending client actions",
      value: `${pendingApprovals}`,
      detail: "Approvals currently waiting on stakeholder response",
    },
    {
      label: "Budget confidence",
      value: project.budget_status || "Monitoring",
      detail: "Current commercial confidence from the project control layer",
    },
  ];
}

async function fetchLiveWorkspace(): Promise<ClientPortalWorkspace | null> {
  const client = supabase as any;

  const { data: project, error: projectError } = await client
    .from("client_projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (projectError || !project) {
    return null;
  }

  const projectId = project.id;

  const [
    { data: workstreams },
    { data: approvals },
    { data: requests },
    { data: decisions },
    { data: activity },
    { data: artifacts },
    { data: risks },
  ] = await Promise.all([
    client.from("project_workstreams").select("*").eq("project_id", projectId).order("sort_order", { ascending: true }),
    client.from("project_approvals").select("*").eq("project_id", projectId).order("due_date", { ascending: true }),
    client.from("project_requests").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
    client.from("project_decisions").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
    client.from("project_activities").select("*").eq("project_id", projectId).order("created_at", { ascending: false }).limit(8),
    client.from("project_artifacts").select("*").eq("project_id", projectId).order("updated_at", { ascending: false }),
    client.from("project_risks").select("*").eq("project_id", projectId).order("created_at", { ascending: false }),
  ]);

  const mappedWorkstreams: PortalWorkstream[] = (workstreams ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    owner: item.owner_name,
    progress: item.progress ?? 0,
    status: statusFromDb(item.status),
    due: formatPortalDate(item.due_date),
    summary: item.summary,
  }));

  const mappedApprovals: PortalApproval[] = (approvals ?? []).map((item: any) => ({
    id: item.id,
    title: item.title,
    owner: item.owner_name,
    due: formatPortalDate(item.due_date),
    status: approvalStatusFromDb(item.status),
    detail: item.detail,
  }));

  const mappedRequests: PortalRequest[] = (requests ?? []).map((item: any) => ({
    id: item.id,
    title: item.title,
    requester: item.requester_name,
    priority: item.priority,
    impact: item.impact_summary,
    stage: item.stage,
  }));

  const mappedDecisions: PortalDecision[] = (decisions ?? []).map((item: any) => ({
    id: item.id,
    title: item.title,
    owner: item.owner_name,
    time: formatPortalTimeAgo(item.created_at),
  }));

  const mappedActivity: PortalActivity[] = (activity ?? []).map((item: any) => ({
    id: item.id,
    actor: item.actor_name,
    action: item.action,
    context: item.context,
    time: formatPortalTimeAgo(item.created_at),
  }));

  const mappedArtifacts: PortalArtifact[] = (artifacts ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    type: item.file_type,
    updated: formatPortalDate(item.updated_at),
    size: item.file_size_label,
  }));

  const mappedRisks: PortalRisk[] = (risks ?? []).map((item: any) => ({
    id: item.id,
    title: item.title,
    severity: item.severity,
    mitigation: item.mitigation,
  }));

  return {
    tenantId: project.tenant_id,
    projectId: project.id,
    workspaceLabel: project.workspace_label || "Client Operations Hub",
    projectName: project.name,
    projectSummary: project.summary,
    dataSourceLabel: "Live workspace",
    launchGateTitle: project.launch_gate_title || "Release gate",
    launchGateSummary: project.launch_gate_summary || "Project workspace is connected to live collaboration records.",
    projectDue: formatPortalDate(project.due_date),
    overviewStats: calculateMetrics(mappedWorkstreams, mappedApprovals, project),
    workstreams: mappedWorkstreams.length > 0 ? mappedWorkstreams : fallbackWorkspace.workstreams,
    approvals: mappedApprovals.length > 0 ? mappedApprovals : fallbackWorkspace.approvals,
    requests: mappedRequests.length > 0 ? mappedRequests : fallbackWorkspace.requests,
    decisions: mappedDecisions.length > 0 ? mappedDecisions : fallbackWorkspace.decisions,
    activity: mappedActivity.length > 0 ? mappedActivity : fallbackWorkspace.activity,
    artifacts: mappedArtifacts.length > 0 ? mappedArtifacts : fallbackWorkspace.artifacts,
    risks: mappedRisks.length > 0 ? mappedRisks : fallbackWorkspace.risks,
  };
}

export async function getPortalSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signInPortal(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpPortal(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export async function signOutPortal() {
  return supabase.auth.signOut();
}

async function logPortalActivity(projectId: string, tenantId: string, actorName: string, action: string, context: string) {
  const client = supabase as any;
  const { error } = await client.from("project_activities").insert({
    project_id: projectId,
    tenant_id: tenantId,
    actor_name: actorName,
    action,
    context,
  });

  if (error) throw error;
}

export async function approveReleaseAction(workspace: ClientPortalWorkspace, actorName: string) {
  if (!workspace.projectId || !workspace.tenantId) {
    throw new Error("Workspace is not connected to a live project.");
  }

  const client = supabase as any;
  const pendingApproval = workspace.approvals.find((item) => item.status === "Pending");

  if (!pendingApproval) {
    throw new Error("No pending approval found.");
  }

  const { error } = await client
    .from("project_approvals")
    .update({
      status: "Approved",
      detail: `${pendingApproval.detail} Approved from the client portal.`,
    })
    .eq("id", pendingApproval.id);

  if (error) throw error;

  await logPortalActivity(
    workspace.projectId,
    workspace.tenantId,
    actorName,
    "approved release gate",
    pendingApproval.title,
  );
}

export async function createPortalRequestAction(
  workspace: ClientPortalWorkspace,
  payload: {
    requesterName: string;
    title: string;
    impactSummary: string;
    priority: "High" | "Medium" | "Low";
  },
) {
  if (!workspace.projectId || !workspace.tenantId) {
    throw new Error("Workspace is not connected to a live project.");
  }

  const client = supabase as any;
  const { error } = await client.from("project_requests").insert({
    project_id: workspace.projectId,
    tenant_id: workspace.tenantId,
    title: payload.title,
    requester_name: payload.requesterName,
    priority: payload.priority,
    impact_summary: payload.impactSummary,
    stage: "Submitted",
  });

  if (error) throw error;

  await logPortalActivity(
    workspace.projectId,
    workspace.tenantId,
    payload.requesterName,
    "submitted client request",
    payload.title,
  );
}

export async function loadClientPortalWorkspace(): Promise<{
  workspace: ClientPortalWorkspace;
  source: "live" | "demo";
}> {
  if (import.meta.env.MODE === "test") {
    return { workspace: fallbackWorkspace, source: "demo" };
  }

  try {
    const liveWorkspace = await fetchLiveWorkspace();
    if (liveWorkspace) {
      return { workspace: liveWorkspace, source: "live" };
    }
  } catch (error) {
    console.warn("Falling back to demo client portal data", error);
  }

  return { workspace: fallbackWorkspace, source: "demo" };
}

export { fallbackWorkspace };
