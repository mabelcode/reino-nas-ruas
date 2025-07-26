# reino-nas-ruas

Este projeto é um site em Next.js da Associação Reino nas Ruas.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Testes e lint

```bash
npm run lint
npm test
```

## Build de produção

```bash
npm run build
```

## Deploy na Vercel

O deploy é feito pela Vercel. Conecte o repositório no painel da Vercel e defina as seguintes configurações:

- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`

Também é possível fazer o deploy manualmente usando a CLI:

```bash
npm run deploy
```

Isso executará `vercel --prod`, enviando a aplicação para produção.
