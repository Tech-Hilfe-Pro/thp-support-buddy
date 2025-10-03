import { POSTS } from "@/data/blog";
import BlogCard from "@/components/BlogCard";
import SEO from "@/components/SEO";

export default function Blog() {
  return (
    <>
      <SEO 
        title="Blog – Tech Hilfe Pro"
        description="Noticias y guías prácticas de IT para KMU y hogares avanzados. NIS2, Windows, ciberseguridad y más."
        path="/blog"
      />
      <main id="main" className="container py-12 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">
          Blog
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Noticias y guías prácticas para KMU y hogares avanzados.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {POSTS.map((p) => (
            <BlogCard key={p.slug} {...p} />
          ))}
        </div>
      </main>
    </>
  );
}
