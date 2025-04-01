// import MainPage from './trangquanly/page';

'use server';

import DashBoard from './DashBoard';

export default async function page() {
  return (
    <div className="flex h-20 w-full">
      <div className="flex flex-col">
        <DashBoard />
      </div>
    </div>
  );
}
