import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./page/RootPage.tsx";
import HomePage from "./page/HomePage.tsx";
import UserProjectsPage from "./page/UserProjectsPage.tsx";
import ProjectPage from "./page/ProjectPage.tsx";
import { Suspense } from "react";
import LoadingComponent from "./components/reuseableComponents/LoadingComponent.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path={"/Projects"} element={<UserProjectsPage />} />

      <Route
        path={":id"}
        element={
          <Suspense fallback={<LoadingComponent />}>
            <ProjectPage />
          </Suspense>
        }
      />
    </Route>,
  ),
  // base root navigation
  // <Route path={"/"} element={<RootLayout />}>
  //     {/*pages in root navigation*/}
  //     <Route index element={<Home />} />
  //     <Route path={"about"} element={} />
  //
  //
  //     {/*error page */}
  //     <Route path={"*"} element={} />
  // </Route>,
);
export default function App() {
  return <RouterProvider router={router} />;
}
