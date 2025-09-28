import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import RouteTracker from "./components/RouteTracker";
import RouteFocus from "./components/RouteFocus";
import SkipLink from "./components/SkipLink";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import Leistungen from "./pages/Leistungen";
import PaketePreise from "./pages/PaketePreise";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load heavy routes
const Termin = lazy(() => import("./pages/Termin"));
const TerminZusammenfassung = lazy(() => import("./pages/TerminZusammenfassung"));
const TerminBestaetigt = lazy(() => import("./pages/TerminBestaetigt"));
const Kasse = lazy(() => import("./pages/Kasse"));
const Techniker = lazy(() => import("./pages/Techniker"));
const Beleg = lazy(() => import("./pages/Beleg"));
const UeberUns = lazy(() => import("./pages/UeberUns"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Impressum = lazy(() => import("./pages/recht/Impressum"));
const Datenschutz = lazy(() => import("./pages/recht/Datenschutz"));
const AGB = lazy(() => import("./pages/recht/AGB"));
const Widerruf = lazy(() => import("./pages/recht/Widerruf"));
const Error500 = lazy(() => import("./pages/Error500"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipLink />
          <div className="min-h-screen flex flex-col" lang="de-DE">
            <Header />
            <main id="main" className="flex-1 min-h-[60vh] focus:outline-none">
              <ErrorBoundary>
                <Suspense fallback={<div className="p-8">Laden…</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/leistungen" element={<Leistungen />} />
                    <Route path="/pakete-preise" element={<PaketePreise />} />
                    <Route path="/termin" element={<Termin />} />
                    <Route path="/termin/zusammenfassung" element={<TerminZusammenfassung />} />
                    <Route path="/termin/bestaetigt" element={<TerminBestaetigt />} />
                    <Route path="/kasse" element={<Kasse />} />
                    <Route path="/techniker" element={<Techniker />} />
                    <Route path="/beleg" element={<Beleg />} />
                    <Route path="/ueber-uns" element={<UeberUns />} />
                    <Route path="/kontakt" element={<Kontakt />} />
                    <Route path="/recht/impressum" element={<Impressum />} />
                    <Route path="/recht/datenschutz" element={<Datenschutz />} />
                    <Route path="/recht/agb" element={<AGB />} />
                    <Route path="/recht/widerruf" element={<Widerruf />} />
                    <Route path="/error" element={<Error500 />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
            <CookieBanner />
          </div>
          <RouteTracker />
          <RouteFocus />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;