import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Scrolls to #section links (e.g. /#courses) after navigation. */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Wait a frame so the target page has rendered.
    const id = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16 print:pt-0">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <ScrollToHash />
    </div>
  );
}
