# Orbe Investimentos

Aplicação pessoal de gestão de investimentos B3. O projeto inicia pela integridade do ledger: operações confirmadas são a fonte de verdade; posições, preço médio e resultados são projeções reconstituíveis.

## Estado atual

- Fundação Next.js App Router com TypeScript estrito e interface escura responsiva.
- Migration inicial Supabase com dados financeiros em `NUMERIC`, índices, deduplicação e RLS para todos os registros privados principais.
- Motor determinístico para preço médio, vendas parciais, resultado realizado e proventos, coberto por Vitest.
- Contratos intercambiáveis para dados de mercado e IA. O fallback de mercado declara indisponibilidade, nunca inventa preços.
- Cron diário UTC protegido por `CRON_SECRET`; antes da configuração do Supabase retorna indisponibilidade controlada.

## Arquitetura

`transactions` é o ledger auditável. `transaction_fees` detalha custos e `cash_entries` permite conciliação. Uma futura projeção de `portfolio_positions` será recalculada exclusivamente a partir desse histórico. Dados de preços, fundamentos e ativos são separados dos registros privados; análises IA persistem payload estruturado e uso de tokens em tabelas distintas.

O serviço de IA usa Responses API no servidor com Structured Outputs em JSON Schema, e a resposta é validada novamente com Zod. O motor financeiro calcula valores, nunca o modelo.

## Configuração local

1. Copie `.env.example` para `.env.local` e preencha as chaves.
2. Crie um projeto Supabase e aplique `supabase/migrations/202610270001_foundation.sql` pela CLI ou SQL Editor.
3. Execute `npm run dev`.

Não coloque `SUPABASE_SECRET_KEY`, `OPENAI_API_KEY`, `BRAPI_API_TOKEN` ou `CRON_SECRET` no navegador. Não versione `.env.local`.

## Importação XP

Os PDFs e a planilha no diretório raiz são fontes originais e não são modificados. O próximo incremento de importação deve armazenar o hash do arquivo, extrair para `import_records`, apresentar prévia editável e persistir em `transactions` apenas após confirmação. Divergências devem permanecer visíveis para revisão humana.

## Limites operacionais e recuperação

O desenho guarda preços diários e resultados de IA cacheáveis, processa somente ativos monitorados e não depende de jobs frequentes. O plano Supabase Free vigente informa 500 MB de banco, 1 GB de Storage e pausa após uma semana de inatividade; programe exportações periódicas do banco e dos documentos privados. O cron no plano Vercel Hobby é diário, usa UTC e não possui precisão de minuto. Consulte as fontes oficiais antes de alterar quotas ou agendamento: [Supabase pricing](https://supabase.com/pricing), [Vercel Cron usage](https://vercel.com/docs/cron-jobs/usage-and-pricing), [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses).

## Validação

Execute `npm run typecheck`, `npm run lint`, `npm test` e `npm run build`. Antes do deploy, valide autenticação/RLS em um projeto Supabase, aplique a migration, configure as variáveis na Vercel e teste o endpoint de cron com o segredo.
