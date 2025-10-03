import { useParams, Link } from "react-router-dom";
import { POSTS } from "@/data/blog";
import SEO from "@/components/SEO";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main id="main" className="container py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Artículo no encontrado</p>
        <Link to="/blog" className="btn-cta">
          Volver al Blog
        </Link>
      </main>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} – Blog Tech Hilfe Pro`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        ogType="article"
      />
      <main id="main" className="container py-12 px-4 max-w-4xl">
        <div className="mb-6">
          <Link to="/blog" className="text-primary hover:underline mb-4 inline-block">
            ← Volver al Blog
          </Link>
        </div>
        
        <div className="mb-4 flex items-center gap-2">
          <span className="tag">{post.tag}</span>
          <time className="date text-sm">{post.date}</time>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">
          {post.title}
        </h1>
        
        <article 
          className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:mb-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-6 border-t">
          <Link to="/blog" className="btn-cta">
            ← Volver al Blog
          </Link>
        </div>
      </main>
    </>
  );
}
