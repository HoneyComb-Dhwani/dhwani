if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL is required');
}
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
