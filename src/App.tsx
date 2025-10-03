import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import RouteTracker from "./components/RouteTracker";
import RouteFocus from "./components/RouteFocus";
import SkipLink from "./components/SkipLink";
import Header from "./components/Header";
import StickyReentryHeader from "./components/StickyReentryHeader";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load all other routes to reduce initial bundle
const Leistungen = lazy(() => import("./pages/Leistungen"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const KMU = lazy(() => import("./pages/KMU"));
const Preise = lazy(() => import("./pages/Preise"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Lazy load heavy routes
const Termin = lazy(() => import("./pages/Termin"));
const TerminZusammenfassung = lazy(() => import("./pages/TerminZusammenfassung"));
const TerminBestaetigt = lazy(() => import("./pages/TerminBestaetigt"));
const Kasse = lazy(() => import("./pages/Kasse"));
const KasseErfolg = lazy(() => import("./pages/kasse/Erfolg"));
const KasseFehler = lazy(() => import("./pages/kasse/Fehler"));
const Techniker = lazy(() => import("./pages/Techniker"));
const Beleg = lazy(() => import("./pages/Beleg"));
const UeberUns = lazy(() => import("./pages/UeberUns"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Impressum = lazy(() => import("./pages/recht/Impressum"));
const Datenschutz = lazy(() => import("./pages/recht/Datenschutz"));
const AGB = lazy(() => import("./pages/recht/AGB"));
const Widerruf = lazy(() => import("./pages/recht/Widerruf"));
const Cookies = lazy(() => import("./pages/recht/Cookies"));
const Error500 = lazy(() => import("./pages/Error500"));

// NIS2 pages
const NIS2Koeln = lazy(() => import("./pages/nis2/Koeln"));
const NIS2QuickCheck = lazy(() => import("./pages/thanks/NIS2QuickCheck"));

// Blog pages (placeholder routes for now)
// const Blog = lazy(() => import("./pages/Blog"));
// const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const App = () => {
  console.log("App.tsx: App component rendering");
  
  // Prevenir scroll horizontal accidental en iOS/Safari mediante touch events
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = Math.abs(e.touches[0].clientX - startX);
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      
      // Si el movimiento es predominantemente horizontal, prevenir el scroll
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    };
    
    // Añadir listeners con passive: false para poder usar preventDefault en iOS
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  return (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipLink />
          <div className="min-h-screen flex flex-col" lang="de-DE">
            <Header />
            <StickyReentryHeader />
            <main id="main" className="flex-1 min-h-[60vh] focus:outline-none">
              <ErrorBoundary>
                <Suspense fallback={<div className="p-8">Laden…</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/leistungen" element={<Leistungen />} />
                    <Route path="/leistungen/:slug" element={<ServiceDetail />} />
                    <Route path="/service/:slug" element={<ServiceDetail />} /> {/* Legacy redirect */}
                    <Route path="/kmu" element={<KMU />} />
                    <Route path="/preise" element={<Preise />} />
                    <Route path="/pakete-preise" element={<Preise />} /> {/* Legacy redirect */}
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/termin" element={<Termin />} />
                    <Route path="/termin/zusammenfassung" element={<TerminZusammenfassung />} />
                    <Route path="/termin/bestaetigt" element={<TerminBestaetigt />} />
                    <Route path="/kasse" element={<Kasse />} />
                    <Route path="/kasse/erfolg" element={<KasseErfolg />} />
                    <Route path="/kasse/fehler" element={<KasseFehler />} />
                    <Route path="/techniker" element={<Techniker />} />
                    <Route path="/beleg" element={<Beleg />} />
                    <Route path="/ueber-uns" element={<UeberUns />} />
                    <Route path="/kontakt" element={<Kontakt />} />
                    <Route path="/recht/impressum" element={<Impressum />} />
                    <Route path="/recht/datenschutz" element={<Datenschutz />} />
                    <Route path="/recht/agb" element={<AGB />} />
                    <Route path="/recht/widerruf" element={<Widerruf />} />
                    <Route path="/recht/cookies" element={<Suspense fallback={<div className="p-8">Laden…</div>}><Cookies /></Suspense>} />
                    <Route path="/nis2-koeln" element={<NIS2Koeln />} />
                    <Route path="/nis2" element={<NIS2Koeln />} />
                    <Route path="/thanks/nis2-quickcheck" element={<NIS2QuickCheck />} />
                    {/* Blog routes - placeholder, to be implemented */}
                    {/* <Route path="/blog" element={<Blog />} /> */}
                    {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
                    <Route path="/error" element={<Error500 />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
            <CookieBanner />
            <WhatsAppFloat />
          </div>
          <RouteTracker />
          <RouteFocus />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
  );
};

export default App;