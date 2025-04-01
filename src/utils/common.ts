/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import type { GetProp, UploadProps } from 'antd';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cryptr from 'cryptr';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import saveAs from 'file-saver';
import type { JwtPayload as OriginalJwtPayload } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import type { ReactElement } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

import type { Column, Columns } from '@/components/TableCommon';
import type { IResponseGetBalance, ResponseApi } from '@/types/global';

import baseApi from './baseApi';
import baseApiFe from './baseApiFe';
import {
  BASE_RESPONSE_CODE,
  listErrorMessage,
  regexType,
  USER_PERMISSIONS,
  VALUE_ROUDING,
} from './constants';

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type TypeDate = 'day' | 'month' | 'year';
type CompareDate = 'bigger' | 'less';

export const notify = (
  message: string | ReactElement,
  type?: ToastType,
  config?: any,
): void => {
  if (type === 'info') {
    toast.info(message, {
      ...config,
    });
  }
  if (type === 'success') {
    toast.success(message);
  }
  if (type === 'warning') {
    toast.warning(message);
  }
  if (type === 'error') {
    toast.error(message);
  }
  if (!type || type === 'default') {
    toast(message);
  }
};

export const readVietnameseCurrency = (amount: number): String => {
  if (amount >= 1000000000) {
    if (amount % 1000000000 === 0) {
      return `${amount / 1000000000} tỷ`;
    }
    return `${(amount / 1000000000).toFixed(2)} tỷ`;
  }
  if (amount >= 1000000) {
    if (amount % 1000000 === 0) {
      return `${amount / 1000000} triệu`;
    }
    return `${(amount / 1000000).toFixed(2)} triệu`;
  }
  return `${amount.toLocaleString('vi-VN')} đồng`;
};

// so sánh thời gian hiện tại với thời gian truyền vào , trả về kiều 1 ngày trước, 1 giờ trước ....
export const checkTimeAgo = (time: string) => {
  const now = dayjs();
  const differenceInMintues = now.diff(time, 'minutes');
  const differenceInHours = now.diff(time, 'hour');
  const differenceInDays = now.diff(time, 'day');

  if (differenceInDays > 0) {
    return `${differenceInDays} ngày trước`;
  }
  if (differenceInHours >= 1) {
    return `${differenceInHours} giờ trước`;
  }
  if (differenceInMintues >= 1) {
    return `${differenceInMintues} phút trước`;
  }
  return 'Vài giây trước';
};

export const getRequestFe = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApiFe
      .get(url, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const getRequest = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .get(url, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const getFileRequest = (
  url: string,
  config?: AxiosRequestConfig,
  fileName?: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .get(url, config)
      .then((res: AxiosResponse) => {
        const contentDispositionHeader = res.headers['content-disposition'];

        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

        const matches = filenameRegex.exec(contentDispositionHeader);

        const filename =
          matches && matches[1]
            ? matches[1].replace(/['"]/g, '')
            : fileName || 'unknown';

        // console.log('Tên tệp tin:', decodeURIComponent(filename));
        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });
        saveAs(blob, decodeURIComponent(filename) || 'File lỗi');
        return resolve(res?.data);
      })
      .catch((err: AxiosError) => reject(err));
  });
};

export const postFileRequest = (
  url: string,
  data: any,
  fileName?: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .post(url, data, config)
      .then((res: AxiosResponse) => {
        const contentDispositionHeader = res.headers['content-disposition'];
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDispositionHeader);
        const filename =
          matches && matches[1]
            ? matches[1].replace(/['"]/g, '')
            : fileName || 'unknown';

        const blob = new Blob([res.data], {
          type: res.headers['content-type'],
        });
        saveAs(blob, decodeURIComponent(filename) || 'File lỗi');
        return resolve(res?.data);
      })
      .catch((err: AxiosError) => reject(err));
  });
};

export const postRequest = (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .post(url, data, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const putRequest = (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .put(url, data, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const putRequestNoBody = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .put(url, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const downloadFile = (data: any, fileName: string): void => {
  const blob = new Blob(data);
  saveAs(blob, fileName);
};

//  hàm convert string sang number
export const convertStringToNumber = (input: string): number | null => {
  const numberValue: number = parseFloat(input);
  if (!numberValue) {
    return null;
  }
  return numberValue;
};

// hàm convert từ string sang boolean
export const stringToBoolean = (value: string): boolean => {
  const lowerCaseValue = value && value.toLowerCase().trim();
  if (lowerCaseValue === 'true' || lowerCaseValue === '1') {
    return true;
  }
  if (lowerCaseValue === 'false' || lowerCaseValue === '0') {
    return false;
  }
  return false;
};

export const formatDate = (value: any, condition: string) => {
  return value ? dayjs(value).format(condition || 'DD/MM/YYYY') : null;
};

export const deleteRequest = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .delete(url, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const onNotiByErrorCode = (val?: string, dataMess?: string) => {
  if (val) {
    const message =
      dataMess ||
      listErrorMessage?.find((itemErr) => itemErr.code === val)?.message ||
      null;
    if (message) return notify(`${message}`, 'error');
    return notify('Lỗi hệ thống, xin vui lòng thử lại', 'error');
  }
  return notify('Lỗi hệ thống, xin vui lòng thử lại', 'error');
};

// Disabled ngày hiện tại
export const disabledDateToDay = (current: Dayjs | null) => {
  // Lấy ngày hôm nay
  const today = dayjs().startOf('day');
  // Chuyển current thành đối tượng Day.js
  const currentDay = dayjs(current).startOf('day');
  // So sánh nếu currentDay trước today
  return currentDay.isAfter(today);
};

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getCookie = (name: any) => {
  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export function encrypt(text: string) {
  const secretKey = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretKey || '');

  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decrypt(encryptedString: string) {
  const secretKey = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretKey || '');
  const text = cryptr?.decrypt(encryptedString);

  return text;
}

export const checkSuccessResponse = (response: ResponseApi): boolean => {
  if (response?.code === BASE_RESPONSE_CODE.SUCCESS) return true;
  return false;
};

export const checkDisablePermissionInUser = (permAction: string) => {
  const userPermissions = sessionStorage.getItem(USER_PERMISSIONS);
  // Nếu trong list quyền tồn tại hành động thỳ không disable (false)
  if (userPermissions?.includes(permAction)) {
    return false;
  }
  return true;
};

export const checkPermissionInUser = (permAction: string) => {
  const userPermissions = sessionStorage.getItem(USER_PERMISSIONS);
  const parseUserPermissions = JSON.parse(userPermissions ?? '[]');
  if (parseUserPermissions?.includes(permAction)) {
    return true;
  }
  return false;
};

export const hiddenElementPermission = (per: string) => {
  const userPermissions = sessionStorage.getItem(USER_PERMISSIONS);
  const parseUserPermissions = JSON.parse(userPermissions ?? '[]');
  if (parseUserPermissions?.includes(per)) {
    return '';
  }
  return 'hidden';
};

export const setDisableByPermission = (permAction: string) => {
  const userPermissions = sessionStorage.getItem(USER_PERMISSIONS);
  // Nếu trong list quyền tồn tại hành động thỳ disable (true)
  if (userPermissions?.includes(permAction)) {
    return true;
  }
  return false;
};

export const checkListPermExist = (listPermAction: string[]) => {
  // Nhận vào list quyền -> Nếu tất cả quyền trong list không tồn tại trong quyền user thỳ return false, ngược lại return true
  try {
    const userPermissions = JSON.parse(
      sessionStorage.getItem(USER_PERMISSIONS) || '',
    );
    if (
      userPermissions &&
      Array.isArray(userPermissions) &&
      listPermAction.every((item) => !userPermissions.includes(item))
    ) {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const genDisableDate = (
  current: Dayjs,
  type: TypeDate,
  quantity: number,
  compare: CompareDate,
) => {
  switch (type) {
    case 'day':
      if (compare === 'bigger')
        return (
          current >
          dayjs(new Date(new Date().setDate(new Date().getDate() + quantity)))
        );
      return (
        current <
        dayjs(new Date(new Date().setDate(new Date().getDate() - quantity)))
      );
    case 'month':
      if (compare === 'bigger')
        return (
          current >
          dayjs(new Date(new Date().setMonth(new Date().getMonth() + quantity)))
        );
      return (
        current <
        dayjs(new Date(new Date().setMonth(new Date().getMonth() - quantity)))
      );
    case 'year':
      if (compare === 'bigger')
        return (
          current >
          dayjs(
            new Date(
              new Date().setFullYear(new Date().getFullYear() + quantity),
            ),
          )
        );
      return (
        current <
        dayjs(
          new Date(new Date().setFullYear(new Date().getFullYear() - quantity)),
        )
      );
    default:
      return current > dayjs(new Date());
  }
};

export const buildSearchParams = (params: Record<string, any>) => {
  const filteredParam = Object.entries(params)
    .filter(
      ([_key, value]) => value !== undefined && value !== null && value !== '',
    )
    .reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          // Nếu là mảng, giữ lại dưới dạng mảng
          acc[key] = value;
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>,
    );

  const urlSearchParams = new URLSearchParams();
  Object.entries(filteredParam).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Thêm từng phần tử của mảng vào với cùng một key
      value.forEach((item) => urlSearchParams.append(key, item));
    } else {
      urlSearchParams.append(key, value);
    }
  });

  return urlSearchParams.toString();
};

interface ComparisonResult<T> {
  [key: string]: {
    oldValue: T[keyof T] | undefined;
    newValue: T[keyof T] | undefined;
    isDiff: boolean;
  };
}

export function compareObject<T extends Record<string, any>>(
  objOld: T,
  objNew: T,
): ComparisonResult<T> {
  const diffResult: ComparisonResult<T> = {};

  const allKeys = new Set([...Object.keys(objOld), ...Object.keys(objNew)]);

  allKeys.forEach((key) => {
    const oldValue = objOld[key];
    const newValue = objNew[key];
    let isDiff = false;
    if (
      Object.prototype.toString.call(oldValue) === '[object Object]' &&
      Object.prototype.toString.call(newValue) === '[object Object]'
    ) {
      const subCompare = compareObject(oldValue, newValue);
      const hasDiffInSubComapre = Object.values(subCompare).some(
        (itemCompare) => itemCompare.isDiff,
      );
      isDiff = hasDiffInSubComapre; // so sánh khi giá trị key là object => gọi đệ quy
    } else if (
      Object.prototype.toString.call(oldValue) === '[object Array]' &&
      Object.prototype.toString.call(newValue) === '[object Array]'
    ) {
      isDiff = JSON.stringify(objOld[key]) !== JSON.stringify(objNew[key]); // So sánh mảng không gồm các phần tử phức tạp như object, array lồng array
    } else {
      isDiff = objOld[key] !== objNew[key];
    }
    diffResult[key] = { oldValue, newValue, isDiff };
  });

  return diffResult;
}

export const removeVietnameseAccents = (str: string) => {
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .replace(/đ/g, 'd') // bỏ chữ đ
    .replace(/Đ/g, 'D'); // bỏ chữ Đ
};

export const filterOptionSelect = (input: string, option: any) =>
  removeVietnameseAccents(option?.label ?? '')
    .toLowerCase()
    .includes(removeVietnameseAccents(input).toLowerCase());

export const formatDecimal = (
  value: number | string,
  maximumFraction?: number,
): string => {
  return new Intl.NumberFormat('en-EN', {
    style: 'decimal',
    maximumFractionDigits: maximumFraction || 4,
  }).format(Number(value));
};

// FUNC check lỗi với các trường (hiện đang sử dụng trong các ô của table)
export const getErrorMessageByField = (
  isRequired: boolean,
  typeRegex: string,
  valueField: any,
) => {
  if (isRequired) {
    if (!valueField) {
      return 'Thông tin không được để trống';
    }
    if (typeRegex === 'number' && !regexType.number.test(valueField)) {
      return 'Vui lòng nhập đúng định dạng';
    }
  }
  return '';
};

export function rounding(
  value: number,
  roundType: 'UP_ROUND' | 'NORMAL_ROUND' | 'DOWN_ROUND',
  precision: number,
) {
  const num = value * 10 ** precision;

  // Kiểm tra nếu số đã là số nguyên
  if (num % 1 === 0) {
    return value; // Giữ nguyên giá trị nếu không có phần thập phân
  }

  let intPart = Math.floor(num);

  if (roundType === 'UP_ROUND') {
    intPart += 1;
  } else if (roundType === 'NORMAL_ROUND') {
    const delPart = num - intPart;
    if (delPart >= 0.5) {
      intPart += 1;
    }
  }
  return intPart / 10 ** precision;
}

export const getRoundTypeByParam = (
  value?: string,
  dataParam?: Array<{ roundingId: string; typeRounding: string }>,
) => {
  const typeRounding = dataParam?.find(
    (itemParam) => itemParam.roundingId === value,
  )?.typeRounding;
  switch (typeRounding) {
    case VALUE_ROUDING.R_UP:
      return 'UP_ROUND';
    case VALUE_ROUDING.R_DOWN:
      return 'DOWN_ROUND';
    case VALUE_ROUDING.R_NOR:
      return 'NORMAL_ROUND';
    default:
      return 'NORMAL_ROUND';
  }
};

export const getRoundValueByParam = (
  value?: string,
  dataParam?: Array<{ roundingId: string; valueRounding: number }>,
) => {
  const valueRounding = dataParam?.find(
    (itemParam) => itemParam.roundingId === value,
  )?.valueRounding;
  return valueRounding || 0;
};

// FUNC đệ quy để tìm kiếm và nối các bath (sử dụng cho việc hiển thị tên các số dư quyền hoặc số dư chứng khoán)
export const findBalancePath = (
  targetCode: string,
  arrayData: Array<IResponseGetBalance>,
): string => {
  const findPath = (id: string, path: string[] = []): string[] | null => {
    const current = arrayData.find((item) => item.id === id);
    if (!current) return null;
    path.unshift(current.balanceName);
    if (current.parentId) {
      return findPath(current.parentId, path);
    }
    return path;
  };
  const target = arrayData?.find((item) => item.balanceCode === targetCode);
  if (!target) return '';
  const path = findPath(target.id);
  return path ? path.join(' - ') : '';
};

export function sendNotiBrowser(title: string, message: string) {
  // Kiểm tra quyền trước khi gửi thông báo
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body: message,
    });

    // Xử lý khi người dùng nhấp vào thông báo
    notification.onclick = () => {
      window.focus(); // Có thể chuyển tab ứng dụng
    };

    // Xử lý khi thông báo đóng
    notification.onclose = () => {};
  } else {
    // Yêu cầu quyền nếu chưa có
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        sendNotiBrowser(title, message);
      }
    });
  }
}

export const getValueByPathOrDefault = (
  obj: any,
  path: string,
  defaultValue = null,
) => {
  return (
    path?.split('.')?.reduce((acc, key) => acc?.[key], obj) ?? defaultValue
  );
};

export const exportExcelFormTable = (
  column: Column[] | Columns[],
  dataTable: any[],
  sheetName: string,
  fileName: string,
  parseData?: (row: any, key: any) => any,
) => {
  // Trải phẳng field nếu có children
  const flattenColumns = (cols: Column[] | Columns[]): Column[] | Columns[] => {
    return cols.reduce((acc: any, col: Column | Columns) => {
      if (col.children) {
        return acc.concat(flattenColumns(col.children));
      }
      acc.push(col);
      return acc;
    }, []);
  };

  const flattenedColumns = flattenColumns(column);
  const headers = flattenedColumns.map((col: Column | Columns) => col.name);
  const dataKeys = flattenedColumns.map((col: Column | Columns) => col.field);

  const dataRows = dataTable.map((row) =>
    dataKeys.map((key: any) => {
      if (parseData) {
        return parseData(row, key);
      }
      return row[key] ?? '';
    }),
  );

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataRows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Xuất file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const formatterInputNumber = (value: any) => {
  if (!value) return value;
  const [integer, decimal] = value.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

export const getInitialsName = (name: string): string => {
  const parts = name?.trim()?.split(/\s+/) || []; // Tách từ và loại bỏ khoảng trắng thừa

  if (parts.length === 0) return ''; // Nếu chuỗi rỗng, trả về ""

  const firstLetter = parts[0]?.[0] ?? ''; // Lấy chữ cái đầu của họ (nếu có)
  const lastLetter = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''; // Lấy chữ cái đầu của tên (nếu có)

  return (firstLetter + lastLetter).toUpperCase();
};

export const checkValidToken = (token: string) => {
  const decodeToken = jwt_decode<OriginalJwtPayload>(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decodeToken?.exp && decodeToken?.exp > currentTime;
};

const isValidExpression = (expr: string) => {
  // Kiểm tra nếu có ký tự không hợp lệ
  if (!/^[\d+\-*/().\s]+$/.test(expr)) return false;
  try {
    // eslint-disable-next-line no-eval
    eval(expr); // Kiểm tra thử có lỗi không
    return true;
  } catch {
    return false;
  }
};

export const evaluateExpression = (expr: string) => {
  try {
    const sanitizedExpr = expr.replace(/\s+/g, '');
    if (isValidExpression(sanitizedExpr)) {
      // eslint-disable-next-line no-eval
      const result = eval(sanitizedExpr);
      return Math.round(result * 1e15) / 1e15;
    }
    return 'ERROR';
  } catch {
    return 'ERROR';
  }
};
