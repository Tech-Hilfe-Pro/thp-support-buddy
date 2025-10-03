import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Item = { key: string; to: string; label: string; badge?: string; ariaLabel?: string };
type Props = { items: Item[]; moreLabel?: string; reservedRight?: number };

export default function PriorityNav({ items, moreLabel = "Mehr…", reservedRight }: Props) {
  const rRight = reservedRight ?? 120;
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState<Item[]>(items);
  const [overflow, setOverflow] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => reflow());
    if (containerRef.current) ro.observe(containerRef.current);
    reflow();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const reflow = () => {
    window.requestAnimationFrame(() => {
      if (!containerRef.current || !primaryRef.current) return;
      setVisible(items);
      setOverflow([]);
      const ul = primaryRef.current;
      const max = Math.max(0, containerRef.current.clientWidth - rRight);
      let total = 0;
      const vis: Item[] = [];
      const over: Item[] = [];
      items.forEach((it) => {
        const li = document.createElement("li");
        li.className = "px-3";
        li.style.visibility = "hidden";
        li.innerText = it.label;
        ul.appendChild(li);
        total += li.getBoundingClientRect().width + 6;
        ul.removeChild(li);
        (total <= max ? vis : over).push(it);
      });
      setVisible(vis);
      setOverflow(over);
    });
  };

  return (
    <div ref={containerRef} className="priority-nav flex items-center min-w-0">
      <ul ref={primaryRef} className="flex items-center gap-1">
        {visible.map((it) => (
          <li key={it.key} className="px-1">
            <Link to={it.to} aria-label={it.ariaLabel || it.label} className="nav-link">
              {it.label}
              {it.badge && <span className="badge-new">{it.badge}</span>}
            </Link>
          </li>
        ))}
      </ul>
      {overflow.length > 0 && (
        <div className="relative">
          <button
            className="btn-more"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            aria-label="Weitere Links"
          >
            {moreLabel}
          </button>
          {open && (
            <div role="menu" className="menu-more" onMouseLeave={() => setOpen(false)}>
              {overflow.map((it) => (
                <Link role="menuitem" key={it.key} to={it.to} className="menu-item">
                  {it.label}
                  {it.badge && <span className="badge-new ml-2">{it.badge}</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
