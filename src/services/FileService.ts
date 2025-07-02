// Libraries
import DayJS from "dayjs";

// Types
import { FilePayloadType } from "../types/FilePayloadType";

// Utilities
import { generateUploadUrl, generateDownloadUrl } from "../utilities/aws-s3-store";

// Linked with Route
const getUploadUrl: (payload: FilePayloadType) => Promise<FilePayloadType> = ({ name, type }) => {
  return generateUploadUrl(`${DayJS().valueOf()}-${name}`, 60 * 5, type as string);
};

// Linked with Route
const getDownloadUrl: (key: string) => Promise<string> = (key) => {
  return generateDownloadUrl(key, 60 * 5);
};

export const FileService = {
  getUploadUrl,
  getDownloadUrl,
};
