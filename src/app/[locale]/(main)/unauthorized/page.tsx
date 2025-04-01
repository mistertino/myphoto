import { redirect } from 'next/navigation';

import { getAccessToken } from '@/utils/sessionTokenAccessor';

import UnAuthorized from './UnauthorizedPage';

async function page() {
  const accessToken = await getAccessToken();
  if (accessToken) return redirect('/');
  return (
    <div>
      <UnAuthorized />
    </div>
  );
}

export default page;
