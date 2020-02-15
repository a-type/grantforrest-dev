import { FluidObject } from 'gatsby-image';

export type PreviewSize = 'small' | 'medium' | 'large';
export type PreviewType = 'project' | 'repo' | 'post';

export type Previewable = {
  title: string;
  excerpt: any | null;
  coverImage?: {
    description?: string;
    fluid?: FluidObject;
    url?: string;
  };
  url: string;
  alternateActions?: React.ReactNode;
  size: PreviewSize;
  createdAt: string;
  sortedTime: string;
  type: PreviewType;
  extraContent?: React.ReactNode;
  labels: string[];
};
