'use client';

import { signIn } from 'next-auth/react';
import React, { useEffect } from 'react';

function UnAuthorized() {
  useEffect(() => {
    signIn('keycloak');
  }, []);
  return (
    <div className="flex size-full items-center justify-center">
      <span>Vui lòng đăng nhập.......</span>
    </div>
  );
}

export default UnAuthorized;
