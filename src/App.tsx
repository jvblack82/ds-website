import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";

const CulturePractice = lazy(() => import("./pages/CulturePractice"));
const CultureEngine = lazy(() => import("./pages/CultureEngine"));
const AIMaestro = lazy(() => import("./pages/AIMaestro"));
const AICoaching = lazy(() => import("./pages/AICoaching"));
const Workshops = lazy(() => import("./pages/Workshops"));
// WorkshopPrep (/workshops/prep) is taken down between engagements, not deleted.
// Page lives at src/pages/WorkshopPrep.tsx; n8n backend OeVgVRX8UvpORZF6 stays live.
// To re-enable: restore this lazy import, the route below, the Navbar "Workshop pre-work"
// dropdown item, the six "Start your pre-work" CTAs on Workshops.tsx, and the sitemap entry.
const CultureCheck = lazy(() => import("./pages/CultureCheck"));
const WebsiteRebuild = lazy(() => import("./pages/WebsiteRebuild"));
const Brief = lazy(() => import("./pages/Brief"));
const Insights = lazy(() => import("./pages/Insights"));
const Insight = lazy(() => import("./pages/Insight"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/culture" element={<CulturePractice />} />
              <Route path="/culture-engine" element={<CultureEngine />} />
              <Route path="/ai-maestro" element={<AIMaestro />} />
              <Route path="/coaching" element={<AICoaching />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/check/culture" element={<CultureCheck />} />
              <Route path="/website" element={<WebsiteRebuild />} />
              <Route path="/brief" element={<Brief />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<Insight />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
