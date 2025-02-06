import { Hono } from "hono";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const storageRouter = new Hono();

// Generate presigned URL for upload
storageRouter.post("/upload-url", async (c) => {
  const { fileName, contentType } = await c.req.json();
  const key = `uploads/${crypto.randomUUID()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  
  return c.json({ url, key });
});

// Get public URL for file
export const getPublicUrl = (key: string) => 
  `https://${process.env.R2_PUBLIC_DOMAIN}/${key}`; 