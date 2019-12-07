import { format, isFuture } from 'date-fns';

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

export function filterOutDocsPublishedInTheFuture({ publishedAt }: { publishedAt: Date }) {
  return !isFuture(publishedAt);
}

export function getBlogUrl(publishedAt: Date | string, slug: { current: string }) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`;
}

export function getPortfolioUrl(publishedAt: Date | string, slug: { current: string }) {
  return `/portfolio/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`;
}

export function getPortfolioElementId(publishedAt: Date | string, slug: { current: string }) {
  return `project-${format(publishedAt, 'YYYY-MM')}-${slug.current}`;
}

export function buildImageObj(source: any = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  } as any;

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
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
