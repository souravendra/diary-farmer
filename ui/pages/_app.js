/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from '@/next-i18next.config';
import WithAuth from '@/components/auth/WithAuth.js';
import { getLayout } from '@/components/layout/LayoutConfiguration';
import dynamic from 'next/dynamic';

const DynamicAuthWithNoSSR = dynamic(
  () => import('@/components/auth/WithAuth.js'),
  {
    ssr: false,
  },
);

function MyApp({ Component, pageProps, router }) {
  let layout = getLayout(router.pathname);
  return (
    <DynamicAuthWithNoSSR router={router}>
      {layout({ children: <Component {...pageProps} /> })}
    </DynamicAuthWithNoSSR>
  );
}

export default appWithTranslation(MyApp, nextI18nextConfig);
