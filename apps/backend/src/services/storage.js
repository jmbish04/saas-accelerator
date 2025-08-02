"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicUrl = exports.storageRouter = void 0;
const hono_1 = require("hono");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});
exports.storageRouter = new hono_1.Hono();
// Generate presigned URL for upload
exports.storageRouter.post("/upload-url", async (c) => {
    const { fileName, contentType } = await c.req.json();
    const key = `uploads/${crypto.randomUUID()}-${fileName}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });
    const url = await (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 3600 });
    return c.json({ url, key });
});
// Get public URL for file
const getPublicUrl = (key) => `https://${process.env.R2_PUBLIC_DOMAIN}/${key}`;
exports.getPublicUrl = getPublicUrl;
