'use client';

import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { useInfo } from '@/hooks/use-info';

export interface WhatsAppButtonProps {
  fixed?: boolean;
  className?: string;
  color?: string;
}

export function WhatsAppButton({ fixed = false, className = '', color = '#25D366' }: WhatsAppButtonProps) {
  const info = useInfo();

  if (!info.phone) return null;

  const phoneDigits = info.phone.replace(/\D/g, '');
  const message = encodeURIComponent(
    'Olá, tudo bem? Gostaria de falar com a equipe da Associação Reino nas Ruas. Encontrei o contato pelo site.'
  );
  const url = `https://wa.me/55${phoneDigits}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${fixed ? 'fixed bottom-4 right-4 z-50' : ''} inline-flex items-center justify-center rounded-full p-3 shadow-lg hover:opacity-90 transition-colors ${className}`}
      style={{ backgroundColor: color }}
      aria-label="WhatsApp"
    >
      <WhatsappIcon className="w-6 h-6 text-white" />
    </a>
  );
}
