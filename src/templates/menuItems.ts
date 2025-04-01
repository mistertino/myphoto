import { URL_APP } from '../utils/constants';
// Định nghĩa interface cho mỗi item trong menu

export interface MenuItem {
  key: string; // key render cho menu
  icon?: string; // Icon của menu
  label: string; // Tên menu
  children?: MenuItem[]; // dành cho menu phân cấp
  href?: string; // Use 'href' to specify the path with Next.js Link // Link điều hướng menu
  type?: 'divider' | 'group' | 'dashed' | 'TITLE' | 'none'; // Optional type property for dividers // TYPE hiển thị cho từng loại menu
  roles?: string[]; // Optional roles property
  hide?: boolean; // Ẩn hiển menu true-false
  level?: number; // Phân cấp menu 1-2-3-4-5
  permView?: string; // Quyền xem menu (khai báo bên file constants)
}

// type MenuItem = Required<MenuProps>['items'][number];

// export interface MenuItemCustom extends MenuItem {
//   href?: string;
//   key: string;
//   icon?: string;
//   label: string;
//   children?: MenuItemCustom[];
// }

export interface LangItem {
  key: string;
  icon?: string;
  label: string;
  href?: string;
}

// Khai báo các items của menu
export const menuItems: MenuItem[] = [
  {
    key: 'TONG_QUAN',
    icon: 'fa-regular fa-chart-user',
    label: 'Tổng quan',
    type: 'none',
    href: URL_APP.TONG_QUAN,
  },
  {
    key: 'CAPTURE',
    icon: 'fa-solid fa-aperture fa-rotate-270 fa-lg',
    label: 'Chụp',
    type: 'none',
    href: URL_APP.CHUP,
  },
];

export const items: LangItem[] = [
  {
    key: 'SIGN_OUT',
    label: 'Đăng xuất',
  },
];
