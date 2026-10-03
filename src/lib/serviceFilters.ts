export interface CategorizedService {
  category?: string;
  tag: string;
}

const CATEGORY_ALIASES: Record<string, string[]> = {
  hotel: ['hotel', 'hoteles'],
  airbnb: ['airbnb', 'rbnb'],
  hostal: ['hostal', 'hostales'],
  restaurante: ['restaurante', 'restaurantes'],
  comida_rapida: ['comida_rapida', 'comidas_recomendadas', 'comida'],
  museo: ['museo', 'museos'],
  parque: ['parque', 'parques'],
  teatro: ['teatro', 'teatros'],
  sitios_historicos: ['sitios_historicos', 'historico', 'sitios_historicos'],
  geniales: ['genial', 'geniales', 'sitios_geniales'],
};

export function normalizeCatalogValue(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

export function filterServicesByCategory<T extends CategorizedService>(services: T[], selectedCategory: string): T[] {
  const normalizedSelection = normalizeCatalogValue(selectedCategory);
  if (!normalizedSelection) return services;

  const aliases = CATEGORY_ALIASES[normalizedSelection]
    ?? Object.entries(CATEGORY_ALIASES).find(([, values]) => values.includes(normalizedSelection))?.[1]
    ?? [normalizedSelection];

  return services.filter((service) => {
    const category = normalizeCatalogValue(service.category ?? '');
    const tag = normalizeCatalogValue(service.tag);
    return aliases.some((alias) => category === alias || tag.includes(alias));
  });
}
