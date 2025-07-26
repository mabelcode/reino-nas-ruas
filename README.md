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

O deploy é realizado automaticamente pela Vercel sempre que há push para o ramo `main`. Conecte o repositório no painel da Vercel e defina as seguintes configurações:

- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`

Não é necessário executar nenhum comando manual de deploy. A Vercel fará o build e publicará a aplicação automaticamente.
