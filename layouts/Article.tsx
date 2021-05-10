import { container } from '@styles/container';

export interface ArticleProps {
  children?: React.ReactNode;
}

export function Article(props: ArticleProps) {
  return <article className={container()} {...props} />;
}
