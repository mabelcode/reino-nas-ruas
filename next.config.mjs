const nextConfig = {
  output: 'standalone',

  // Otimizações de Build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configurações Experimentais
  experimental: {
    // Otimizações de performance
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Otimizações de Imagem
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 604800, // 7 dias
    unoptimized: false,
    // Domínios permitidos (se necessário)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reinonasruas.org.br',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Otimizações de Performance
  poweredByHeader: false,
  compress: true,

  // Configurações de Headers de Segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=(self)',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      // Headers específicos para assets estáticos
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Headers para imagens
      {
        source: '/assets/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Encoding',
            value: 'gzip, deflate, br',
          },
        ],
      },
      // Headers específicos para Next.js Image Optimization
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Encoding',
            value: 'gzip, deflate, br',
          },
        ],
      },
      // Headers específicos para API de assets
      {
        source: '/api/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
          {
            key: 'Accept-Encoding',
            value: 'gzip, deflate, br',
          },
        ],
      },
    ];
  },

  // Otimizações de Redirecionamento
  async redirects() {
    return [
      // Redirecionar www para non-www (essencial para SEO)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.reinonasruas.org.br',
          },
        ],
        destination: 'https://reinonasruas.org.br/:path*',
        permanent: true,
      },
    ];
  },

  // Configurações de Webpack para otimização
  webpack: (config, { dev, isServer }) => {
    // Otimizações para produção
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  // Configurações de Compilação
  compiler: {
    // Remove console.log em produção, mantém console.error
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },

  // Configurações de Trailing Slash
  trailingSlash: false,

  // Configurações de Internacionalização (removido - site apenas em português)
  // i18n: {
  //   locales: ['pt-BR'],
  //   defaultLocale: 'pt-BR',
  // },
};

export default nextConfig;
