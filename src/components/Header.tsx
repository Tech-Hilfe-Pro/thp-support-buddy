import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const navigationItems = [
    { label: "Startseite", href: "/" },
    { label: "Leistungen", href: "/leistungen" },
    { label: "Pakete & Preise", href: "/pakete-preise" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  const legalItems = [
    { label: "Impressum", href: "/recht/impressum" },
    { label: "Datenschutz", href: "/recht/datenschutz" },
    { label: "AGB", href: "/recht/agb" },
    { label: "Widerruf", href: "/recht/widerruf" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md"
          >
            <img src="/brand/logo.png" alt="Tech Hilfe Pro" className="h-6 w-auto" fetchPriority="high" width="120" height="32" onError={(e) => {
              e.currentTarget.style.display = 'none';
              const span = document.createElement('span');
              span.textContent = 'Tech Hilfe Pro';
              span.className = 'text-xl font-bold text-primary';
              e.currentTarget.parentElement?.appendChild(span);
            }} />
            <span className="sr-only">Tech Hilfe Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1 ${
                  isActiveRoute(item.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Legal Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Rechtliches
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {legalItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className={`w-full ${
                        isActiveRoute(item.href) ? "text-primary" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button asChild size="sm">
              <Link to="/termin">Jetzt Termin buchen</Link>
            </Button>
          </nav>

          {/* Contact Icons & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Contact Icons */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Anrufen"
              className="h-9 w-9"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="E-Mail senden"
              className="h-9 w-9"
            >
              <Mail className="h-4 w-4" />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Menü öffnen"
                    className="h-9 w-9"
                  >
                    {isOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4 mt-6">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-medium py-2 px-3 rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          isActiveRoute(item.href)
                            ? "text-primary bg-accent"
                            : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2 px-3">
                        Rechtliches
                      </h3>
                      {legalItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-sm py-2 px-3 rounded-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring block ${
                            isActiveRoute(item.href)
                              ? "text-primary bg-accent"
                              : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <Button asChild className="w-full">
                        <Link to="/termin" onClick={() => setIsOpen(false)}>
                          Jetzt Termin buchen
                        </Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;