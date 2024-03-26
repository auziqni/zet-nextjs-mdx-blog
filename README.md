# hello

ini bagian dari perjalanan pembelajaran saya, mengikuti tutorial keren dari [YouTube](https://www.youtube.com/watch?v=tSI98g3PDyE) dan juga menjelajahi kode di [GitHub](https://github.com/jolbol1/nextjs-velite-blog-template)

# depepencies

## installing ui

```bash
pnpm dlx shadcn-ui@latest init

```

adding components

```bash
pnpm dlx shadcn-ui@latest add badge button

```

## installing velite

dev depedencies

```bash
pnpm add velite -D

```

Create a **velite.config.ts** file in the root directory

```javascript
import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(), //todo coba ubah ke slug: s.slug('posts'), // validate format, unique in posts collection
      title: s.string().max(99),
      date: s.isodate(),
      author: s.string().max(99),
      tags: s.array(s.string()).optional(),
      description: s.string().max(999).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});

```

### next.config

```mjs
import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;

class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs !!!
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      await build(this.options); // start velite
    });
  }
}
```

### tsconfig

```json
"paths": {
      "@/*": ["./*"],
      "#site/content": ["./.velite"]
    }
```

### gitignore

```
# velite files
.velite
```

## other

```bash
pnpm i github-slugger
pnpm i rehype-slug rehype-pretty-code rehype-autolink-headings
pnpm install -D @tailwindcss/typography

```

for tailwind

```typescript
 plugins:[ require("@tailwindcss/typography")],
```
