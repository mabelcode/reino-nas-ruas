# Associação Reino nas Ruas - Website

Este projeto é um site em Next.js da Associação Reino nas Ruas, otimizado para deploy na Vercel.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Vercel** - Plataforma de deploy e hosting

## 📦 Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar com Turbopack (mais rápido)
npm run dev -- --turbopack
```

## 🧪 Testes e Qualidade

```bash
# Executar linting
npm run lint

# Executar testes unitários
npm test

# Verificar tipos TypeScript
npm run type-check

# Executar testes E2E
npm run e2e
```

## 🏗️ Build e Deploy

```bash
# Build de produção
npm run build

# Analisar tamanho do bundle
npm run analyze
```

## 🚀 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel. O deploy é realizado automaticamente sempre que há push para o ramo `main`.

### Configurações Automáticas

- **Build Command**: `npm run build`
- **Install Command**: `npm ci`
- **Output Directory**: `.next`
- **Framework**: Next.js

### Variáveis de Ambiente

Configure as seguintes variáveis no painel da Vercel:

```env
DIRECTUS_URL=https://seu-dominio.directus.app
DIRECTUS_TOKEN=seu-token-de-acesso
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://reinonasruas.org.br
```

### Configurações Recomendadas na Vercel

1. **Build & Development Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm ci`
   - Output Directory: `.next`

2. **Environment Variables**:
   - Configure todas as variáveis listadas acima

3. **Domains**:
   - Adicione seu domínio personalizado
   - Configure redirecionamento de www para non-www

4. **Functions**:
   - Edge Runtime habilitado para APIs
   - Timeout: 30 segundos

### Otimizações Implementadas

- ✅ Edge Runtime para APIs
- ✅ Otimização de imagens automática
- ✅ Cache otimizado para assets estáticos
- ✅ Headers de segurança configurados
- ✅ SEO otimizado com metadados
- ✅ Performance monitoring
- ✅ Bundle splitting otimizado

## 📁 Estrutura do Projeto

```
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API Routes
│   ├── (pages)/           # Páginas da aplicação
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes React
├── hooks/                 # Custom hooks
├── lib/                   # Utilitários e configurações
├── public/                # Assets estáticos
└── types/                 # Definições TypeScript
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Desenvolvimento local
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
- `npm run test` - Testes unitários
- `npm run type-check` - Verificação de tipos
- `npm run analyze` - Análise de bundle

## 📊 Monitoramento

O projeto inclui monitoramento automático de:
- Performance de carregamento
- Erros JavaScript
- Interações do usuário
- Métricas Core Web Vitals

## 🔒 Segurança

- Headers de segurança configurados
- CSP (Content Security Policy)
- HTTPS forçado
- Proteção contra XSS e CSRF

## 📈 SEO

- Metadados otimizados
- Sitemap automático
- Robots.txt configurado
- Structured Data (JSON-LD)
- Open Graph e Twitter Cards
