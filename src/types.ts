import { FluidObject } from 'gatsby-image';

export type PreviewSize = 'small' | 'medium' | 'large';
export type PreviewType = 'project' | 'repo' | 'post' | 'devlog';

export type Previewable = {
  title: string;
  excerpt?: any | null;
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

export type RichTextData = {
  json: any;
};

export type FluidImageMedia = {
  fluid: FluidObject;
  description?: string;
};

export type Post = {
  body: RichTextData;
  title: string;
  mainImage?: FluidImageMedia;
  createdAt: string;
};

export type PostPreview = {
  id: string;
  createdAt: string;
  title: string;
  slug: string;
  mainImage?: FluidImageMedia;
  excerpt?: RichTextData;
};
