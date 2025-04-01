// import MainPage from './trangquanly/page';

import { Suspense } from 'react';

import Loading from '../loading';
import DashBoard from './DashBoard';

export default async function page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex h-20 w-full">
        <div className="flex flex-col">
          <DashBoard />
        </div>
      </div>
    </Suspense>
  );
}
