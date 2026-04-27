export type WorkstreamStatus = "ahead" | "on-track" | "attention";
export type ApprovalStatus = "Pending" | "Approved" | "Changes requested";

export interface PortalMetric {
  label: string;
  value: string;
  detail: string;
}

export interface PortalWorkstream {
  id: string;
  name: string;
  owner: string;
  progress: number;
  status: WorkstreamStatus;
  due: string;
  summary: string;
}

export interface PortalApproval {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: ApprovalStatus;
  detail: string;
}

export interface PortalRequest {
  id: string;
  title: string;
  requester: string;
  priority: "High" | "Medium" | "Low";
  impact: string;
  stage: string;
}

export interface PortalDecision {
  id: string;
  title: string;
  owner: string;
  time: string;
}

export interface PortalActivity {
  id: string;
  actor: string;
  action: string;
  context: string;
  time: string;
}

export interface PortalArtifact {
  id: string;
  name: string;
  type: string;
  updated: string;
  size: string;
}

export interface PortalRisk {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  mitigation: string;
}

export interface ClientPortalWorkspace {
  tenantId?: string;
  projectId?: string;
  workspaceLabel: string;
  projectName: string;
  projectSummary: string;
  dataSourceLabel: string;
  launchGateTitle: string;
  launchGateSummary: string;
  projectDue: string;
  overviewStats: PortalMetric[];
  workstreams: PortalWorkstream[];
  approvals: PortalApproval[];
  requests: PortalRequest[];
  decisions: PortalDecision[];
  activity: PortalActivity[];
  artifacts: PortalArtifact[];
  risks: PortalRisk[];
}
