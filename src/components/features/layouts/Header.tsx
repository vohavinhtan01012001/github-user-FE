import { useState } from "react";
import { Avatar, Dropdown } from "antd";
import { useMenu } from "@/hooks/use-menu";
import useAuthStore from "@/stores/auth.store";
import { ProfileModal } from "@/components/features/home/ProfileModal";
import { findGithubUserProfile } from "@/api/github.api";
import { IGithubUser } from "@/models/interfaces/github.interface";

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<IGithubUser[]>([]);
  const [loading, setLoading] = useState(false);

  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  
  const handleShowProfile = async () => {
    if (!phoneNumber) return;
    
    try {
      setLoading(true);
      setIsModalOpen(true);
      const profiles = await findGithubUserProfile(phoneNumber);
      setLikedProfiles(profiles);
    } catch (error) {
      console.error("Failed to load profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLikedProfiles([]);
  };

  const { menuItems } = useMenu({ onShowProfile: handleShowProfile });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-14">
      <div className="flex justify-end items-center h-full px-4 max-w-7xl mx-auto">
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80">
            <Avatar 
              size="large"
              src={"https://github.com/shadcn.png"} 
              alt={"User"} 
            />
            <span className="text-sm font-medium">{phoneNumber}</span>
          </div> 
        </Dropdown>
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          phoneNumber={phoneNumber || ''}
          likedProfiles={likedProfiles}
          loading={loading}
        />
      </div>
    </div>
  );
};
