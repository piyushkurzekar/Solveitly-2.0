import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Courses", to: "/courses" },
      { label: "How it works", to: "/#how-it-works" },
      { label: "Blog", to: "/#blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/#about" },
      { label: "Our team", to: "/#about" },
      { label: "Log in", to: "/login" },
      { label: "Create account", to: "/register" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-16 bg-navy-950 text-white/70 print:hidden">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Empowering learners worldwide with innovative and accessible e-learning solutions developed by{" "}
            {site.organization}.
          </p>
          <SocialLinks className="mt-6 text-lg text-white/60 [&_a]:flex [&_a]:size-10 [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:bg-white/5 [&_a:hover]:bg-gold-500 [&_a:hover]:text-navy-900" />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="mb-5 text-sm font-semibold tracking-wider text-white uppercase">{col.title}</h2>
            <ul className="space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-5 text-sm font-semibold tracking-wider text-white uppercase">Contact us</h2>
          <address className="space-y-4 text-sm not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <span>
                {site.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-gold-500" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-gold-400">
                {site.contact.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-gold-500" />
              <a href={site.contact.phoneHref} className="hover:text-gold-400">
                {site.contact.phone}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>A product of {site.organization}</p>
        </div>
      </div>
    </footer>
  );
}
