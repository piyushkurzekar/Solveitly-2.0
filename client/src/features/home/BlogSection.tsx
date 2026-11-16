import { blogPosts } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

export function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-16 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Blog"
          title="Latest from our blog"
          description="Guides, trends and tips to help you keep growing between courses."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.title} className="group flex flex-col overflow-hidden rounded-2xl border bg-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold text-navy-900">{post.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                {/* TODO: link to the post once the blog module exists. */}
                <span className="self-start rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800">
                  Coming soon
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
