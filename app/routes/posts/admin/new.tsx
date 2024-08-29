import { useState } from "react";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { createPost } from "~/models/post.server";
// ... andra imports ...

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  const image = formData.get("image") as File | null;

  // Validering här...

  await createPost({ title, slug, markdown }, image);

  return redirect("/admin");
};

export default function NewPost() {
  console.log("NewPost component is rendering");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  return (
    <Form method="post" encType="multipart/form-data">
      {/* ... existerande fält ... */}
      <div style={{border: '1px solid red', padding: '10px', margin: '10px 0'}}>
        <label htmlFor="image">Bild:</label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{display: 'block', margin: '10px 0'}}
        />
        {image && <p>Vald bild: {image.name}</p>}
      </div>
      <button type="submit" style={{background: 'blue', color: 'white', padding: '10px'}}>
        Skapa inlägg
      </button>
    </Form>
  );
}