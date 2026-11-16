import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CourseCatalog } from "@/features/courses/components/CourseCatalog";
import { SectionHeader } from "./SectionHeader";

export function CoursesSection() {
  return (
    <section id="courses" className="scroll-mt-16 bg-muted py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Our Courses"
          title="Explore courses built for real-world skills"
          description="From your first line of code to deploying in the cloud — pick a path and start learning today."
          className="mb-10"
        />

        <CourseCatalog />

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/courses">
              View all courses <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
