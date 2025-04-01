/* eslint-disable import/no-extraneous-dependencies */

'use client';

import 'dayjs/locale/vi';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import RotatingText from '@/components/RotatingText/RotatingText';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('vi');

const DashBoard = () => {
  const now = dayjs();
  const thu = now.format('dddd');
  // Lấy thứ trong tuần
  const ngay = now.date();
  // Lấy ngày
  const thang = now.month() + 1;
  // Lấy tháng (cộng thêm 1 vì index từ 0)
  const nam = now.year(); // Lấy năm

  return (
    <div className="flex min-h-[80vh] w-full items-center">
      <div className='flex gap-2 items-center justify-center ml-10'>

        <span className='text-5xl text-white font-semibold'>Save</span>

        <RotatingText
          texts={['moment', 'memory', 'emotions', 'love!']}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black text-5xl font-semibold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>
    </div>
  );
};

export default DashBoard;
