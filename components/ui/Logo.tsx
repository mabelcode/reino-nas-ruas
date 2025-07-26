import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'primary' | 'black' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

const logoVariants = {
  primary: '/assets/images/logos/logo-primary.png',
  black: '/assets/images/logos/logo-black.png',
  white: '/assets/images/logos/logo-primary.png', // Usar primary para white por enquanto
};

export function Logo({ 
  variant = 'primary', 
  size = 'md', 
  className,
  priority = false 
}: LogoProps) {
  const logoPath = logoVariants[variant];
  const sizeClass = sizeClasses[size];

  return (
    <div className={cn('relative', sizeClass, className)}>
      <img
        src={logoPath}
        alt="Reino nas Ruas"
        width={64}
        height={64}
        className="w-full h-full object-contain"
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 640px) 32px, (max-width: 768px) 48px, 64px"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}

// Componente específico para o header (otimizado)
export function HeaderLogo() {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18">
      <img
        src="/assets/images/logos/logo-primary.png"
        alt="Reino nas Ruas"
        width={72}
        height={72}
        className="w-full h-full object-contain"
        loading="eager"
        sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 72px"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}

// Componente específico para o footer (otimizado)
export function FooterLogo() {
  return (
    <div className="relative w-12 h-12 sm:w-14 sm:h-14">
      <img
        src="/assets/images/logos/logo-primary.png"
        alt="Reino nas Ruas"
        width={64}
        height={64}
        className="w-full h-full object-contain"
        loading="lazy"
        sizes="(max-width: 640px) 48px, 56px"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}

// Componente específico para seções hero (otimizado)
export function HeroLogo() {
  return (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16">
      <img
        src="/assets/images/logos/logo-primary.png"
        alt="Reino nas Ruas"
        width={64}
        height={64}
        className="w-full h-full object-contain"
        loading="eager"
        sizes="(max-width: 640px) 48px, 64px"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
} 

// Componente específico para o modal de voluntário (otimizado)
export function VolunteerModalLogo() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <img
        src="/assets/images/logos/logo-primary.png"
        alt="Reino nas Ruas"
        width={60}
        height={60}
        className="w-full h-full object-contain"
        loading="eager"
        sizes="(max-width: 640px) 60px, 60px"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
} 