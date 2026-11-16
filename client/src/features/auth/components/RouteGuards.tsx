import { Navigate, Outlet, useLocation } from "react-router";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useCurrentUser } from "../hooks";

/** Only logged-in users can see these routes; others go to /login. */
export function ProtectedRoute() {
  const { data: user, isPending } = useCurrentUser();
  const location = useLocation();

  if (isPending) return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

/** Login/register pages: logged-in users go back to where they came from (or the dashboard). */
export function GuestRoute() {
  const { data: user, isPending } = useCurrentUser();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  if (isPending) return <FullPageSpinner />;
  if (user) return <Navigate to={from} replace />;
  return <Outlet />;
}
