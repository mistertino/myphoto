import { OBJ_JOURNAL_STATUS, OBJ_TRANSCODE } from './constantObjStatus';

// OPTIONS TRẠNG THÁI BÚT TOÁN HỦY/GỐC
export const OPTIONS_JOURNAL_STATUS = [
  {
    value: OBJ_JOURNAL_STATUS.TAO_MOI,
    label: 'Tạo mới',
    count: 'countCreate',
  },
  {
    value: OBJ_JOURNAL_STATUS.CHO_GUI,
    label: 'Chờ gửi',
    count: 'countWait',
  },
  {
    value: OBJ_JOURNAL_STATUS.DA_GUI,
    label: 'Đã gửi',
    count: 'countSubmitted',
  },
  {
    value: OBJ_JOURNAL_STATUS.THANH_CONG,
    label: 'Thành công',
    count: 'countSuccess',
  },
  {
    value: OBJ_JOURNAL_STATUS.LOI,
    label: 'Lỗi',
    count: 'countError',
  },
];

// OPTIONS TRANSCODE
export const OPTIONS_TRANSCODE = [
  {
    value: OBJ_TRANSCODE.DIST,
    label: 'DIST',
  },
  {
    value: OBJ_TRANSCODE.FIN,
    label: 'FIN',
  },
  {
    value: OBJ_TRANSCODE.TRANSR,
    label: 'RTRANS',
  },
  {
    value: OBJ_TRANSCODE.TRANS,
    label: 'TRANS',
  },
  {
    value: OBJ_TRANSCODE.REGIS,
    label: 'REGIS',
  },
];

// Giá trị trạng thái hạch toán quyền
export const RIGHT_SUCCESS_VALUE = {
  SUCCESS: '1',
  FAIL: '2',
  WAIT: '3',
};

export const optionRightSuccess = [
  { label: 'Thành công', value: RIGHT_SUCCESS_VALUE.SUCCESS },
  { label: 'Lỗi', value: RIGHT_SUCCESS_VALUE.FAIL },
  { label: 'Chờ xử lý', value: RIGHT_SUCCESS_VALUE.WAIT },
];

// Giá trị gửi điện Quyền
export const GW_STATUS = {
  CREATE: '1',
  SEND: '2',
  SUCCESS: '3',
};

export const optionGWStatus = [
  { label: 'Tạo mới', value: GW_STATUS.CREATE },
  { label: 'Đã gửi', value: GW_STATUS.SEND },
  { label: 'Gửi thành công', value: GW_STATUS.SUCCESS },
];

// giá trị Trạng thái điện xác nhận
export const VALUE_VSD_CONFIRM_STATUS = {
  CREATE: 1,
  SENDING: 2,
  SUCCESS: 3,
  FAIL: 4,
};

// trạng thái điện nhận
export const optionVsdConfirmStatus = [
  { value: VALUE_VSD_CONFIRM_STATUS.CREATE, label: 'Đã tạo' },
  { value: VALUE_VSD_CONFIRM_STATUS.SENDING, label: 'Đang gửi' },
  { value: VALUE_VSD_CONFIRM_STATUS.SUCCESS, label: 'Gửi thành công' },
  { value: VALUE_VSD_CONFIRM_STATUS.FAIL, label: 'Điện lỗi' },
];

// trạng thái điện
export const VALUE_VSD_STATUS = {
  MSG_CREATE: '1',
  MSG_SEND: '2',
  MSG_ACK: '3',
  MSG_NACK: '4',
  MSG_DONE: '5',
  MSG_REJECT: '6',
};

export const optionVsdStatus = [
  { value: VALUE_VSD_STATUS.MSG_CREATE, label: 'Đã tạo' },
  { value: VALUE_VSD_STATUS.MSG_SEND, label: 'Đã gửi' },
  { value: VALUE_VSD_STATUS.MSG_ACK, label: 'Gửi thành công' },
  { value: VALUE_VSD_STATUS.MSG_NACK, label: 'Điện lỗi' },
  { value: VALUE_VSD_STATUS.MSG_DONE, label: 'Hoàn thành' },
  { value: VALUE_VSD_STATUS.MSG_REJECT, label: 'Từ chối' },
];
