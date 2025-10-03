import { Link } from "react-router-dom";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
};

export default function BlogCard({ slug, title, excerpt, tag, date }: BlogCardProps) {
  return (
    <article className="rounded-2xl border border-border p-5 hover:shadow-sm transition-shadow bg-card">
      <div className="mb-2 flex items-center gap-2">
        <span className="tag">{tag}</span>
        <time className="date text-xs">{date}</time>
      </div>
      <h3 className="text-xl font-semibold mb-2">
        <Link to={`/blog/${slug}`} className="hover:text-primary transition-colors">
          {title}
        </Link>
      </h3>
      <p className="text-muted-foreground mb-3">{excerpt}</p>
      <div className="mt-3">
        <Link to={`/blog/${slug}`} className="text-primary hover:underline font-medium">
          Leer más →
        </Link>
      </div>
    </article>
  );
}
