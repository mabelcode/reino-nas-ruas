export interface EnvContext {
  env?: Record<string, string | undefined>;
}

const defaults = {
  DIRECTUS_URL: 'http://ec2-52-87-164-16.compute-1.amazonaws.com',
  DIRECTUS_TOKEN: 'hmXvE4ahbmCFHWOGc1ys-AHTmWDcS6dt',
  SMTP_HOST: '',
  SMTP_PORT: '',
  SMTP_USER: '',
  SMTP_PASS: '',
  NODE_ENV: 'production',
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  NEXT_PUBLIC_API_TIMEOUT: '30000',
  NEXT_PUBLIC_MAX_RETRIES: '5',
  NEXT_PUBLIC_CACHE_DURATION: '600',
  NEXT_PUBLIC_REVALIDATE_DURATION: '7200',
  GOOGLE_VERIFICATION: 'your-production-google-verification-code',
  NEXT_PUBLIC_GA_ID: 'G-PRODUCTION-XXXXX',
  NEXT_PUBLIC_ALLOWED_ORIGINS: 'https://yourdomain.com,https://www.yourdomain.com',
  NEXT_PUBLIC_IMAGE_QUALITY: '90',
  NEXT_PUBLIC_IMAGE_FORMAT: 'webp',
  NEXT_PUBLIC_DEBUG: 'false',
  LOG_LEVEL: 'error',
};

export function getEnv(context?: EnvContext) {
  const env = { ...defaults, ...process.env, ...(context?.env || {}) } as Record<string, string>;

  const { DIRECTUS_URL, DIRECTUS_TOKEN } = env;

  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    throw new Error('Missing DIRECTUS_URL or DIRECTUS_TOKEN environment variable');
  }

  return env;
}
