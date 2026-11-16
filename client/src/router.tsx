import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/components/layout/RootLayout";
import { FullPageSpinner } from "@/components/ui/spinner";
import { GuestRoute, ProtectedRoute } from "@/features/auth/components/RouteGuards";
import CoursesPage from "@/pages/CoursesPage";
import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage, { RouteErrorPage } from "@/pages/NotFoundPage";
import RegisterPage from "@/pages/RegisterPage";

/** Code-split pages that pull in the Markdown + syntax-highlighting bundle. */
function lazyPage(load: () => Promise<{ default: ComponentType }>) {
  const Page = lazy(load);
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Page />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/courses/:slug", element: lazyPage(() => import("@/pages/CourseDetailPage")) },
      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/courses/:slug/learn/:lessonSlug", element: lazyPage(() => import("@/pages/LessonPage")) },
          { path: "/courses/:slug/notes", element: lazyPage(() => import("@/pages/CourseNotesPage")) },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
