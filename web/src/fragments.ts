import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

export const BlogPostPreviewFragment = graphql`
  fragment BlogPostPreview on ContentfulBlogPost {
    id
    title
    createdAt
    slug
    mainImage {
      description
      fluid(maxWidth: 600) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    excerpt {
      json
    }
  }
`;

export type BlogPostPreviewData = {
  id: string;
  createdAt: string;
  title: string;
  slug: string;
  mainImage: {
    description?: string;
    fluid: FluidObject;
  };
  excerpt: {
    json: any;
  };
};

export const ProjectPreviewFragment = graphql`
  fragment ProjectPreview on ContentfulProject {
    id
    title
    createdAt
    slug
    mainImage {
      description
      fluid(maxWidth: 2000) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    summary {
      json
    }
  }
`;

export type ProjectPreviewData = {
  id: string;
  createdAt: string;
  title: string;
  slug: string;
  mainImage: {
    description?: string;
    fluid: FluidObject;
  };
  summary: {
    json: any;
  };
};

export const BlogPostFullFragment = graphql`
  fragment BlogPostFull on ContentfulBlogPost {
    id
    title
    createdAt
    slug
    mainImage {
      description
      fluid(maxWidth: 2000) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    body {
      json
    }
  }
`;

export type BlogPostFullData = {
  id: string;
  title: string;
  createdAt: string;
  slug: string;
  mainImage: {
    description?: string;
    fluid: FluidObject;
  };
  body: {
    json: any;
  };
};

export const ProjectFullFragment = graphql`
  fragment ProjectFull on ContentfulProject {
    id
    title
    createdAt
    slug
    # mainImage {
    #   description
    #   fluid(maxWidth: 2000) {
    #     ...GatsbyContentfulFluid_withWebp
    #   }
    # }
    body {
      json
    }
  }
`;

export type ProjectFullData = {
  id: string;
  title: string;
  createdAt: string;
  slug: string;
  mainImage: {
    description?: string;
    fluid: FluidObject;
  };
  body: {
    json: any;
  };
};
