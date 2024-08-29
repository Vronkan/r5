import { useLoaderData } from "@remix-run/react";
// ... andra imports ...

export const loader = async ({ params }: LoaderArgs) => {
  // ... existerande kod ...
  return json({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="mb-6 max-w-full" />
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}