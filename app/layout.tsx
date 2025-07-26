import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VolunteerModal } from '@/components/volunteer/VolunteerModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { generateKeywordsString } from '@/lib/keywords';


export const metadata: Metadata = {
  description: 'ONG brasileira que trabalha com crianças e adolescentes em situação de vulnerabilidade, promovendo transformação social através de atividades educativas e esportivas.',
  keywords: generateKeywordsString(),
  authors: [
    { name: 'Associação Reino nas Ruas' },
    { name: 'Mabel Code', url: 'https://mabelcode.com.br' }
  ],
  creator: 'Mabel Code',
  publisher: 'Associação Reino nas Ruas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
  },
  metadataBase: new URL('https://reinonasruas.org.br'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  openGraph: {
    title: 'Associação Reino nas Ruas | Transformando Vidas',
    description: 'Promovendo transformação social através de atividades educativas e esportivas para crianças e adolescentes em situação de vulnerabilidade.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://reinonasruas.org.br',
    siteName: 'Associação Reino nas Ruas',
    countryName: 'Brasil',
    images: [
      {
        url: '/assets/images/social/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Associação Reino nas Ruas - Transformando vidas através do esporte e da educação',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Associação Reino nas Ruas | Transformando Vidas',
    description: 'Promovendo transformação social através de atividades educativas e esportivas para crianças e adolescentes em situação de vulnerabilidade.',
    creator: '@reinonasruas',
    site: '@reinonasruas',
    images: ['/assets/images/social/twitter-image.jpg'],
  },
  category: 'Non-profit organization',
  classification: 'Social Services',
  applicationName: 'Reino nas Ruas',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Reino nas Ruas',
  },
  other: {
    'theme-color': '#1e40af',
    'color-scheme': 'light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Reino nas Ruas',
    'application-name': 'Reino nas Ruas',
    'msapplication-TileColor': '#1e40af',
    'msapplication-config': '/browserconfig.xml',
    'developer': 'Mabel Code',
    'developer-url': 'https://mabelcode.com.br',

    // Performance e Cache
    'cache-control': 'public, max-age=31536000, immutable',
    'expires': 'Thu, 31 Dec 2024 23:59:59 GMT',

    // Acessibilidade
    'accessibility': 'high',
    'accessibility-level': 'AAA',

    // Segurança Adicional
    'permissions-policy': 'camera=(), microphone=(), geolocation=()',
    'cross-origin-opener-policy': 'same-origin',
    'cross-origin-embedder-policy': 'require-corp',
  },
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/assets/images/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/icons/favicon-32x32.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/icons/favicon-16x16.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/icons/apple-touch-icon.ico" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload critical resources for maximum SEO and performance */}
        <link rel="preload" href="/assets/images/logos/logo-primary.png" as="image" type="image/png" />
        <link rel="preload" href="/assets/images/social/og-image.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/assets/images/icons/favicon.ico" as="image" type="image/x-icon" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/inter/inter-v19-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins/poppins-v23-latin-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* PWA and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Acessibilidade */}
        <meta name="accessibility" content="high" />
        <meta name="accessibility-level" content="AAA" />
        <meta name="accessibility-features" content="high-contrast, large-text, screen-reader, reduced-motion" />
        <meta name="accessibility-control" content="full-keyboard" />
        <meta name="accessibility-hazard" content="none" />

        {/* Configurações de Idioma */}
        <meta name="language" content="pt-BR" />
        <meta name="content-language" content="pt-BR" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.country" content="Brasil" />
        <meta name="geo.placename" content="São Paulo" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />

        {/* Configurações de Cache */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        <meta httpEquiv="Expires" content="Thu, 31 Dec 2024 23:59:59 GMT" />

        {/* Configurações de Segurança Adicional */}
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="unsafe-none" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />

        {/* DNS Prefetch para Performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.facebook.com" />
        <link rel="dns-prefetch" href="//www.instagram.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        
        {/* Preconnect para domínios críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NonProfit",
              "name": "Associação Reino nas Ruas",
              "description": "ONG brasileira que trabalha com crianças e adolescentes em situação de vulnerabilidade, promovendo transformação social através de atividades educativas e esportivas.",
              "url": "https://reinonasruas.org.br",
              "logo": "https://reinonasruas.org.br/assets/images/logos/logo-primary.png",
              "sameAs": [
                "https://www.facebook.com/reinonasruas",
                "https://www.instagram.com/reinonasruas",
                "https://www.youtube.com/@reinonasruas"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Portuguese"
              },
              "foundingDate": "2018",
              "areaServed": "Brasil",
              "serviceType": ["Educação", "Esporte", "Arte", "Cultura", "Empoderamento Feminino"]
            })
          }}
        />

        {/* Monitoramento de Performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Monitoramento de performance
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      const performanceMetrics = {
                        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
                        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
                        timeToFirstByte: perfData.responseStart - perfData.requestStart,
                        domInteractive: perfData.domInteractive - perfData.fetchStart,
                        totalLoadTime: perfData.loadEventEnd - perfData.fetchStart
                      }; 
                      
                      // Log para analytics (quando disponível)
                      if (typeof gtag !== 'undefined') {
                        gtag('event', 'performance', {
                          'event_category': 'performance',
                          'event_label': 'page_load',
                          'value': Math.round(performanceMetrics.totalLoadTime)
                        });
                      }
                    }
                  }, 0);
                });
              }

              // Error handling
              window.addEventListener('error', function(e) {
                const errorData = {
                  message: e.message,
                  filename: e.filename,
                  lineno: e.lineno,
                  colno: e.colno,
                  error: e.error,
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent,
                  url: window.location.href
                };
                
                // Log profissional para produção
                logger.error('JavaScript Error', e.error || new Error(e.message), {
                  filename: e.filename,
                  lineno: e.lineno,
                  colno: e.colno,
                  url: window.location.href
                });
                
                // Log para analytics (quando disponível)
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'exception', {
                    'description': errorData.message,
                    'fatal': false
                  });
                }
              });

              // Unhandled promise rejection
              window.addEventListener('unhandledrejection', function(e) {
                logger.error('Unhandled Promise Rejection', new Error(String(e.reason)), {
                  reason: e.reason,
                  url: window.location.href
                });
              });

              // Monitoramento de interação do usuário
              let userInteraction = false;
              ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
                document.addEventListener(event, function() {
                  if (!userInteraction) {
                    userInteraction = true;
                    
                    // Log para analytics (quando disponível)
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'user_interaction', {
                        'event_category': 'engagement',
                        'event_label': 'first_interaction'
                      });
                    }
                  }
                }, { once: true });
              });
            `,
          }}
        />
      </head>
      <body>
        {/* SEO-critical images preloaded via link tags above */}
        
        <ErrorBoundary componentName="RootLayout">
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <VolunteerModal />
        </ErrorBoundary>
      </body>
    </html>
  );
}