'use client';

/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import { CollapsedProvider } from '@/context/CollapsedContext';
import { ModalProvider } from '@/context/ModalNotiSessionContext';

// import { useDetect } from '@/hooks/useDetect';

function Providers({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  const [client] = React.useState(new QueryClient());
  const timeZone = 'Asia/Ho_Chi_Minh';
  // const rdd = useDetect();
  // let clerkLocale = enUS;
  // let signInUrl = '/sign-in';
  // let signUpUrl = '/sign-up';
  // let dashboardUrl = '/dashboard';

  // console.log('useDetect', rdd);

  // if (params.locale === 'fr') {
  //   clerkLocale = frFR;
  // }

  // if (params.locale !== 'en') {
  //   signInUrl = `/${params.locale}${signInUrl}`;
  //   signUpUrl = `/${params.locale}${signUpUrl}`;
  //   dashboardUrl = `/${params.locale}${dashboardUrl}`;
  // }
  return (
    <NextIntlClientProvider
      locale={params.locale}
      messages={messages}
      timeZone={timeZone}
    >
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>
          <SessionProvider>
            <ThemeProvider attribute="class" enableSystem defaultTheme="light">
              <ModalProvider>
                <CollapsedProvider>
                  {/* <NotifyProvider> */}
                  {children}
                  {/* </NotifyProvider> */}
                </CollapsedProvider>
              </ModalProvider>
            </ThemeProvider>
          </SessionProvider>
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}

export default Providers;
