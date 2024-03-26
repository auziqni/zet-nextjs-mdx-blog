import React from "react";
import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-components";
import { Tag } from "@/components/tag";
// import "@/styles/mdx.css";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slug === slug);

  return post;
}

export default async function BlogPost({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }
  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
      {/* {post.body} */}
    </article>
  );
}
