/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import type { JwtPayload as OriginalJwtPayload } from 'jwt-decode';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt_decode from 'jwt-decode';
import { getSession, signOut } from 'next-auth/react';
import { v4 } from 'uuid';

import { ACCESS_TOKEN, baseApi as baseURL } from '@/utils/constants';

// eslint-disable-next-line import/no-cycle
import { openModal } from './ModalUtil';
import { triggerUpdateRefreshTokenSuccess } from './refreshTokenUtil';

// const isServer = typeof window === 'undefined'

// interface ICustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

const api = axios.create({
  baseURL,
});

// async function keycloakSessionLogout() {
//   try {
//     await fetch(`/api/logout`, { method: 'GET' });
//   } catch (error) {
//     console.log(error);
//   }
// }

// const tokenSession = await getAccessToken();
const checkValidToken = (token: string) => {
  const decodeToken = jwt_decode<OriginalJwtPayload>(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decodeToken?.exp && decodeToken?.exp > currentTime;
};

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const newConfig = {
    ...config,
    timeout: 75000,
    validateStatus: (status: number) => status < 400,
  };
  if (!newConfig?.headers['Content-Type']) {
    newConfig.headers['Content-Type'] = 'application/json';
  }
  const token = sessionStorage.getItem(ACCESS_TOKEN);

  // Kiểm tra hạn dùng của token
  if (token && checkValidToken(token)) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  } else {
    // Nếu hết hạn gọi lại session để serer call refresh token mới và trả về session
    const session = await getSession();
    if (session?.access_token && checkValidToken(session?.access_token)) {
      sessionStorage.setItem(ACCESS_TOKEN, session.access_token);
      triggerUpdateRefreshTokenSuccess(session.access_token);
      newConfig.headers.Authorization = `Bearer ${session?.access_token}`;
    } else {
      // Nếu gọi refresh thất bại thỳ gọi modal báo hết phiên
      openModal();
      return Promise.reject(new Error());
    }
  }
  newConfig.headers.clientMessageId = `${v4()}`;
  newConfig.headers.clientTime = new Date().toISOString();
  return newConfig;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.status === 401) {
    sessionStorage.removeItem('loginData');
    signOut();
  }
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error?.response?.status === 401) {
    // Gọi modal báo hết phiên khi lỗi author
    openModal();
  }
  // if (error?.response?.status === 401) {
  //   const originalRquest = error?.config as ICustomAxiosRequestConfig;
  //   const session = await getSession();
  //   if (session?.access_token && originalRquest && !originalRquest._retry) {
  //     originalRquest._retry = true;
  //     sessionStorage.setItem(ACCESS_TOKEN, session.access_token);
  //     originalRquest.headers.Authorization = `Bearer ${session.access_token}`;
  //     return api(originalRquest);
  //   }

  //   // await keycloakSessionLogout().then(() => signOut({ callbackUrl: '/' }));
  //   return Promise.reject(error);
  // }
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export default setupInterceptorsTo(api);
