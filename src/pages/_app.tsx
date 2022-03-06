import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme/theme';
import createEmotionCache from '../createEmotionCache';
import NextNProgress from 'nextjs-progressbar';
import componentsOverride from '../theme/overrides';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SuperTokens from 'supertokens-auth-react/lib/build/superTokens';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { config } from '../utils/config';
import SnackbarProvider from '../components/SnackbarProvider';
import Layout from '../components/Layout';

const clientSideEmotionCache = createEmotionCache();

if (typeof window !== 'undefined') {
  SuperTokens.init({
    appInfo: {
      appName: 'WHM',
      apiDomain: config.apiUrl,
      websiteDomain: config.websiteUrl,
      apiBasePath: '/v1/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [EmailPassword.init(), Session.init()],
  });
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  let t = theme;
  t.components = componentsOverride(theme);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={t}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NextNProgress color={t.palette.primary.main} />
        <SnackbarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
