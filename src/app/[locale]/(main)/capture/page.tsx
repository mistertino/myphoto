import React, { Suspense } from 'react';

import Loading from '../../loading';
import Capture from './Capture';

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Capture />
      </div>
    </Suspense>
  );
};

export default Page;
