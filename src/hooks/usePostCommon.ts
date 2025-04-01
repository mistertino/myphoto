import { useQuery } from '@tanstack/react-query';

import { postRequest } from '@/utils/common';

interface QueryParams {
  type: string;
  config?: any;
  dataReq?: any;
  // config?: any,
  // onSuccessCallback?: (data: any) => void;
  // onErrorCallback?: (error: Error) => void;
}

export const getList = (url: string, dataReq?: any): Promise<any> => {
  return postRequest(url, dataReq);
};

export const usePostCommon = ({
  type,
  config,
  dataReq,
  // onErrorCallback,
}: QueryParams) => {
  const configRequest = {
    retry: 0,
    cacheTime: 1 * 24 * 60 * 60 * 1000, // 1 ngày
    staleTime: 1 * 24 * 60 * 60 * 1000, // 1 ngày
    ...config,
  };
  let url = '';
  switch (type) {
    default:
      url = '';
      break;
  }
  const QUERY_KEY = [url, type];
  const data = useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getList(url, dataReq),
    ...configRequest,
  });
  return data;
};
