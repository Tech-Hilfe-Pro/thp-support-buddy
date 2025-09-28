export function FormError({ id, text }: { id: string; text: string }) {
  if (!text) return null;
  return <p id={id} role="alert" className="mt-1 text-sm text-red-700">{text}</p>;
}