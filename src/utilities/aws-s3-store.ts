// Libraries
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// Types
import { FilePayloadType } from "../types/FilePayloadType";

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const generateUploadUrl = async (
  key: string,
  expiresInSeconds: number,
  contentType: string,
): Promise<FilePayloadType> => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
  return {
    name: key,
    type: contentType,
    url: url,
  };
};

export const generateDownloadUrl = async (
  key: string,
  expiresInSeconds: number,
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};
