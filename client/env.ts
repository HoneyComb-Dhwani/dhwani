if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is required');
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
