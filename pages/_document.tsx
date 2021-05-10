import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssString } from '../stitches.config';
import { BODY_FONT_SOURCE, TITLE_FONT_SOURCE } from '@constants/fonts';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style
              id="stitches"
              dangerouslySetInnerHTML={{ __html: getCssString() }}
            />
          </>
        ),
      };
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />
          <link rel="icon" href="/favicon.ico" />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link href={TITLE_FONT_SOURCE} rel="preload" as="style" />
          <link href={TITLE_FONT_SOURCE} rel="stylesheet" media="all" />
          <link href={BODY_FONT_SOURCE} rel="preload" as="style" />
          <link href={BODY_FONT_SOURCE} rel="stylesheet" media="all" />
          <noscript>
            <link href={TITLE_FONT_SOURCE} rel="stylesheet" />
            <link href={BODY_FONT_SOURCE} rel="stylesheet" />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
