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
const Brief = lazy(() => import("./pages/Brief"));
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
              <Route path="/brief" element={<Brief />} />
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
