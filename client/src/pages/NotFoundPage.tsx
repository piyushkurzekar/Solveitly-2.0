import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <ErrorScreen code="404" title="Page not found" message="The page you are looking for doesn't exist." />
  );
}

/** Rendered by the router when a page throws while rendering. */
export function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;
  console.error(error);
  return <ErrorScreen code="Oops" title="Something went wrong" message="Please refresh the page or try again later." />;
}

function ErrorScreen({ code, title, message }: { code: string; title: string; message: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl font-extrabold text-primary">{code}</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{message}</p>
      <Button asChild className="mt-4">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}
