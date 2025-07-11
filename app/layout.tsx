import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AutoHideScrollbars } from '@/components/AutoHideScrollbars';
import { VolunteerModal } from '@/components/volunteer/VolunteerModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Associação Reino nas Ruas | Transformando Vidas através do Esporte e Educação',
  description: 'ONG brasileira que trabalha com crianças e adolescentes em situação de vulnerabilidade, promovendo transformação social através de atividades educativas e esportivas.',
  keywords: 'ONG, crianças, adolescentes, vulnerabilidade social, Jiu-Jitsu, rap, educação, empoderamento feminino, doação, PIX',
  authors: [{ name: 'Associação Reino nas Ruas' }],
  openGraph: {
    title: 'Associação Reino nas Ruas | Transformando Vidas',
    description: 'Promovendo transformação social através de atividades educativas e esportivas para crianças e adolescentes em situação de vulnerabilidade.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <AutoHideScrollbars />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <VolunteerModal />
      </body>
    </html>
  );
}