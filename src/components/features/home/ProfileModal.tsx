import { Avatar } from "antd";
import { useState } from "react";
import { IGithubUser } from "@/models/interfaces/github.interface";
import { BaseModal } from "@/components/shared/BaseModal";
import { BasePagination } from "@/components/shared/BasePagination";
import { PROFILE_MODAL } from "@/constants/shared.const";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  likedProfiles: IGithubUser[];
  loading: boolean;
}

export const ProfileModal = ({
  isOpen,
  onClose,
  phoneNumber,
  likedProfiles,
  loading,
}: ProfileModalProps) => {
  const [currentPage, setCurrentPage] = useState<number>(PROFILE_MODAL.DEFAULT_PAGE);
  const pageSize = PROFILE_MODAL.PAGE_SIZE;

  const paginatedProfiles = likedProfiles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
  };

  return (
    <BaseModal
      title={<div className="text-lg font-bold text-center">User Profile</div>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      loading={loading}
      width={1200}
    >
      <div className="flex flex-col gap-4">
        <div>
          <strong>Phone Number:</strong> {phoneNumber}
        </div>

        <div>
          <strong>Liked GitHub Profiles:</strong>
          <div className="mt-4 grid grid-cols-3 gap-4 ">
            {paginatedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center gap-4 p-4 shadow rounded-lg min-w-2xs"
              >
                <Avatar src={profile.avatar_url} size={40} />
                <div>
                  <div className="font-bold">{profile.login}</div>
                  <div className="text-sm">
                    <span>Followers: {profile.followers}</span>
                    <span className="mx-2">~</span>
                    <span>Repos: {profile.public_repos}</span>
                  </div>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
          {likedProfiles.length > pageSize && (
            <div className="mt-4 flex justify-center">
              <BasePagination
                current={currentPage}
                total={likedProfiles.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                pageSizes={[PROFILE_MODAL.PAGE_SIZE]}
              />
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
