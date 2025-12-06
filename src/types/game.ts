// Tipos do Jogo Arquivo Morto

export type GameMode = 'numbers' | 'cards' | 'words';

export interface GameState {
  // Modo atual
  mode: GameMode;
  
  // Estado do modo Números
  numSelected: number | null;
  numHidden: boolean;
  numRevealed: boolean;
  
  // Estado do modo Cartas
  cardSrc: string;
  cardSpinning: boolean;
  
  // Estado do modo Palavras
  wordsSelected: string[];
  wordsRevealed: boolean;
  
  // Metadados
  lastUpdate: number;
}

export const DEFAULT_GAME_STATE: GameState = {
  mode: 'numbers',
  numSelected: null,
  numHidden: false,
  numRevealed: false,
  cardSrc: '/assets/verso.png',
  cardSpinning: false,
  wordsSelected: [],
  wordsRevealed: false,
  lastUpdate: Date.now()
};

// Lista de palavras de evidência (90 palavras)
export const EVIDENCE_WORDS = [
  // Ambiente (15)
  "Chuva", "Nevoeiro", "Sombra", "Luz", "Ruído", "Silêncio", "Frio", "Calor", "Poeira", "Cinza", "Ecos", "Escuridão", "Reflexo", "Vazio", "Cheiro",
  // Objetos (15)
  "Sangue", "Vidro", "Metal", "Ferrugem", "Papel", "Chave", "Fio", "Relógio", "Espelho", "Máquina", "Faca", "Veneno", "Dinheiro", "Carta", "Telefone",
  // Conceitos (15)
  "Verdade", "Mentira", "Segredo", "Culpa", "Inocência", "Tempo", "Passado", "Futuro", "Destino", "Acaso", "Lei", "Caos", "Poder", "Sonho", "Pesadelo",
  // Ação (15)
  "Medo", "Raiva", "Desejo", "Vingança", "Fuga", "Busca", "Perda", "Espera", "Queda", "Olhar", "Toque", "Grito", "Sussurro", "Solidão", "Loucura",
  // Personagens/Lugares (15)
  "Vítima", "Assassino", "Testemunha", "Criança", "Velho", "Mulher", "Homem", "Casa", "Rua", "Prisão", "Hospital", "Floresta", "Mar", "Ponte", "Janela",
  // Twist (15)
  "Início", "Fim", "Sempre", "Nunca", "Talvez", "Antes", "Depois", "Dentro", "Fora", "Alto", "Baixo", "Rápido", "Lento", "Tudo", "Nada"
];
