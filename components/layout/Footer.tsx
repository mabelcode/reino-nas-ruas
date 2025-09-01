"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { FooterLogo } from "@/components/ui/Logo";
import { useSmartLink } from "@/hooks/use-smart-link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { handleSmartNavigation } = useSmartLink();

  const iconMap = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
  } as const;

  const socials = [
    {
      id: "1",
      platform: "facebook",
      url: "https://www.facebook.com/profile.php?id=61567349796756",
    },
    {
      id: "2",
      platform: "instagram",
      url: "https://www.instagram.com/ongreinonasruas",
    },
    {
      id: "3",
      platform: "youtube",
      url: "https://www.youtube.com/@reinonasruas",
    },
    {
      id: "4",
      platform: "linkedin",
      url: "#",
    },
  ];

  return (
    <footer className="bg-[var(--reino-green-e)] text-white">
      <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleSmartNavigation("/");
              }}
              className="flex items-center space-x-3 mb-4 sm:mb-6 cursor-pointer"
            >
              <FooterLogo />
              <h2 className="heading-font text-xl sm:text-2xl text-white">
                Reino nas Ruas
              </h2>
            </a>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed">
              Transformando vidas através da educação e do esporte. Trabalhamos
              com crianças e adolescentes em situação de vulnerabilidade,
              promovendo inclusão social e oportunidades de crescimento.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socials.map(({ id, platform, url }) => {
                const Icon =
                  iconMap[platform as keyof typeof iconMap] || Facebook;
                return (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-full hover:bg-[var(--reino-orange-dark)] transition-colors duration-300"
                    aria-label={platform}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmartNavigation("/about");
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200 cursor-pointer"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmartNavigation("/projects");
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200 cursor-pointer"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmartNavigation("/events");
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200 cursor-pointer"
                >
                  Eventos
                </a>
              </li>
              <li>
                <a
                  href="/transparency"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmartNavigation("/transparency");
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200 cursor-pointer"
                >
                  Transparência
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmartNavigation("/contact");
                  }}
                  className="text-sm sm:text-base text-gray-300 hover:text-[var(--reino-yellow)] transition-colors duration-200 cursor-pointer"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  contato@reinonasruas.org
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  diretoria@reinonasruas.org
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  (13) 99758-7169
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--reino-yellow)] mt-1 shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">
                  Gentil da Silva Nunes, 79 - <br />
                  Jardim Monteiro da Cruz (Vicente de Carvalho)
                  <br />
                  Guarujá, SP - 11454-630
                  <br />
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 w-full">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} - Associação Reino nas Ruas. Todos os direitos
              reservados.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              CNPJ: 12.345.678/0001-90
            </p>
            <a
              href="https://mabelcode.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 group mt-2 sm:mt-0 hover:opacity-90 transition-opacity"
              aria-label="Desenvolvido por Mabel Code"
            >
              <span
                className="font-medium text-xs sm:text-sm text-gray-200 group-hover:text-white transition-colors tracking-wide"
                style={{ letterSpacing: "0.02em" }}
              >
                Desenvolvido por <span className="font-bold">Mabel Code®</span>
              </span>
              <Image
                src="/assets/images/logos/mabel-code-logo.png"
                alt="Logo Mabel Code"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-md border border-white/20 bg-white object-contain"
                style={{ background: "#fff" }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
