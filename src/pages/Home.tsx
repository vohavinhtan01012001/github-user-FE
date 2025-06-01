import { useState } from "react";
import { Avatar } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import type { IGithubUser } from "@/models/interfaces/github.interface";
import {
  likeGithubUser,
  searchGithubUsers,
} from "@/api/github.api";
import { GITHUB_SEARCH } from "@/constants/shared.const";
import { SearchCustom } from "@/components/features/home/SearchCustom";
import { BaseButton } from "@/components/shared/BaseButton";
import { BaseTable } from "@/components/shared/BaseTable";
import { BasePagination } from "@/components/shared/BasePagination";
import useAuthStore from "@/stores/auth.store";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<IGithubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(
    GITHUB_SEARCH.DEFAULT_PAGE
  );
  const [pageSize, setPageSize] = useState<number>(
    GITHUB_SEARCH.DEFAULT_PAGE_SIZE
  );
  const [total, setTotal] = useState(0);

  const phoneNumber = useAuthStore((state) => state.phoneNumber);

  const handleSearch = async (value: string) => {
    if (!value.trim()) return;

    setSearchQuery(value);
    setLoading(true);
    try {
      const response = await searchGithubUsers(value, currentPage, pageSize);
      setUsers(response.items || []);
      setTotal(Math.min(response.total_count, GITHUB_SEARCH.MAX_RESULTS));
    } catch (error) {
      console.error("Search failed:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
    handleSearch(searchQuery);
  };

  const handleLikeUser = async (userId: string) => {
    try {
      await likeGithubUser(phoneNumber!, userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, liked: !user.liked } : user
        )
      );
    } catch (error) {
      console.error("Failed to like user:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar",
      render: (url: string) => <Avatar src={url} size={40} />,
    },
    {
      title: "Username",
      dataIndex: "login",
      key: "login",
      render: (text: string, record: IGithubUser) => (
        <a href={record.html_url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "HTML URL",
      dataIndex: "html_url",
      key: "html_url",
      render: (text: string, record: IGithubUser) => (
        <a href={record.html_url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
    },
    {
      title: "Public Repo",
      dataIndex: "public_repos",
      key: "public_repos",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: IGithubUser) => (
        <BaseButton
          type="text"
          icon={
            record.liked ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={() => handleLikeUser(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="pt-24 flex flex-col gap-4 justify-center max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <SearchCustom onSearch={handleSearch} loading={loading} />
      </div>

      <BaseTable
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={false}
      />

      <div className="mt-4">
        <BasePagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          pageSizes={[5, 10, 20]}
        />
      </div>
    </div>
  );
};

export default Home;
