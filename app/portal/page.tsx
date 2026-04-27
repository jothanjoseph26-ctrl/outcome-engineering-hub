import { Activity, AlertTriangle, CheckCircle2, Clock, FileText, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { loadClientPortalWorkspace } from "@/lib/client-portal-data";
import { cn } from "@/lib/utils";

const statusStyles = {
  ahead: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "on-track": "border-gold/30 bg-gold/10 text-gold",
  attention: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

const approvalStyles = {
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  Approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "Changes requested": "border-red-500/30 bg-red-500/10 text-red-300",
};

export const metadata = {
  title: "Client Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortalPage() {
  const { workspace, source } = await loadClientPortalWorkspace();

  return (
    <div className="min-h-screen bg-background pb-16 pt-28">
      <section className="border-b border-border/60 pb-8">
        <div className="container-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge variant="outline" className="border-gold/30 bg-gold/10 text-gold">
                {workspace.workspaceLabel}
              </Badge>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {workspace.projectName}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {workspace.projectSummary}
              </p>
            </div>

            <div className="grid min-w-64 gap-2 rounded-lg border border-border/70 bg-card/70 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Data source</span>
                <span className="font-medium text-foreground">{source === "live" ? "Live" : "Demo"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Project due</span>
                <span className="font-medium text-foreground">{workspace.projectDue}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-lg mt-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workspace.overviewStats.map((metric) => (
            <Card key={metric.label} className="border-border/70 bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground">{metric.value}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{metric.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <CardTitle>Workstreams</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {workspace.workstreams.map((item) => (
                <div key={item.id} className="rounded-lg border border-border/60 bg-background/60 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-foreground">{item.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
                    </div>
                    <Badge variant="outline" className={cn("capitalize", statusStyles[item.status])}>
                      {item.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Progress value={item.progress} className="h-2 bg-muted" />
                    <span className="w-12 text-right text-sm font-medium text-foreground">{item.progress}%</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Owner: {item.owner}</span>
                    <span>Due: {item.due}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <CardTitle>{workspace.launchGateTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{workspace.launchGateSummary}</p>
              <div className="mt-5 space-y-3">
                {workspace.approvals.map((approval) => (
                  <div key={approval.id} className="rounded-lg border border-border/60 bg-background/60 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-semibold text-foreground">{approval.title}</h2>
                        <p className="mt-1 text-xs text-muted-foreground">{approval.detail}</p>
                      </div>
                      <Badge variant="outline" className={approvalStyles[approval.status]}>
                        {approval.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{approval.owner}</span>
                      <span>{approval.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold" />
                <CardTitle>Requests</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {workspace.requests.map((request) => (
                <div key={request.id} className="rounded-lg border border-border/60 bg-background/60 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm font-semibold text-foreground">{request.title}</h2>
                    <Badge variant="outline">{request.priority}</Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{request.impact}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{request.requester} · {request.stage}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-gold" />
                <CardTitle>Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {workspace.activity.map((item) => (
                <div key={item.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{item.actor}</span> {item.action}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.context} · {item.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gold" />
                <CardTitle>Artifacts & Risks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {workspace.artifacts.slice(0, 3).map((artifact) => (
                  <div key={artifact.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 p-3 text-sm">
                    <span className="font-medium text-foreground">{artifact.name}</span>
                    <span className="text-xs text-muted-foreground">{artifact.type}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {workspace.risks.slice(0, 2).map((risk) => (
                  <div key={risk.id} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <AlertTriangle className="h-4 w-4 text-amber-300" />
                      {risk.title}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{risk.mitigation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
