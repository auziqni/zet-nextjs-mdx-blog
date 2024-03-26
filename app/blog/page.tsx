// import data from "@/mock/data.json";
import { posts } from "#site/content";
import Card from "@/components/card";

export default function Home() {
  return (
    <main className=" container">
      <h1>ini adalah blog</h1>

      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Card
              title={post.title}
              slug={post.slug}
              author={post.author}
              description={post.description}
              tags={post.tags}
              date={post.date}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
