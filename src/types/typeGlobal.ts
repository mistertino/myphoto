import type { Dayjs } from 'dayjs';

// Type Response không phân trang
export interface ApiResponseNoPagination<T> {
  clientMessageId?: string;
  clientTime?: string;
  data?: Array<T>;
  duration?: number;
  path?: string;
  responseTime?: string;
  status?: number;
}

export interface ApiResponseNoPaginationDataObject<T> {
  clientMessageId?: string;
  clientTime?: string;
  data?: T;
  duration?: number;
  path?: string;
  responseTime?: string;
  status?: number;
}

export interface ApiResponseNoPaginationEmployee<T> {
  clientMessageId?: string;
  clientTime?: string;
  data: T;
  duration?: number;
  path?: string;
  responseTime?: string;
  status?: number;
}

// Type Response có phân trang
export interface ApiResponsePagination<T> {
  clientMessageId?: string;
  clientTime?: string;
  data?: ContentResponse<T>;
  duration?: number;
  path?: string;
  responseTime?: string;
  status?: number;
}

// Content response phân trang
interface ContentResponse<T> {
  content?: Array<T>;
  first?: boolean;
  hasContent?: boolean;
  hasNext?: boolean;
  hasPrevious?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}

// Type Response get chức danh
export interface ResponsePosition {
  code?: string;
  description?: string | null;
  getAllTypeCategoryTree?: Array<ResponsePosition>;
  id?: string;
  level?: number;
  name?: string;
  parentId?: string | null;
  type?: string;
  value?: string;
}

// Repose Upload
export interface ApiResponseUpload {
  fileName?: string;
  folderPath?: string;
  id: string;
}

// Type Input Render UI
export interface InputTypeField {
  label?: string;
  placeHolder?: string;
  field?: string;
  type?: InputType;
  isRequired?: boolean;
  width?: string;
  isMulti?: boolean;
  format?: string;
  minLength?: number;
  maxLength?: number;
  maxValue?: number;
  minValue?: number;
  typeValidate?: InputValidateType;
  data?: any[];
  maxDate?: Dayjs;
  disableEdit?: boolean;
  readOnly?: boolean; // không cho phép sửa sau duyệt
  placeholder?: string;
  isKRX_Show?: boolean;
  isKRX_Hidden?: boolean;
}

// Response Api Skill
export interface ResponseSkill {
  code?: string;
  createdDate?: string;
  description?: string;
  id?: string;
  level?: number;
  name?: string;
  parentId?: string;
  type?: string;
  value?: string;
}

export type TypeOptTreeSelect = {
  label: string;
  value: string;
  children?: TypeOptTreeSelect[];
};

// Các Type Input
export type InputType =
  | 'INPUT'
  | 'EMAIL'
  | 'NUMBER'
  | 'RADIO'
  | 'CHECKBOX'
  | 'TEXTAREA'
  | 'DATEPICKER'
  | 'SELECT'
  | 'SELECT-MULTI'
  | 'SELECT_TRANSPARENT'
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
  | 'LABEL'
  | 'TRANSPARENT'
  | 'BUTTON';

// Các Type Input Validate
export type InputValidateType = 'STRING' | 'DATE' | 'EMAIL';

export type ActionNotifyType = 'DOWNLOADS' | 'DETAILS';
