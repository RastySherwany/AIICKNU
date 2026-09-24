export const getApiUrl = (path: string = '') => {
  const base =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== 'undefined'
      ? `http://${window.location.hostname}:3001`
      : 'http://localhost:3001');
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  if (!path) return cleanBase;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

export const getImageUrl = (url?: string | null) => {
  if (!url) return '';
  const first = url.split(',')[0]?.trim();
  if (!first) return '';
  if (first.startsWith('/')) {
    return getApiUrl(first);
  }
  return first;
};
