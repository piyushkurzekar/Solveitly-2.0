import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/site";
import { useCurrentUser, useLogout } from "@/features/auth/hooks";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow print:hidden",
        scrolled || open ? "border-border shadow-sm" : "border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="rounded-md px-3.5 py-2 text-[15px] font-medium text-foreground/75 transition-colors hover:bg-navy-50 hover:text-navy-800"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <AuthActions />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy-800 hover:bg-navy-50 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden bg-white transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[28rem] border-t" : "max-h-0",
        )}
      >
        <ul className="container-page space-y-1 py-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="block rounded-md px-3 py-2.5 font-medium hover:bg-navy-50">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <AuthActions mobile />
          </li>
        </ul>
      </div>
    </header>
  );
}

function AuthActions({ mobile = false }: { mobile?: boolean }) {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast.success("Logged out");
        navigate("/");
      },
      onError: () => toast.error("Could not log out. Please try again."),
    });
  };

  const wrapper = cn("flex items-center gap-2", mobile && "flex-col items-stretch");

  if (user) {
    return (
      <div className={wrapper}>
        <Button asChild variant="ghost">
          <Link to="/dashboard">
            <LayoutDashboard /> Dashboard
          </Link>
        </Button>
        <Button variant="outline" onClick={handleLogout} disabled={logout.isPending}>
          <LogOut /> Logout
        </Button>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <Button asChild variant="ghost">
        <Link to="/login">Log in</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Get Started</Link>
      </Button>
    </div>
  );
}
