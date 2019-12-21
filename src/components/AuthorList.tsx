import * as React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/imageUrl';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '2rem 0 3rem',
    borderTop: `1px solid ${theme.palette.grey[50]}`,
  },
  headline: {
    fontWeight: 600,
    margin: '0.5rem 0 0',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    fontSize: theme.typography.pxToRem(14),
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& > div:last-child': {
      flex: 1,
      marginLeft: '0.5rem',
    },
  },
  avatar: {
    position: 'relative',
    width: '3em',
    height: '3em',
    background: theme.palette.grey[50],
    borderRadius: '50%',
    overflow: 'hidden',

    '& img': {
      width: '100%',
      height: '100%',
      verticalAlign: 'top',
      objectFit: 'cover',
    },
  },
}));

function AuthorList({ items, title }: { items: any[]; title: string }) {
  const styles = useStyles({ items, title });

  return (
    <div className={styles.root}>
      <h2 className={styles.headline}>{title}</h2>
      <ul className={styles.list}>
        {items.map(({ author, _key }) => {
          const authorName = author && author.name;
          return (
            <li key={_key} className={styles.listItem}>
              <div>
                <div className={styles.avatar}>
                  {author && author.image && author.image.asset && (
                    <img
                      src={imageUrlFor(buildImageObj(author.image))
                        .width(100)
                        .height(100)
                        .fit('crop')
                        .url()}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                <div>{authorName || <em>Missing name</em>}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AuthorList;
