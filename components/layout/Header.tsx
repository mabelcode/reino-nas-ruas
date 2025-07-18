'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HeaderLogo } from '@/components/ui/Logo';
import { useSmartLink } from '@/hooks/use-smart-link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleSmartNavigation, pathname } = useSmartLink();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleVolunteerClick = () => {
    const event = new CustomEvent('openVolunteerModal');
    window.dispatchEvent(event);
  };

  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Sobre Nós', href: '/about' },
    { name: 'Projetos', href: '/projects' },
    { name: 'Eventos', href: '/events' },
    { name: 'Transparência', href: '/transparency' },
    { name: 'Contato', href: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[var(--reino-green-e)] shadow-lg' : 'bg-[var(--reino-green-e)]/95 backdrop-blur-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={e => { e.preventDefault(); handleSmartNavigation('/'); }}
            className="flex items-center space-x sm:space-x shrink-0 cursor-pointer"
          >
            <HeaderLogo />
            <div className="hidden xs:block">
              <h1 className="heading-font text-lg sm:text-xl lg:text-2xl text-white leading-tight">
                Reino nas Ruas
              </h1>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={e => { e.preventDefault(); handleSmartNavigation(item.href); }}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[var(--reino-yellow)] whitespace-nowrap ${
                  pathname === item.href 
                    ? 'text-[var(--reino-yellow)] border-b-2 border-[var(--reino-yellow)] pb-1' 
                    : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 shrink-0">
            <button
              onClick={handleVolunteerClick}
              className="text-xs xl:text-sm px-4 py-2 border-2 border-[var(--reino-yellow)] text-[var(--reino-yellow)] rounded-full font-semibold hover:bg-[var(--reino-yellow)] hover:text-[var(--reino-green-e)] transition-all duration-300 whitespace-nowrap"
            >
              Seja Voluntário
            </button>
            <a
              href="/donate"
              onClick={e => { e.preventDefault(); handleSmartNavigation('/donate'); }}
              className="text-xs xl:text-sm bg-[var(--reino-orange)] text-white px-4 py-2 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              Doar Agora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-white hover:text-[var(--reino-yellow)] hover:bg-[var(--reino-green-e-light)] transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--reino-green-e)] shadow-lg border-t border-[var(--reino-green-e-light)]">
            <nav className="py-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={e => { e.preventDefault(); handleSmartNavigation(item.href); setIsMenuOpen(false); }}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-200 hover:text-[var(--reino-yellow)] hover:bg-[var(--reino-green-e-light)] ${
                    pathname === item.href 
                      ? 'text-[var(--reino-yellow)] bg-[var(--reino-green-e-light)] border-l-4 border-[var(--reino-yellow)]' 
                      : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-3 pb-4 border-t border-[var(--reino-green-e-light)] mt-2 space-y-3">
                <button
                  onClick={() => {
                    handleVolunteerClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-sm px-4 py-3 border-2 border-[var(--reino-yellow)] text-[var(--reino-yellow)] rounded-full font-semibold hover:bg-[var(--reino-yellow)] hover:text-[var(--reino-green-e)] transition-all duration-300"
                >
                  Seja Voluntário
                </button>
                <a
                  href="/donate"
                  onClick={e => { e.preventDefault(); handleSmartNavigation('/donate'); setIsMenuOpen(false); }}
                  className="w-full text-sm bg-[var(--reino-orange)] text-white px-4 py-3 rounded-full font-semibold hover:bg-[var(--reino-orange-hover)] transition-all duration-300 block text-center"
                >
                  Doar Agora
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}