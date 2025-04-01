/* eslint-disable @typescript-eslint/consistent-type-imports */

import { StepProps } from 'antd';

// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/en.json');
declare interface IntlMessages extends Messages {}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  user: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type InputType =
  | 'INPUT'
  | 'EMAIL'
  | 'NUMBER'
  | 'RADIO'
  | 'CHECKBOX'
  | 'TEXTAREA'
  | 'DATEPICKER'
  | 'SELECT'
  | 'SELECT_SEARCH'
  | 'RANGE_PICKER'
  | 'RADIO_GROUP'
  | 'TEXT'
  | 'UPLOAD'
  | 'ANSWERS'
  | 'SWITCH'
  | 'TREE-SELECT'
  | 'FILE'
  | 'CAMERA'
  | 'DATEPICKER_GROUP'
  | 'STATUS_GROUP'
  | 'CASCADER'
  | 'DATE'
  | 'TIME'
  | 'COLLAPSE'
  | 'TABLE'
  | 'BUTTON'
  | 'LABEL'
  | 'SLIDER'
  | 'CUSTOM'
  | 'DECIMAL';

export interface Province {
  provinceCode: string;
  provinceName: string;
}

export interface District {
  districtCode: string;
  districtName: string;
  provinceCode: string;
}

export interface SubDistrict {
  subDistrictCode: string;
  subDistrictName: string;
  districtCode: string;
}

// interface GroupUserRoles {
//   createdDate: string;
//   createdUser: string | null;
//   id: string;
//   isDeleted: boolean | null;
//   modifiedDate: string;
//   modifiedUser: string | null;
//   roleCode: string;
//   roleName: string;
// }
interface ResponseDataUserInfo {
  authorities: string[];
  groupNames: string[];
  roleNames: string[];
  empAuthInfoVo: { empId: string; empName: string };
  groups: Array<any>;
  roleNames: string[];
  userName: string;
  fullName: string;
}
export interface UserInfo {
  clientMessageId: string | null;
  clientTime: string | null;
  duration: number | null;
  path: string | null;
  responseTime: number | null;
  status: number | null;
  data: ResponseDataUserInfo;
}

export type Location = Province & District & SubDistrict;

// -----------------------------NEW---------------------------------

export type ResponseStatus = 0 | 1; // 0 : lỗi, 1: Success

export interface SuccessResponse<T> {
  status: ResponseStatus;
  duration: number;
  path: string;
  responseTime: string;
  clientTime: string;
  clientMessageId: string;
  data: T;
}

export interface ErrorResponse<T> {
  status: ResponseStatus;
  duration: number;
  path: string;
  responseTime: string;
  clientTime: string;
  clientMessageId: string;
  data: T;
  code: string;
  message: string;
  additionalData: string;
}

export interface SuccessResponseNoPagingObj<T> {
  code: string;
  desc: string;
  data: T;
}

export interface SuccessResponsePaging<T> {
  status: ResponseStatus;
  code: string;
  desc: string;
  data: {
    size: number;
    content: T[];
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    totalPages: number;
    totalElements: number;
  };
}

export interface SuccessResponseNonPaging<T> {
  code: string;
  desc: string;
  data: T[];
}

// INPUT TYPE RENDER UI
export interface FieldType {
  colSpan?: number;
  label: string;
  field: string;
  type: InputType;
  placeHolder?: string | string[];
  validatorCustom?: any;
  isRequired?: boolean;
  isMulti?: boolean;
  width?: string;
  placeHolder?: string;
  maxLength?: number;
  isKRX_Hidden?: boolean;
  isKRX_Show?: boolean;
}

export interface ResponseApi {
  code: string;
  data: any;
  desc: string;
}

export interface OptionSelect {
  label: string;
  value: any;
}

// ====EDIT TABLE ===
export type EditCellProps = {
  editing?: any;
  value?: any;
  dataIndex?: any;
  title?: any;
  inputType?: any;
  onChange?: any;
  onBlur?: any;
  isRequired: boolean;
  record?: any;
  index?: any;
  maxLength?: number;
  maxDate?: Dayjs;
  children?: any;
  restProps?: Object;
  typeRegex?: string;
};

export interface EditTableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  isRequired: boolean;
  typeRegex: string;
  // record: Object;
  // index: number;
  children?: any;
  restProps?: Object | undefined;
}

export interface IResponseGetParams {
  paramCode: string;
  paramName: string;
}

export interface IResponseGetNationality {
  nationCode: string;
  nationName: string;
}

export interface IResponseGetBranch {
  branchCode: string;
  branchName: string;
}

export interface IResponseGetExchange {
  exchangeCode: string;
  exchangeName: string;
}

export interface IResponseGetBalance {
  balanceCode: string;
  balanceName: string;
  parentId: string | null;
  id: string;
}

export const messageValidation = 'Thông tin không được để trống';
export type LocalePrefix = 'as-needed' | 'always' | 'never';

export type ItemUserConfig = {
  configType: string;
  configValue: string;
};

export interface StepPropsCustom extends StepProps {
  key: string;
}

export type RangeValue =
  | [Dayjs | null | undefined, Dayjs | null | undefined]
  | null;

export type ItemDashBoard = {
  title: string;
  type: string;
  size: 'big' | 'small';
};
