import { useQuery } from '@tanstack/react-query';

// eslint-disable-next-line import/no-cycle
import { getRequest, postRequest } from '@/utils/common';

interface QueryParams {
  type: string;
  level?: null | number;
  config?: any;
  params?: any;
  // onSuccessCallback?: (params: ApiListResponse<CommonList>) => void;
  // onErrorCallback?: (error: Error) => void;
}
export const getList = (url: string): Promise<any> => {
  return getRequest(url);
};

export const useGetCommon = ({
  type,
  config,
  params,
  // onSuccessCallback,
  // onErrorCallback,
}: QueryParams) => {
  const configRequest = {
    retry: 1,
    cacheTime: 1 * 24 * 60 * 60 * 1000, // 1 ngày
    staleTime: 1 * 24 * 60 * 60 * 1000, // 1 ngày
    ...config,
  };

  let url = '';

  switch (type) {
    default:
      url = `/${params}`;
      break;
  }

  const QUERY_KEY = [url, type];
  const data = useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getList(url),
    ...configRequest,
  });
  return data;
};

export const useGetCategoryCommon = ({ type, level }: QueryParams) => {
  const configRequest = {
    retry: 1,
    cacheTime: 5 * 24 * 60 * 60 * 1000, // 5 ngày
    staleTime: 5 * 24 * 60 * 60 * 1000, // 5 ngày
  };
  let url = '';
  switch (type) {
    case 'SKILL':
    case 'TITLE':
      url = 'category/advance-search';
      break;

    default:
      url = '';
      break;
  }
  const QUERY_KEY = [url, type, level];
  const data = useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () =>
      postRequest(url, {
        type: type || '',
        level: level || 1,
        page: 0,
        size: 9999,
      }),
    ...configRequest,
  });
  return data;
};
