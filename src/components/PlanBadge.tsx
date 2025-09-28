export default function PlanBadge({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
      {text}
    </span>
  );
}