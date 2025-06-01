import { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import useAuthStore from "@/stores/auth.store";

interface UseMenuProps {
  onShowProfile: () => void;
}

export const useMenu = ({ onShowProfile }: UseMenuProps) => {
  const { logout } = useAuthStore();

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: onShowProfile
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
      danger: true
    }
  ];

  return { menuItems };
}; 