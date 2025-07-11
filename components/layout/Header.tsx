'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
    { name: 'O que Fazemos', href: '/what-we-do' },
    { name: 'Mídia', href: '/media' },
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
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-[#FE6100] to-[#FFDB42] rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="heading-font text-lg sm:text-xl lg:text-2xl text-[#385723] leading-tight">
                Reino nas Ruas
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#FE6100] whitespace-nowrap ${
                  pathname === item.href 
                    ? 'text-[#FE6100] border-b-2 border-[#FE6100] pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 shrink-0">
            <button
              onClick={handleVolunteerClick}
              className="text-xs xl:text-sm px-4 py-2 border-2 border-[#FE6100] text-[#FE6100] rounded-full font-semibold hover:bg-[#FE6100] hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              Seja Voluntário
            </button>
            <Link 
              href="/donate" 
              className="text-xs xl:text-sm bg-[#FE6100] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#e55500] transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              Doar Agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#FE6100] hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-200 hover:text-[#FE6100] hover:bg-gray-50 ${
                    pathname === item.href 
                      ? 'text-[#FE6100] bg-gray-50 border-l-4 border-[#FE6100]' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-3 pb-4 border-t border-gray-200 mt-2 space-y-3">
                <button
                  onClick={() => {
                    handleVolunteerClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-sm px-4 py-3 border-2 border-[#FE6100] text-[#FE6100] rounded-full font-semibold hover:bg-[#FE6100] hover:text-white transition-all duration-300"
                >
                  Seja Voluntário
                </button>
                <Link 
                  href="/donate" 
                  className="w-full text-sm bg-[#FE6100] text-white px-4 py-3 rounded-full font-semibold hover:bg-[#e55500] transition-all duration-300 block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Doar Agora
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}