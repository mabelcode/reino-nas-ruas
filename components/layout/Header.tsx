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
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={e => { e.preventDefault(); handleSmartNavigation('/'); }}
            className="flex items-center space-x-2 sm:space-x-3 shrink-0 cursor-pointer"
          >
            <HeaderLogo />
            <div className="hidden xs:block">
              <h1 className="heading-font text-lg sm:text-xl lg:text-2xl text-[var(--reino-green-e)] leading-tight">
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
                className={`text-sm font-medium transition-colors duration-200 hover:text-[var(--reino-green-e)] whitespace-nowrap ${
                  pathname === item.href 
                    ? 'text-[var(--reino-green-e)] border-b-2 border-[var(--reino-green-e)] pb-1' 
                    : 'text-gray-700'
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
              className="text-xs xl:text-sm px-4 py-2 border-2 border-[var(--reino-green-e)] text-[var(--reino-green-e)] rounded-full font-semibold hover:bg-[var(--reino-green-e)] hover:text-white transition-all duration-300 whitespace-nowrap"
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
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[var(--reino-green-e)] hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <nav className="py-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={e => { e.preventDefault(); handleSmartNavigation(item.href); setIsMenuOpen(false); }}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-200 hover:text-[var(--reino-green-e)] hover:bg-gray-50 ${
                    pathname === item.href 
                      ? 'text-[var(--reino-green-e)] bg-gray-50 border-l-4 border-[var(--reino-green-e)]' 
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-3 pb-4 border-t border-gray-200 mt-2 space-y-3">
                <button
                  onClick={() => {
                    handleVolunteerClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-sm px-4 py-3 border-2 border-[var(--reino-green-e)] text-[var(--reino-green-e)] rounded-full font-semibold hover:bg-[var(--reino-green-e)] hover:text-white transition-all duration-300"
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