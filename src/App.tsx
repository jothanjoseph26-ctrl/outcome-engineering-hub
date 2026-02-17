import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Scanner from "./pages/Scanner";
import Truereach from "./pages/Truereach";
import WhatsAppEngineering from "./pages/WhatsAppEngineering";
import WhatsAppLeadQualification from "./pages/WhatsAppLeadQualification";
import WhatsAppCRMIntegration from "./pages/WhatsAppCRMIntegration";
import WhatsAppBroadcast from "./pages/WhatsAppBroadcast";
import WhatsAppAnalytics from "./pages/WhatsAppAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/truereach" element={<Truereach />} />
          <Route path="/whatsapp" element={<WhatsAppEngineering />} />
          <Route path="/whatsapp/lead-qualification" element={<WhatsAppLeadQualification />} />
          <Route path="/whatsapp/crm-integration" element={<WhatsAppCRMIntegration />} />
          <Route path="/whatsapp/broadcast" element={<WhatsAppBroadcast />} />
          <Route path="/whatsapp/analytics" element={<WhatsAppAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
