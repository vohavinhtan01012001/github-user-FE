import { Suspense } from "react";
import { Spin } from "antd";
import { Outlet } from "react-router";

export const SuspenseWrapper: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};
