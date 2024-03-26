import data from "@/mock/data.json";
import Card from "@/components/card";

export default function Home() {
  return (
    <main>
      {/* <ul>
        {data.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul> */}
      <ul>
        {data.map((post, index) => (
          <li key={index}>
            <Card
              id={post.id}
              author={post.author}
              slug={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
