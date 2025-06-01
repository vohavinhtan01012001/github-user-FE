import { Header } from "@/components/features/layouts/Header";
import { Outlet } from "react-router";

export const AdminLayout: React.FC=() => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
