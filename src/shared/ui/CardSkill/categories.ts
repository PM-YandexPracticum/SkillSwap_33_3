const categoryClassMap: Record<string, string> = {
  'Бизнес и карьера': 'business',
  'Творчество и искусство': 'art',
  'Иностранные языки': 'languages',
  'Образование и развитие': 'education',
  'Дом и уют': 'home',
  'Здоровье и лайфстайл': 'health',
};

export function getCategoryColor(category: string): string {
  return categoryClassMap[category] || 'unknown';
}
