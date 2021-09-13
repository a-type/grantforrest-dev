import { ArtCanvas } from '@components/ArtCanvas';
import { useScrollSnap } from '@hooks/useScrollSnap';
import { IdProvider } from '@radix-ui/react-id';
import { box } from '@styles/box';
import { globalStyles } from '@styles/global';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Scene = dynamic(() => import('@clouds/Scene'), { ssr: false });

function App({ Component, pageProps }) {
  globalStyles();
  useScrollSnap();

  return (
    <IdProvider>
      <Head>
        <title>Grant Forrest</title>
      </Head>
      <Scene style={{ position: 'absolute' }} />
      <ArtCanvas
        className={box({
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        })}
      >
        <div
          className={box({
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
          })}
        >
          <div
            className={box({
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            })}
          >
            <Component {...pageProps} />
          </div>
        </div>
      </ArtCanvas>
    </IdProvider>
  );
}

export default App;
