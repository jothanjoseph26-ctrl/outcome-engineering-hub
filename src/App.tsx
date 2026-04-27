import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Scanner from "./pages/Scanner";
import Truereach from "./pages/Truereach";
import WhatsAppEngineering from "./pages/WhatsAppEngineering";
import WhatsAppLeadQualification from "./pages/WhatsAppLeadQualification";
import WhatsAppCRMIntegration from "./pages/WhatsAppCRMIntegration";
import WhatsAppBroadcast from "./pages/WhatsAppBroadcast";
import WhatsAppAnalytics from "./pages/WhatsAppAnalytics";
import ProgrammaticApiControl from "./pages/ProgrammaticApiControl";
import ProgrammaticAutomationScripts from "./pages/ProgrammaticAutomationScripts";
import ProgrammaticPredictiveBidding from "./pages/ProgrammaticPredictiveBidding";
import ProgrammaticDynamicCreative from "./pages/ProgrammaticDynamicCreative";
import EdgeInfrastructureOverview from "./pages/EdgeInfrastructureOverview";
import EdgeInfrastructureDetail from "./pages/EdgeInfrastructureDetail";
import ServerSideTrackingOverview from "./pages/ServerSideTrackingOverview";
import ServerSideTrackingDetail from "./pages/ServerSideTrackingDetail";
import DataSovereigntyOverview from "./pages/DataSovereigntyOverview";
import DataSovereigntyDetail from "./pages/DataSovereigntyDetail";
import NotFound from "./pages/NotFound";
import ClientPortal from "./pages/ClientPortal";
import TechnicalArchitecture from "./pages/TechnicalArchitecture";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProgrammaticContent from "./pages/ProgrammaticContent";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DriveRevenue from "./pages/DriveRevenue";
import OwnYourMarket from "./pages/OwnYourMarket";
import WinElections from "./pages/WinElections";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/drive-revenue" element={<DriveRevenue />} />
          <Route path="/own-your-market" element={<OwnYourMarket />} />
          <Route path="/win-elections" element={<WinElections />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/truereach" element={<Truereach />} />
          <Route path="/whatsapp" element={<WhatsAppEngineering />} />
          <Route path="/whatsapp/lead-qualification" element={<WhatsAppLeadQualification />} />
          <Route path="/whatsapp/crm-integration" element={<WhatsAppCRMIntegration />} />
          <Route path="/whatsapp/broadcast" element={<WhatsAppBroadcast />} />
          <Route path="/whatsapp/analytics" element={<WhatsAppAnalytics />} />
          <Route
            path="/solutions/programmatic-advertising/api-control"
            element={<ProgrammaticApiControl />}
          />
          <Route
            path="/solutions/programmatic-advertising/automation-scripts"
            element={<ProgrammaticAutomationScripts />}
          />
          <Route
            path="/solutions/programmatic-advertising/predictive-bidding"
            element={<ProgrammaticPredictiveBidding />}
          />
          <Route
            path="/solutions/programmatic-advertising/dynamic-creative"
            element={<ProgrammaticDynamicCreative />}
          />
          <Route
            path="/solutions/edge-seo-infrastructure"
            element={<EdgeInfrastructureOverview />}
          />
          <Route
            path="/solutions/edge-seo-infrastructure/:slug"
            element={<EdgeInfrastructureDetail />}
          />
          <Route
            path="/solutions/server-side-tracking"
            element={<ServerSideTrackingOverview />}
          />
          <Route
            path="/solutions/server-side-tracking/:slug"
            element={<ServerSideTrackingDetail />}
          />
          <Route
            path="/solutions/data-sovereignty"
            element={<DataSovereigntyOverview />}
          />
          <Route
            path="/solutions/data-sovereignty/:slug"
            element={<DataSovereigntyDetail />}
          />
          <Route path="/portal" element={<ClientPortal />} />
          <Route path="/technical-architecture" element={<TechnicalArchitecture />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/programmatic-content" element={<ProgrammaticContent />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
