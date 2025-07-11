'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#385723] text-white">
      <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-[#FE6100] to-[#FFDB42] rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
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
                className="p-2 bg-white/10 rounded-full hover:bg-[#FE6100] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#FE6100] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#FE6100] transition-colors duration-300"
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
                <Link href="/about" className="text-sm sm:text-base text-gray-300 hover:text-[#FFDB42] transition-colors duration-200">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/what-we-do" className="text-sm sm:text-base text-gray-300 hover:text-[#FFDB42] transition-colors duration-200">
                  O que Fazemos
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-sm sm:text-base text-gray-300 hover:text-[#FFDB42] transition-colors duration-200">
                  Mídia
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="text-sm sm:text-base text-gray-300 hover:text-[#FFDB42] transition-colors duration-200">
                  Transparência
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-300 hover:text-[#FFDB42] transition-colors duration-200">
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
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFDB42] shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">contato@reinonasruas.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFDB42] shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">(11) 99999-9999</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFDB42] mt-1 shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  Rua da Esperança, 123<br />
                  São Paulo, SP - 01234-567
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2024 Associação Reino nas Ruas. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              CNPJ: 12.345.678/0001-90
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}