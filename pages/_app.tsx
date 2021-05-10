import { globalStyles } from '@styles/global';
import { IdProvider } from '@radix-ui/react-id';
import Head from 'next/head';
import { box } from '@styles/box';
function App({ Component, pageProps }) {
  globalStyles();

  return (
    <IdProvider>
      <Head>
        <title>Grant Forrest</title>
      </Head>
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
    </IdProvider>
  );
}

export default App;
