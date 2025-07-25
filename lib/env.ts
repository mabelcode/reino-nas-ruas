export interface EnvContext {
  env?: Record<string, string | undefined>;
}

export function getEnv(context?: EnvContext) {
  const DIRECTUS_URL = context?.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN = context?.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    throw new Error('Missing DIRECTUS_URL or DIRECTUS_TOKEN environment variable');
  }

  return { DIRECTUS_URL, DIRECTUS_TOKEN };
}
