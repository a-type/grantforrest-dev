import { ThemeName } from '@clouds/colors';

export interface Frontmatter {
  title: string;
  publishedAt?: string;
  draft?: boolean;
  readingTime?: { text: string; minutes: number; time: number; words: number };
  slug?: any;
  layout?: 'article' | 'full';
  theme?: ThemeName;
}

export interface Post {
  frontmatter?: Frontmatter;
  code?: any;
}
