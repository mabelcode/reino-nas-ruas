'use client';

import Link from 'next/link';
import { useInfo } from '@/hooks/use-info';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { FooterLogo } from '@/components/ui/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const info = useInfo();
  return (
    <footer className="bg-[var(--reino-green-e)] text-white">
      <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 sm:mb-6">
              <FooterLogo />
              <h2 className="heading-font text-xl sm:text-2xl text-white">
                Reino nas Ruas
              </h2>
            </Link>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed">
              Transformando vidas através da educação e do esporte. Trabalhamos com crianças e adolescentes em situação de vulnerabilidade, promovendo inclusão social e oportunidades de crescimento.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[var(--reino-orange-dark)] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[var(--reino-orange-dark)] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[var(--reino-orange-dark)] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200">
                  Mídia
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200">
                  Transparência
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  {info.email}
                </span>
              </li>
              {info?.email_2 && (
                <li className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] shrink-0" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {info.email_2}
                  </span>
                </li>
              )}
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  {info.phone}
                </span>
              </li>
              {info?.phone_2 && (
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] shrink-0" />
                  <span className="text-sm sm:text-base text-gray-300">
                    {info.phone_2}
                  </span>
                </li>
              )}
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] mt-1 shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  {`${info.street}, ${info.number} - ${info.neighborhood}`}
                  <br />
                  {`${info.city}, ${info.state} - ${info.zipcode}`}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 w-full">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} - Associação Reino nas Ruas. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              CNPJ: {info.cnpj}
            </p>
            <a
              href="https://mabelcode.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 group mt-2 sm:mt-0 hover:opacity-90 transition-opacity"
              aria-label="Desenvolvido por Mabel Code"
            >
              <span className="font-medium text-xs sm:text-sm text-gray-200 group-hover:text-white transition-colors tracking-wide" style={{ letterSpacing: '0.02em' }}>
                Desenvolvido por <span className="font-bold">Mabel Code®</span>
              </span>
              <img
                src="/assets/images/logos/mabel-code-logo.png"
                alt="Logo Mabel Code"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-md border border-white/20 bg-white object-contain"
                style={{ background: '#fff' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}