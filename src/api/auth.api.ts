import axiosInstance from '@/libs/axios/config';
import { AxiosError } from 'axios';
import { AUTH_APIS } from '@/constants/route-apis.const';

export interface CreateAccessCodeResponse {
  accessCode: string;
}

export interface ValidateAccessCodeResponse {
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
}

export const createNewAccessCode = async (phoneNumber: string): Promise<CreateAccessCodeResponse> => {
  try {
    const response = await axiosInstance.post(AUTH_APIS.CREATE_ACCESS_CODE, {
      phoneNumber
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Failed to send access code');
    }
    throw error;
  }
}

export const validateAccessCode = async (phoneNumber: string, accessCode: string): Promise<ValidateAccessCodeResponse> => {
  try {
    const response = await axiosInstance.post(AUTH_APIS.VALIDATE_ACCESS_CODE, {
      phoneNumber,
      accessCode
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Failed to validate access code');
    }
    throw error;
  }
}

export const getUserProfile = async (phoneNumber: string) => {
  try {
    const response = await axiosInstance.get(AUTH_APIS.GET_USER_PROFILE, {
      headers: {
        'x-phone-number': phoneNumber
      }
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Failed to get user profile');
    }
    throw error;
  }
}

