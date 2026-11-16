import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
} from "react-icons/si";
import { technologies } from "@/data/site";

const icons: Record<(typeof technologies)[number], IconType> = {
  HTML5: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  Java: SiOpenjdk,
  C: SiC,
  "C++": SiCplusplus,
  SQL: SiMysql,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Jenkins: SiJenkins,
};

export function TechStrip() {
  return (
    <section aria-label="Technologies you can learn" className="border-b bg-white py-10">
      <div className="container-page">
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
          Learn the technologies the industry runs on
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {technologies.map((tech) => {
            const Icon = icons[tech];
            return (
              <li
                key={tech}
                className="flex items-center gap-2 text-sm font-semibold text-navy-800/55 transition-colors hover:text-navy-800"
              >
                <Icon className="size-5" aria-hidden /> {tech}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
