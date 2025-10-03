import { useState } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "@/data/blog";

type NewsItem = { to: string; title: string; date: string; tag: string };

export default function NewsMenu() {
  const [open, setOpen] = useState(false);
  
  // Get latest 3 posts from blog data
  const items: NewsItem[] = POSTS.slice(0, 3).map((p) => ({
    to: `/blog/${p.slug}`,
    title: p.title,
    date: p.date,
    tag: p.tag
  }));
  
  return (
    <div className="relative">
      <button
        className="nav-link"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        aria-label="Novedades"
      >
        Novedades
      </button>
      {open && (
        <div role="menu" className="menu-more" onMouseLeave={() => setOpen(false)}>
          {items.slice(0, 3).map((n, i) => (
            <Link role="menuitem" key={i} to={n.to} className="menu-item flex-col items-start">
              <div className="flex items-center gap-2 w-full">
                <span className="tag">{n.tag}</span>
                <span className="title flex-1">{n.title}</span>
              </div>
              <time className="date text-xs">{n.date}</time>
            </Link>
          ))}
          <div className="menu-divider" />
          <Link role="menuitem" to="/blog" className="menu-item">
            Ver todo →
          </Link>
        </div>
      )}
    </div>
  );
}
