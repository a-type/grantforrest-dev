import * as React from 'react';
import {
  ProjectPreviewData,
  BlogPostPreviewData,
  GithubRepoPreview,
  DevlogFullData,
} from '../fragments';
import { getPortfolioUrl, getBlogUrl, getDevlogUrl } from './helpers';
import { Box, Typography, Button } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import GithubIcon from '../components/GithubIcon';
import { Previewable } from '../types';
import Link from '../components/Link';

const getRepoImage = (repo: GithubRepoPreview) =>
  repo.openGraphImageUrl && !repo.openGraphImageUrl.includes('avatar')
    ? { description: `Cover image for repository ${repo.name}`, url: repo.openGraphImageUrl }
    : null;

const getRepoLabels = (repo: GithubRepoPreview) => [
  'github',
  ...repo.repositoryTopics.nodes.map((n) => n.topic.name),
];

const getRepoContent = (repo: GithubRepoPreview) => (
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
);

export const projectToPreviewable = (
  project: ProjectPreviewData,
  repo?: GithubRepoPreview,
): Previewable => ({
  title: project.title,
  sortedTime: project.createdAt,
  createdAt: project.createdAt,
  excerpt: project.summary,
  url: getPortfolioUrl(project.slug),
  coverImage: project.mainImage || (repo ? getRepoImage(repo) : undefined),
  size: 'large' as const,
  type: 'project' as const,
  labels: ['project'],
  mainColor: project.mainColor,
  textColor: project.textColor,
  alternateActions:
    repo || project.githubUrl ? (
      <>
        {repo && repo.homepageUrl && (
          <Button
            variant="text"
            color="inherit"
            component={Link}
            to={repo.homepageUrl}
            underline="none"
          >
            View homepage
          </Button>
        )}
        {((repo && repo.url) || project.githubUrl) && (
          <Button
            variant="text"
            component={Link}
            to={project.githubUrl || repo.url}
            underline="none"
            color="inherit"
          >
            View on Github
          </Button>
        )}
      </>
    ) : undefined,
});

export const postToPreviewable = (post: BlogPostPreviewData): Previewable => ({
  title: post.title,
  sortedTime: post.createdAt,
  createdAt: post.createdAt,
  excerpt: post.excerpt,
  url: getBlogUrl(post.slug),
  coverImage: post.mainImage,
  size: 'medium' as const,
  type: 'post' as const,
  labels: ['blog'],
});

export const devlogToPreviewable = (devlog: DevlogFullData): Previewable => ({
  title: devlog.title,
  sortedTime: devlog.createdAt,
  createdAt: devlog.createdAt,
  url: getDevlogUrl(devlog.project.slug, devlog.slug),
  coverImage: devlog.mainImage,
  size: 'medium' as const,
  type: 'devlog' as const,
  labels: ['devlog'],
});

export const repoToPreviewable = (repo: GithubRepoPreview): Previewable => ({
  title: repo.name,
  sortedTime: repo.pushedAt,
  createdAt: repo.createdAt,
  excerpt: repo.description,
  url: repo.homepageUrl || repo.url,
  coverImage: getRepoImage(repo),
  size:
    repo.openGraphImageUrl && !repo.openGraphImageUrl.includes('avatar')
      ? ('large' as const)
      : ('medium' as const),
  type: 'repo' as const,
  labels: getRepoLabels(repo),
  extraContent: getRepoContent(repo),
  alternateActions: repo.homepageUrl ? (
    <Button
      variant="text"
      component={Link}
      href={repo.url}
      to={repo.url}
      target="_blank"
      rel="noopener"
      underline="none"
    >
      View on Github
    </Button>
  ) : undefined,
});
