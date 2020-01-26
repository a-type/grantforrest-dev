import { ProjectPreviewData, BlogPostPreviewData } from '../fragments';
import { getPortfolioUrl, getBlogUrl } from './helpers';

export const projectToPreviewable = (project: ProjectPreviewData) => ({
  title: project.title,
  createdAt: project.createdAt,
  excerpt: project.summary,
  url: getPortfolioUrl(project.slug),
  coverImage: project.mainImage,
  size: 'large' as const,
});

export const postToPreviewable = (post: BlogPostPreviewData) => ({
  title: post.title,
  createdAt: post.createdAt,
  excerpt: post.excerpt,
  url: getBlogUrl(post.slug),
  coverImage: post.mainImage,
  size: 'medium' as const,
});
