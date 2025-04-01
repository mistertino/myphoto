/* eslint-disable import/no-cycle */

export const regexType = {
  // regex tên tài khoản
  userName: /^[a-z0-9]+$/, // minh123

  // regex mật khẩu
  passwordRegex:
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?!.*\s).{8,}$/,

  // tên tiếng việt không số và có kí hiệu (.,-&+) không nhận toàn khoảng trắng
  // vnFullName:
  //   /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ.,&+-]+( [a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ.,&+-]+)*$/,

  fullName: /^[\p{L}\s\d]+$/u, // Nguyễn Xuân Hạnh 123

  vnFullName: /^[\p{L}\s]+$/u, // Nguyễn Xuân Hạnh

  // regex sdt ở việt nam
  vnNumberPhone: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,

  // regex email
  // eslint-disable-next-line no-useless-escape
  // email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  email: /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,

  // regex số cmnd/cccd
  idNumber: /^\d{9}(?:\d{3})?$/,

  // regex chỉ nhập số k nhập chữ
  number: /^-?\d*(\.\d*)?$/, // 1234567890

  // regex nhập số kết hợp với dấu .
  regexNumberWithDot: /^[0-9.]*$/, // 0.12345

  // website
  website:
    // eslint-disable-next-line no-useless-escape
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,

  time: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
};
export const baseApi = process.env.NEXT_PUBLIC_BASE_API_URL;
export const baseApiFe = process.env.NEXT_PUBLIC_BASE_API_FE_URL;
export const baseWs = process.env.NEXT_PUBLIC_WEB_SOCKET_URL;

export const URL_KEYCLOAK_AUTH = process.env.NEXT_PUBLIC_BASE_URL_KEYCLOAK_AUTH;
export const URL_KEYCLOAK_TOKEN =
  process.env.NEXT_PUBLIC_BASE_URL_KEYCLOAK_TOKEN;
export const CLIENT_ID_2FA = process.env.NEXT_PUBLIC_BASE_2FA_CLIENT_ID;
export const CLIENT_SECRET_2FA = process.env.NEXT_PUBLIC_BASE_2FA_CLIENT_SECRET;
export const BASE_SOCKET_URL = process.env.NEXT_PUBLIC_BASE_SOCKET_URL;
export const KRX_FLAG = Boolean(
  Number(process.env.NEXT_PUBLIC_KRX_FLAG) || false,
);

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const USER_PERMISSIONS = 'USER_PERMISSIONS';

export const ORIGINAL = 'ORIGINAL';
export const TEMP = 'TEMP';

export const formatYMD = 'YYYY-MM-DD';
export const formatDMY = 'DD/MM/YYYY';
export const formatDMY1 = 'DD/MM/YYYY';
export const formatYMDZ = 'YYYY-MM-DDTHH:mm:ss.000[Z]';

export const formatDMYHMS = 'DD/MM/YYYY HH:mm:ss';
export const formatYMDHMS = 'YYYY/MM/DD HH:mm:ss';
export const OPTIONS_GENDER = [
  {
    value: '1',
    label: 'Nam',
  },
  {
    value: '2',
    label: 'Nữ',
  },
];

export const BASE_RESPONSE_CODE = {
  SUCCESS: '000',
};

export const URL_APP = {
  TONG_QUAN: '/',
  CHUP: '/capture',
};

export const YES_VALUE = '1';
export const NO_VALUE = '0';

export const FILE_TYPE = {
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS: 'application/vnd.ms-excel',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  DOC: 'application/msword',
  TXT: 'text/plain',
  PNG: 'image/png',
  JEPG: 'image/jpeg',
  PDF: 'application/pdf',
};

export const listErrorMessage = [
  { code: '403', message: 'Tài khoản không có quyền' },
  { code: '001', message: 'Thời hạn giao dịch đã kết thúc' },
  { code: '801', message: 'Bản ghi tồn tại' },
  {
    code: '802',
    message:
      'Không được phép mở lại tài khoản do không phải cá nhân, tổ chức nước ngoài',
  },
  {
    code: '803',
    message:
      'Không thể đóng tài khoản lưu ký do tồn tại tiểu khoản đang hoạt động',
  },
];

// giá trị làm tròn
export const VALUE_ROUDING = {
  R_UP: '1',
  R_DOWN: '2',
  R_NOR: '3',
};

export const arrNgay = [
  ...Array.from({ length: 28 }, (_, index) => ({
    label: index + 1,
    value: (index + 1).toString(),
  })),
];

export const arrThang = [
  ...Array.from({ length: 12 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  })),
];

export const arrNam = Array.from({ length: 20 }, (i: number) => {
  const year = new Date().getFullYear() + i;
  return { label: `${year}`, value: year };
});
