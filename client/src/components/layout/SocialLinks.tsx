import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { label: "Instagram", href: site.social.instagram, Icon: FaInstagram },
  { label: "Facebook", href: site.social.facebook, Icon: FaFacebookF },
  { label: "X (Twitter)", href: site.social.twitter, Icon: FaXTwitter },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-5 text-xl", className)}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:scale-110"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
