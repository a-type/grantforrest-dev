import fs from 'fs';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { bundleMDX } from 'mdx-bundler';
import remarkSlug from 'remark-slug';

import type { Frontmatter } from 'types/post';

const ROOT_PATH = process.cwd();
export const POSTS_PATH = path.join(ROOT_PATH, 'posts');

export const getAllFrontmatter = () => {
  const PATH = path.join(POSTS_PATH);
  const paths = glob.sync(`${PATH}/**/*.mdx`);

  return paths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(filePath), 'utf8');
      const { data, content } = matter(source);

      return {
        ...(data as Frontmatter),
        slug: path.basename(filePath).replace('.mdx', ''),
        readingTime: readingTime(content, { wordsPerMinute: 300 }),
      } as Frontmatter;
    })
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    );
};

export const getMdxBySlug = async (slug) => {
  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`), 'utf8');
  const { frontmatter, code } = await bundleMDX(source, {
    xdmOptions(input, options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkSlug];
      return options;
    },
  });

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      slug,
      readingTime: readingTime(code, { wordsPerMinute: 300 }),
    } as Frontmatter,
    code,
  };
};
