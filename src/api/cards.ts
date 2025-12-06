// Card data structure
export interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
}

// Evidence words from the game concept PDF
export const evidenceWords = {
  ambiente: ['Chuva', 'Nevoeiro', 'Sombra', 'Luz', 'Ruído', 'Silêncio', 'Frio', 'Calor', 'Poeira', 'Cinza', 'Ecos', 'Escuridão', 'Reflexo', 'Vazio', 'Cheiro'],
  objetos: ['Sangue', 'Vidro', 'Metal', 'Ferrugem', 'Papel', 'Chave', 'Fio', 'Relógio', 'Espelho', 'Máquina', 'Faca', 'Veneno', 'Dinheiro', 'Carta', 'Telefone'],
  conceitos: ['Verdade', 'Mentira', 'Segredo', 'Culpa', 'Inocência', 'Tempo', 'Passado', 'Futuro', 'Destino', 'Acaso', 'Lei', 'Caos', 'Poder', 'Sonho', 'Pesadelo'],
  acao: ['Medo', 'Raiva', 'Desejo', 'Vingança', 'Fuga', 'Busca', 'Perda', 'Espera', 'Queda', 'Olhar', 'Toque', 'Grito', 'Sussurro', 'Solidão', 'Loucura'],
  personagens: ['Vítima', 'Assassino', 'Testemunha', 'Criança', 'Velho', 'Mulher', 'Homem', 'Casa', 'Rua', 'Prisão', 'Hospital', 'Floresta', 'Mar', 'Ponte', 'Janela'],
  twist: ['Início', 'Fim', 'Sempre', 'Nunca', 'Talvez', 'Antes', 'Depois', 'Dentro', 'Fora', 'Alto', 'Baixo', 'Rápido', 'Lento', 'Tudo', 'Nada']
};

// Flatten all evidence words into a single array
export const allEvidenceWords = Object.values(evidenceWords).flat();

// Generate card data
export const generateCards = (): Card[] => {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    image: `/assets/cards/${i + 1}.png`,
    isFlipped: false
  }));
};

// Shuffle array utility
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get random evidence words
export const getRandomEvidenceWords = (count: number = 2): string[] => {
  return shuffleArray(allEvidenceWords).slice(0, count);
};
