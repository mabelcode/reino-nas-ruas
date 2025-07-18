import { useRouter, usePathname } from 'next/navigation';

export function useSmartLink() {
  const router = useRouter();
  const pathname = usePathname();

  function handleSmartNavigation(href: string) {
    // Se for âncora na mesma página
    if (href.startsWith('#')) {
      const anchor = href.replace('#', '');
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Se for âncora na mesma página (ex: /about#infos)
    if (href.includes('#')) {
      const [base, hash] = href.split('#');
      if (pathname === base) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }

    // Se for o mesmo path, scroll para o topo
    if (pathname === href || (href === '/' && pathname === '/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navegação normal, mas garantir scroll para o topo após a navegação
    router.push(href);
    // Pequeno delay para garantir que a página carregue antes do scroll
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }

  return { handleSmartNavigation, pathname };
} 