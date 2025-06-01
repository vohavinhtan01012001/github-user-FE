import { IGithubUser } from '@/models/interfaces/github.interface';
import { GITHUB_APIS } from '@/constants/route-apis.const';
import axiosInstance from '@/libs/axios/config';
import { isAxiosError } from 'axios';

interface SearchGithubUsersResponse {
  items: IGithubUser[];
  total_count: number;
}

export const searchGithubUsers = async (
  query: string,
  page: number,
  per_page: number
): Promise<SearchGithubUsersResponse> => {
  try {
    const response = await axiosInstance.get(GITHUB_APIS.SEARCH_USERS, {
      params: {
        q: query,
        page,
        per_page
      },
      headers: {
        'should-add-phone-number': 'true'
      }
    });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search GitHub users');
    }
    throw error;
  }
}

export const getCountFollowers = async (url: string): Promise<number> => {
  try {
    const response = await axiosInstance.get(url);
    return response.data.length;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to get count followers');
    }
    throw error;
  }
}

export const getCountPublicRepos = async (url: string): Promise<number> => {
  try {
    const response = await axiosInstance.get(url);
    return response.data.length;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to get count public repos');
    }
    throw error;
  }
}

export const findGithubUserProfile = async (phoneNumber: string): Promise<IGithubUser[]> => {
  const response = await axiosInstance.get(GITHUB_APIS.GET_USER_PROFILE, {
    params: { phone_number: phoneNumber }
  });
  return response.data.data;
};

export const likeGithubUser = async (phoneNumber: string, githubUserId: string): Promise<void> => {
  try {
    await axiosInstance.post(GITHUB_APIS.LIKE_USER, {
      phone_number: phoneNumber,
      github_user_id: githubUserId
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to like GitHub user');
    }
    throw error;
  }
}

