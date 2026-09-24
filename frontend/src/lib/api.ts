export const getApiUrl = (path: string = '') => {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

  // 1. Explicit external API URL provided via environment variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    const base = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
    return `${base}${cleanPath}`;
  }

  // 2. In browser
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // When running locally on dev machine, communicate with local NestJS backend on :3001
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${hostname}:3001${cleanPath}`;
    }
    // On production (Netlify or any live deployment), use Next.js built-in API routes
    return `/api${cleanPath}`;
  }

  // 3. Server-side SSR / build-time
  return `/api${cleanPath}`;
};

export const getImageUrl = (url?: string | null) => {
  if (!url) return '';
  const first = url.split(',')[0]?.trim();
  if (!first) return '';
  
  // Full external URL
  if (first.startsWith('http://') || first.startsWith('https://')) {
    return first;
  }
  
  // Relative paths like /uploads/... or /hero-bg.jpg
  if (first.startsWith('/')) {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const base = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
      return `${base}${first}`;
    }
    // Static assets inside public/ are served at root domain by Next.js/Netlify
    return first;
  }
  return first;
};
