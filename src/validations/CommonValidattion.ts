import { z } from 'zod';

import { regexType } from '@/utils/constants';

export const UserValidation = z.object({
  userName: z
    .string()
    .min(1, 'tối thiểu 1 ký tự')
    .max(30, 'tối đa 30 ký tự')
    .regex(regexType.userName, 'sai định dạng dạng'),
  email: z
    .string()
    .min(5, 'tối thiểu 5 ký tự')
    .max(255, 'tối đa 255 ký tự')
    .email('không đúng định dạng'),
  expYear: z.number().min(1, 'tối thiểu 1 ký tự'),
  gender: z.string().max(255, 'tối đa 255 ký tự'),
  skill: z.string().max(255, 'tối đa 255 ký tự'),
  address: z.string().min(1, 'tối thiểu ký tự').max(255, 'tối đa 255 ký tự'),
  numberPhone: z
    .string()
    .max(10, 'tối đa 10 số')
    .regex(regexType.vnNumberPhone, 'số điện thoại không đúng định dạng'),
  // birth: z.date(),
  province: z.string().max(255, 'tối đa 255 ký tự'),
  district: z.string().max(255, 'tối đa 255 ký tự'),
  subDistrict: z.string().max(255, 'tối đa 255 ký tự'),
});
