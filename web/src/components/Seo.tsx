import * as React from 'react';
import Helmet from 'react-helmet';

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
  image?: any;
};

function SEO({ description, lang, meta, keywords, title, image }: SEOProps) {
  const metaDescription = description || '';
  const siteTitle = title || '';
  const siteAuthor = 'Grant Forrest';

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteAuthor,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]
        .concat(
          keywords && keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
            : [],
        )
        .concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

export default SEO;
