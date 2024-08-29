import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: file.type,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  await fetch(signedUrl, {
    method: "PUT",
    body: await file.arrayBuffer(),
    headers: { "Content-Type": file.type },
  });

  return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
}