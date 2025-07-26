import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Busca as variáveis de ambiente do Directus de forma centralizada.
 * Suporta tanto contexto de Edge Runtime quanto Server Runtime.
 * @param context - Contexto da rota (Edge/Server), pode conter variáveis de ambiente
 * @returns Objeto com DIRECTUS_URL e DIRECTUS_TOKEN
 */
export function getDirectusConfig(context?: Record<string, any>): {
  DIRECTUS_URL: string;
  DIRECTUS_TOKEN: string;
} {
  const DIRECTUS_URL: string | undefined = context?.env?.DIRECTUS_URL ?? process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN: string | undefined = context?.env?.DIRECTUS_TOKEN ?? process.env.DIRECTUS_TOKEN;

  console.error('DIRECTUS_URL', DIRECTUS_URL);
  console.error('DIRECTUS_TOKEN', DIRECTUS_TOKEN);

  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    throw new Error('Server misconfiguration: DIRECTUS_URL and DIRECTUS_TOKEN must be defined');
  }

  return {
    DIRECTUS_URL,
    DIRECTUS_TOKEN,
  };
}
