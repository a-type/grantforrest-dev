import * as React from 'react';
import { ProjectPreviewData, BlogPostPreviewData, GithubRepoPreview } from '../fragments';
import { getPortfolioUrl, getBlogUrl } from './helpers';
import { Box, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import GithubIcon from '../components/GithubIcon';

export const projectToPreviewable = (project: ProjectPreviewData) => ({
  title: project.title,
  createdAt: project.createdAt,
  excerpt: project.summary,
  url: getPortfolioUrl(project.slug),
  coverImage: project.mainImage,
  size: 'large' as const,
  type: 'project' as const,
  labels: ['project'],
});

export const postToPreviewable = (post: BlogPostPreviewData) => ({
  title: post.title,
  createdAt: post.createdAt,
  excerpt: post.excerpt,
  url: getBlogUrl(post.slug),
  coverImage: post.mainImage,
  size: 'medium' as const,
  type: 'post' as const,
  labels: ['blog'],
});

export const repoToPreviewable = (repo: GithubRepoPreview) => ({
  title: repo.name,
  createdAt: repo.createdAt,
  excerpt: repo.description,
  url: repo.url,
  size: 'medium' as const,
  type: 'repo' as const,
  labels: ['github', ...repo.repositoryTopics.nodes.map(n => n.topic.name)],
  extraContent: (
    <Box display="flex" flexDirection="row" mb={2} alignItems="center">
      <GithubIcon style={{ width: 24, height: 24, marginRight: 8 }} />
      <Box display="flex" flexDirection="row" flex="1" alignItems="center">
        <Star style={{ marginRight: 8 }} /> <Typography>{repo.stargazers.totalCount}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '100%',
            backgroundColor: repo.primaryLanguage.color,
            marginRight: 8,
          }}
        />
        <Typography>{repo.primaryLanguage.name}</Typography>
      </Box>
    </Box>
  ),
});
