import { lazy } from "react";
import { RouteObject } from "react-router";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProtectedRoute } from "../components/features/layouts/ProtectedLayout";

const Home = lazy(() => import("../pages/Home"));

export const appRoutes: RouteObject = {
  path: "app",
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "",
      element: <Home />,
    },
  ],
};
