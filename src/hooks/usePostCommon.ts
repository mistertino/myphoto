import { useQuery } from '@tanstack/react-query';

import { postRequest } from '@/utils/common';
import { URL_SERVICE } from '@/utils/constants';

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
    case 'ROLES':
      url = `${URL_SERVICE.IDENTITY}/api/v1/role/search`;
      break;
    case 'ROLE_GROUP':
      url = `${URL_SERVICE.IDENTITY}/api/v1/role-group/search`;
      break;
    case 'BROKER_COMPANY': // Danh sách công ty chứng khoán được phép đặt lệnh
      url = `${URL_SERVICE.CORE}/api/v1/objects/master/search`;
      break;
    case 'TAX_FEE': // Danh sách thuế phí
      url = `${URL_SERVICE.TAX_FEE}/api/v1/tax-fee/master/search`;
      break;
    case 'TAX_FEE_PACKAGE': // Danh sách gói thuế phí
      url = `${URL_SERVICE.TAX_FEE}/api/fee-package/master/v2`;
      break;
    default:
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
