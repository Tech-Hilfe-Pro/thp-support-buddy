import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import Leistungen from "./pages/Leistungen";
import PaketePreise from "./pages/PaketePreise";
import Termin from "./pages/Termin";
import TerminZusammenfassung from "./pages/TerminZusammenfassung";
import TerminBestaetigt from "./pages/TerminBestaetigt";
import Kasse from "./pages/Kasse";
import Techniker from "./pages/Techniker";
import Beleg from "./pages/Beleg";
import UeberUns from "./pages/UeberUns";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/recht/Impressum";
import Datenschutz from "./pages/recht/Datenschutz";
import AGB from "./pages/recht/AGB";
import Widerruf from "./pages/recht/Widerruf";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col" lang="de-DE">
            <Header />
            <main className="flex-1">
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;