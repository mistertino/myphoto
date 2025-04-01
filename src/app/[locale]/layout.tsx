import '@/styles/global.css';

// import '@/styles/font.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

import { AppConfig } from '@/utils/AppConfig';
// import Providers from '';
const Providers = dynamic(() => import('@/utils/provider'), { ssr: false }); // fix báo lỗi hydration next themes

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/assets/images/favicon_2.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/assets/images/favicon_2.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/images/favicon_2.ico',
    },
    {
      rel: 'icon',
      url: '/assets/images/favicon_2.ico',
    },
  ],
  title: {
    template: '%s',
    default: 'MyPhoto | Save your moment',
  },
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(props?.params?.locale)) notFound();
  // Using internationalization in Client Components
  // const messages = useMessages();

  return (
    <html lang={props?.params?.locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider
          locale={props?.params?.locale}
          // messages={messages}
        >
          <Providers params={props?.params}>{props.children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
