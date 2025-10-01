import { useState, useEffect, useRef } from "react";
import { SERVICES } from "@/data/services";
import type { Service } from "@/data/services";
import ServiceCard from "./ServiceCard";
import ServiceDrawer from "./ServiceDrawer";
import type { FilterCategory, WizardState } from "@/lib/filters";
import { CATEGORY_MAPPINGS, getRecommendedServices } from "@/lib/filters";

interface ServiceFinderProps {
  wizardState?: WizardState;
}

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "alle", label: "Alle Services" },
  { id: "remote", label: "Remote" },
  { id: "vor-ort", label: "Vor-Ort" },
  { id: "netzwerk", label: "Netzwerk" },
  { id: "tv", label: "TV & Streaming" },
  { id: "smarthome", label: "SmartHome" },
];

export default function ServiceFinder({ wizardState }: ServiceFinderProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("alle");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recommendedSlugs, setRecommendedSlugs] = useState<string[]>([]);
  
  const gridRef = useRef<HTMLDivElement>(null);

  // Filtrar servicios según tab activo
  const filteredServices = SERVICES.filter((srv) => {
    const filterFn = CATEGORY_MAPPINGS[activeFilter];
    return filterFn(srv.slug, srv.remoteAvailable);
  });

  // Aplicar wizard state
  useEffect(() => {
    if (wizardState && wizardState.device) {
      const recommended = getRecommendedServices(wizardState);
      setRecommendedSlugs(recommended);
      
      // Scroll a la rejilla
      setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [wizardState]);

  const handleOpenDetails = (service: Service) => {
    setSelectedService(service);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  // Keyboard navigation para tabs
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const total = FILTER_TABS.length;
    let newIndex = index;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      newIndex = (index + 1) % total;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      newIndex = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = total - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveFilter(FILTER_TABS[index].id);
      return;
    } else {
      return;
    }

    // Focus en el nuevo tab
    const newTab = document.getElementById(`tab-${FILTER_TABS[newIndex].id}`);
    newTab?.focus();
  };

  return (
    <>
      <section aria-labelledby="finder-title" className="space-y-6">
        <h2 id="finder-title" className="visually-hidden">
          Service-Katalog
        </h2>

        {/* Tabs ARIA */}
        <div
          role="tablist"
          aria-label="Service-Filter"
          className="flex flex-wrap gap-2 justify-center mb-6"
        >
          {FILTER_TABS.map((tab, idx) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveFilter(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel / Rejilla */}
        <div
          id={`panel-${activeFilter}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeFilter}`}
          ref={gridRef}
        >
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((srv) => {
                const isHighlighted = recommendedSlugs.includes(srv.slug);
                return (
                  <ServiceCard
                    key={srv.id}
                    service={srv}
                    highlighted={isHighlighted}
                    onDetails={() => handleOpenDetails(srv)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Keine Services in dieser Kategorie gefunden.</p>
            </div>
          )}
        </div>
      </section>

      {/* Drawer/Dialog */}
      <ServiceDrawer
        service={selectedService}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
