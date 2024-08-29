import { Post } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

export type { Post };

export async function createPost(post: Pick<Post, "slug" | "title" | "markdown">, image?: File) {
  let imageUrl = "";
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(process.cwd(), "public", "images", filename);
    await writeFile(filepath, buffer);
    imageUrl = `/images/${filename}`;
  }

  return prisma.post.create({ 
    data: { ...post, imageUrl } 
  });
}

// ... resten av filen oförändrad ...