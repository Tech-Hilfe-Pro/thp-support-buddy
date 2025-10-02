import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const services: ServiceCardData[] = [
  {
    id: "pc",
    title: "PC & Laptop",
    description: "Einrichtung, Wartung und Reparatur Ihres Computers für optimale Leistung.",
    image: "/images/services/pc-laptop.jpg",
    slug: "computer"
  },
  {
    id: "laptop",
    title: "Laptop Service",
    description: "Professionelle Laptop-Wartung und Konfiguration für mobile Arbeitsplätze.",
    image: "/images/services/laptop.jpg", 
    slug: "computer"
  },
  {
    id: "tv",
    title: "Smart-TV & Streaming",
    description: "TV-Einrichtung, Sender-Konfiguration und Streaming-Dienste optimal nutzen.",
    image: "/images/services/smart-tv.jpg",
    slug: "tv-internet-streaming"
  },
  {
    id: "wlan", 
    title: "WLAN & Netzwerk",
    description: "Schnelles Internet im ganzen Haus mit professioneller WLAN-Optimierung.",
    image: "/images/services/wlan.jpg",
    slug: "heimnetzwerk-wlan"
  },
  {
    id: "drucker",
    title: "Drucker & Scanner", 
    description: "Installation und Konfiguration von Druckern und Scannern aller Marken.",
    image: "/images/services/drucker.jpg",
    slug: "drucker-kopierer-scanner"
  },
  {
    id: "smarthome",
    title: "Smart-Home",
    description: "Intelligente Haussteuerung einfach gemacht – von Beleuchtung bis Heizung.",
    image: "/images/services/smart-home.jpg", 
    slug: "smarthome-assistenten"
  }
];

const ServiceCard = ({ service, isVisible }: { service: ServiceCardData; isVisible: boolean }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
      <Link 
        to={`/leistungen/${service.slug}`} 
        className="block h-full"
      >
        <div className="aspect-[3/2] overflow-hidden bg-muted">
          {isVisible && (
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.className = parent.className + ' flex items-center justify-center';
                  parent.innerHTML = `<div class="text-muted-foreground text-sm">${service.title}</div>`;
                }
              }}
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default function ServiceCards() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]));
            }
          }
        });
      },
      { rootMargin: '50px 0px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const cardElements = document.querySelectorAll('[data-card-id]');
    cardElements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        cardElements.forEach(el => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der PC-Einrichtung bis zur Smart-Home-Installation – wir sind Ihr zuverlässiger Partner für alle IT-Themen.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} data-card-id={service.id}>
              <ServiceCard 
                service={service} 
                isVisible={visibleCards.has(service.id)}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/leistungen" 
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background text-foreground px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Alle Leistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}