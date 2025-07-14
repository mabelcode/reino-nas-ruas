/**
 * Keywords para SEO - Associação Reino nas Ruas
 * Desenvolvido por Mabel Code
 */

export const SEO_KEYWORDS = {
  // Organização e Identidade
  organization: [
    'ONG Brasil',
    'organização não governamental',
    'associação filantrópica',
    'entidade beneficente',
    'Reino nas Ruas',
    'associação reino nas ruas',
    'ONG reino nas ruas',
    'terceiro setor',
    'organização da sociedade civil',
    'OSC',
    'assistência social',
    'política social',
    'desenvolvimento sustentável',
    'objetivos desenvolvimento sustentável',
    'ODS',
    'agenda 2030',
  ],

  // Público-Alvo
  targetAudience: [
    'crianças vulneráveis',
    'adolescentes vulneráveis',
    'jovens em risco',
    'crianças carentes',
    'adolescentes carentes',
    'vulnerabilidade social',
    'exclusão social',
    'pobreza infantil',
    'crianças de rua',
    'adolescentes de rua',
    'meninos de rua',
    'meninas de rua',
    'proteção à infância',
    'direitos da criança',
    'desenvolvimento comunitário',
    'inclusão social',
    'responsabilidade social',
  ],

  // Atividades e Projetos
  activities: [
    'jiu-jitsu para crianças',
    'arte marcial educativa',
    'esporte transformador',
    'rap educativo',
    'música como transformação',
    'cultura hip-hop',
    'arte urbana',
    'empoderamento feminino',
    'mulheres empoderadas',
    'igualdade de gênero',
    'educação através do esporte',
    'esporte educacional',
    'atividades esportivas',
    'projetos sociais',
    'programas educativos',
    'atividades culturais',
    'ONG esporte educação',
    'projetos esportivos sociais',
    'jiu-jitsu social',
    'rap educação',
    'música transformação social',
    'arte marcial crianças',
    'empoderamento jovens',
    'desenvolvimento adolescente',
    'formação cidadã',
    'prevenção violência',
    'inclusão através esporte',
    'cultura transformação',
  ],

  // Localização e Alcance
  location: [
    'ONG brasileira',
    'projetos sociais Brasil',
    'transformação social Brasil',
    'assistência social Brasil',
    'projetos sociais São Paulo',
    'ONG São Paulo',
    'trabalho social Brasil',
    'impacto social Brasil',
  ],

  // Áreas de Atuação
  areas: [
    'educação social',
    'esporte social',
    'cultura social',
    'arte social',
    'desenvolvimento humano',
    'formação de cidadãos',
    'cidadania ativa',
    'prevenção social',
    'intervenção social',
    'acompanhamento social',
    'impacto social',
    'avaliação impacto',
    'indicadores sociais',
  ],

  // Valores e Missão
  values: [
    'transformação social',
    'mudança social',
    'impacto social positivo',
    'solidariedade',
    'compaixão',
    'empatia',
    'respeito',
    'diversidade',
    'inclusão',
    'igualdade',
    'justiça social',
    'direitos humanos',
    'esperança',
    'futuro melhor',
    'oportunidades',
    'sonhos',
    'realização pessoal',
  ],

  // Recursos e Suporte
  resources: [
    'doação ONG',
    'apadrinhamento',
    'voluntariado',
    'trabalho voluntário',
    'doação PIX',
    'doação online',
    'transparência',
    'prestação de contas',
    'relatórios anuais',
    'transparência financeira',
    'governança',
    'ONG confiável',
    'projetos sérios',
    'trabalho social',
    'ajuda crianças',
    'transformar vidas',
    'fazer diferença',
    'mudar realidade',
  ],

  // Termos de Busca Específicos
  specificTerms: [
    'como ajudar ONG',
    'como doar para crianças',
    'voluntariado ONG',
    'apadrinhamento crianças',
    'doação para projetos sociais',
    'ONG esporte educação',
    'projetos esportivos sociais',
    'jiu-jitsu social',
    'rap educação',
    'música transformação social',
    'arte marcial crianças',
    'empoderamento jovens',
    'desenvolvimento adolescente',
    'formação cidadã',
    'prevenção violência',
    'inclusão através esporte',
    'cultura transformação',
  ],

  // Termos de Engajamento
  engagement: [
    'como ajudar',
    'como doar',
    'como participar',
    'seja voluntário',
    'faça parte',
    'junte-se a nós',
    'mude vidas',
    'transforme realidades',
    'invista no futuro',
    'construa sonhos',
    'seja solidário',
    'faça diferença',
    'participe',
    'colabore',
    'apoie',
  ],

  // Termos de Credibilidade
  credibility: [
    'ONG reconhecida',
    'trabalho comprovado',
    'resultados mensuráveis',
    'histórico positivo',
    'depoimentos',
    'casos de sucesso',
    'testemunhos',
    'parceiros',
    'apoiadores',
    'colaboradores',
    'rede de apoio',
    'transparência',
    'confiança',
    'credibilidade',
    'reputação',
  ],

  // Desenvolvimento (Mabel Code)
  development: [
    'Mabel Code',
    'desenvolvimento web',
    'site ONG',
    'website profissional',
    'tecnologia social',
    'solução digital',
    'plataforma ONG',
    'sistema web',
    'aplicação web',
    'desenvolvimento responsivo',
    'SEO otimizado',
    'acessibilidade web',
    'mabelcode.com.br',
  ],
};

/**
 * Gera string de keywords para uso no metadata
 */
export function generateKeywordsString(): string {
  const allKeywords = Object.values(SEO_KEYWORDS).flat();
  return allKeywords.join(', ');
}

/**
 * Gera keywords específicas por categoria
 */
export function getKeywordsByCategory(category: keyof typeof SEO_KEYWORDS): string {
  return SEO_KEYWORDS[category].join(', ');
}

/**
 * Keywords principais (mais importantes)
 */
export const PRIMARY_KEYWORDS = [
  'Reino nas Ruas',
  'ONG Brasil',
  'crianças vulneráveis',
  'transformação social',
  'esporte educacional',
  'jiu-jitsu social',
  'rap educativo',
  'empoderamento feminino',
  'doação ONG',
  'voluntariado',
  'Mabel Code',
];

/**
 * Keywords secundárias (complementares)
 */
export const SECONDARY_KEYWORDS = [
  'projetos sociais',
  'educação através do esporte',
  'cultura transformação',
  'inclusão social',
  'desenvolvimento humano',
  'solidariedade',
  'impacto social',
  'transparência',
  'desenvolvimento web',
  'tecnologia social',
]; 