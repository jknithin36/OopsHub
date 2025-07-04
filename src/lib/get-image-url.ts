export const getImageUrl = (fileId?: string | null) => {
  if (!fileId) return null;

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID;
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${project}`;
};
