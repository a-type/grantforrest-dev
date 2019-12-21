import { isFuture } from 'date-fns';

export function cn(...args: any[]) {
  return args.filter(Boolean).join(' ');
}

export function mapEdgesToNodes(data: any) {
  if (!data.edges) return [];
  return data.edges.map((edge: any) => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }: { slug: { current: string } }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture({ createdAt }: { createdAt: Date }) {
  return !isFuture(createdAt);
}

export function getBlogUrl(slug: string) {
  return `/blog/${slug}`;
}

export function getPortfolioUrl(slug: string) {
  return `/portfolio/${slug}`;
}

export function getPortfolioElementId(slug: string) {
  return `project-${slug}`;
}

export function toPlainText(blocks: any) {
  if (!blocks) {
    return '';
  }
  return blocks
    .map((block: any) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n\n');
}
