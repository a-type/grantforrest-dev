const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Grant Forrest',
    site_url: 'https://gfor.rest',
    feed_url: 'https://gfor.rest/feed.xml',
    description: "Latest articles from Grant's blog.",
  });

  const posts = await fs.readdir(path.join(__dirname, '..', 'posts'));

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'posts', name),
      );
      const { data } = matter(content);

      feed.item({
        title: data.title,
        url: 'https://gfor.rest/c/' + name.replace(/\.mdx?/, ''),
        date: data.publishedAt,
      });
    }),
  );

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
