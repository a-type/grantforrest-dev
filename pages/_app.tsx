import { Box } from '@components/Box';
import { IdProvider } from '@radix-ui/react-id';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { globalCss } from 'stitches.config';

const Scene = dynamic(() => import('@clouds/Scene'), { ssr: false });

export const globalStyles = globalCss({
  body: {
    backgroundColor: '#408eaf',
    color: '$white',
    fontFamily: '$body',
    lineHeight: '$1',
    margin: 0,
    overflow: 'overlay',
    letterSpacing: '0.02em',
  },

  '*': {
    boxSizing: 'border-box',
  },

  ul: {
    paddingLeft: '$2',
  },

  figure: { margin: 0 },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  svg: { display: 'inline-block', verticalAlign: 'middle' },
});

function App({ Component, pageProps }) {
  globalStyles();

  return (
    <IdProvider>
      <Head>
        <title>Grant Forrest</title>
      </Head>
      <Scene style={{ position: 'fixed' }} />
      <Box
        css={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Box
          css={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Component {...pageProps} />
        </Box>
      </Box>
    </IdProvider>
  );
}

export default App;
