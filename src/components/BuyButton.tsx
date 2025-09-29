import { getStripeLink } from "@/data/stripeLinks";
import { Button } from "@/components/ui/button";

interface BuyButtonProps {
  kind: "privat" | "kmu";
  plan: string;
  children?: React.ReactNode;
  className?: string;
}

export default function BuyButton({ kind, plan, children = "Jetzt buchen", className }: BuyButtonProps) {
  const stripeLink = getStripeLink(kind, plan);
  
  if (!stripeLink) {
    return (
      <Button 
        disabled 
        aria-disabled="true" 
        className={className}
        title="Payment Link noch nicht konfiguriert"
      >
        {children}
      </Button>
    );
  }
  
  return (
    <Button asChild className={className}>
      <a 
        href={stripeLink} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={`${children} - öffnet in neuem Tab`}
      >
        {children}
      </a>
    </Button>
  );
}