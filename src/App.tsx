import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RootLayout = lazy(() => import("./page/RootPage"));
const HomePage = lazy(() => import("./page/HomePage"));
const UserProjectsPage = lazy(() => import("./page/UserProjectsPage"));
const LoginPage = lazy(() => import("./page/LoginPage.tsx"));
const ProjectPage = lazy(() => import("./page/ProjectPage"));
const LoadingComponent = lazy(
  () => import("./components/reusableComponents/LoadingComponent"),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ":id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <RootLayout />
      </Suspense>
    ),

    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <UserProjectsPage /> },
      {
        path: ":name",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <ProjectPage />
          </Suspense>
        ),
      },
      // Add other routes and children as needed
    ],
  },
  // Define errorElement, loader, and action if needed
]);

export default function App() {
  return <RouterProvider router={router} />;
}
