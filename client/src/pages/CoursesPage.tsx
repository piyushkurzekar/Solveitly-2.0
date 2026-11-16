import { CourseCatalog } from "@/features/courses/components/CourseCatalog";

export default function CoursesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900 py-16 text-center text-white lg:py-20">
        <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
        <div aria-hidden className="absolute -top-32 -right-24 -z-10 size-96 rounded-full bg-navy-600/60 blur-3xl" />
        <div className="container-page">
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">All courses</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Find your next skill</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Self-paced lessons with clear explanations, real code examples and practice exercises — from your first
            program to deploying in the cloud.
          </p>
        </div>
      </section>

      <section className="bg-muted py-14 lg:py-20">
        <div className="container-page">
          <CourseCatalog />
        </div>
      </section>
    </>
  );
}
