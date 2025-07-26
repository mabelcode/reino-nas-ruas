# Sistema de Logging Profissional

## 📋 Visão Geral

Este projeto implementa um sistema de logging profissional que garante rastreabilidade de erros em produção sem violar as regras de lint.

## 🏗️ Arquitetura

### Componentes Principais

1. **`lib/logger.ts`** - Sistema centralizado de logging
2. **`hooks/use-error-boundary.ts`** - Hook para error boundaries
3. **`components/ErrorBoundary.tsx`** - Componente Error Boundary
4. **`hooks/use-logger.ts`** - Hook para uso do logger em componentes

## 🚀 Como Usar

### 1. Logging Básico

```typescript
import { logger } from '@/lib/logger';

// Log de erro
logger.error('Mensagem de erro', error, {
  page: 'home',
  action: 'fetch_data'
});

// Log de informação
logger.info('Usuário fez login', {
  userId: '123',
  method: 'email'
});

// Log de aviso
logger.warn('Tentativa de acesso negado', undefined, {
  ip: '192.168.1.1',
  endpoint: '/api/admin'
});
```

### 2. Logging Específico

```typescript
// Erro de API
logger.apiError('/api/users', error, {
  method: 'GET',
  userId: '123'
});

// Erro de componente
logger.componentError('UserProfile', error, {
  props: { userId: '123' }
});

// Erro de autenticação
logger.authError('login', error, {
  email: 'user@example.com'
});
```

### 3. Em Componentes React

```typescript
import { useLogger } from '@/lib/logger';

function MyComponent() {
  const { error, info } = useLogger();

  const handleClick = () => {
    try {
      // alguma operação
    } catch (err) {
      error('Erro ao processar clique', err as Error, {
        component: 'MyComponent',
        action: 'handleClick'
      });
    }
  };

  return <button onClick={handleClick}>Clique</button>;
}
```

### 4. Error Boundary

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary componentName="App">
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# Ambiente
NODE_ENV=production

# Serviços de logging (opcional)
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=error
```

### Integrações Suportadas

- ✅ **Vercel Analytics** - Automática
- ✅ **Google Analytics** - Automática
- 🔄 **Sentry** - Configurável
- 🔄 **LogRocket** - Configurável
- 🔄 **DataDog** - Configurável
- 🔄 **New Relic** - Configurável

## 📊 Níveis de Log

| Nível | Uso | Exemplo |
|-------|-----|---------|
| `DEBUG` | Informações detalhadas para debug | Dados de request/response |
| `INFO` | Informações gerais | Login de usuário, ações importantes |
| `WARN` | Avisos que não quebram a aplicação | Tentativa de acesso negado |
| `ERROR` | Erros que afetam funcionalidade | Falha em API, erro de componente |
| `FATAL` | Erros críticos que quebram a aplicação | Erro de inicialização |

## 🎯 Boas Práticas

### ✅ Faça

```typescript
// ✅ Log estruturado com contexto
logger.error('Falha ao carregar dados do usuário', error, {
  userId: '123',
  endpoint: '/api/users/123',
  timestamp: new Date().toISOString()
});

// ✅ Use métodos específicos
logger.apiError('/api/users', error, { method: 'GET' });

// ✅ Inclua metadados úteis
logger.componentError('UserProfile', error, {
  props: { userId: '123' },
  state: { isLoading: true }
});
```

### ❌ Não Faça

```typescript
// ❌ Log sem contexto
console.error('Erro!');

// ❌ Log de informações sensíveis
logger.error('Erro de login', error, {
  password: '123456' // ❌ Nunca logue senhas!
});

// ❌ Log excessivo
logger.debug('Cada clique do usuário'); // ❌ Muito verboso
```

## 🔍 Monitoramento

### Em Desenvolvimento

- Logs aparecem no console do navegador
- Formatação legível com timestamp e contexto

### Em Produção

- Logs enviados para serviços externos
- Fallback para console em caso de falha
- Integração automática com Vercel Analytics

## 🛠️ Troubleshooting

### Logs não aparecem em produção

1. Verifique se `NODE_ENV=production`
2. Confirme se os serviços externos estão configurados
3. Verifique o console do navegador para erros de integração

### Performance

- Logs são assíncronos e não bloqueiam a UI
- Metadados são serializados automaticamente
- Rate limiting implementado para evitar spam

## 📈 Métricas

O sistema coleta automaticamente:

- **Taxa de erro** por componente/página
- **Tempo de resposta** de APIs
- **Erros de JavaScript** não tratados
- **Performance** da aplicação
- **Comportamento** do usuário

## 🔐 Segurança

- **Nunca** logue informações sensíveis (senhas, tokens)
- **Sempre** sanitize dados antes do log
- **Use** contextos específicos para rastreabilidade
- **Implemente** rate limiting para evitar spam 