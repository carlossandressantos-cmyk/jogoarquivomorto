# YOUWARE.md - Jogo Arquivo Morto

## Visão Geral
Jogo multiplayer de investigação estilo "noir" onde jogadores tentam identificar a testemunha através de pistas visuais (cartas) e palavras. Desenvolvido como aplicação web standalone com HTML/CSS/JavaScript e Firebase para sincronização em tempo real.

## Arquitetura

### Tecnologias
- **Frontend**: HTML5, TailwindCSS, Vanilla JavaScript
- **Backend**: Firebase (Authentication, Firestore)
- **Estilo**: Google Fonts (Courier Prime, Special Elite)

### Estrutura do Jogo
- **Single-page application** (SPA) com diferentes telas controladas por visibilidade
- **Estado global** sincronizado via Firestore
- **Listener em tempo real** (onSnapshot) para atualizações automáticas

## Firebase - Configuração Crítica

### Inicialização do App
```javascript
const APP_NAME = 'ArquivoMorto_Game_V1'; // Nome fixo para evitar duplicação
```

**IMPORTANTE**: 
- O app Firebase é inicializado com nome específico para evitar conflitos
- Verificação de app existente usando `getApps()` e busca por nome
- Tratamento de erros de conexão e permissões

### Estrutura de Dados (Firestore)

**Caminho do documento**: 
```
artifacts/jogo-arquivo-morto/public/data/gamestate/sessao_jogo_v4
```

**Schema do Estado do Jogo**:
```javascript
{
  phase: 'lobby' | 'witness_setup' | 'detective_play' | 'voting' | 'scoring' | 'game_over',
  players: [
    {
      id: string,           // UID do Firebase Auth
      name: string,         // Nome do jogador
      score: number,        // Pontuação atual
      hand: number[]        // IDs das cartas (1-60)
    }
  ],
  witnessIndex: number,     // Índice do jogador testemunha
  roundCount: number,       // Contador de rodadas
  currentWords: string[],   // 2 palavras escolhidas pela testemunha
  tableCards: [             // Cartas jogadas na mesa
    {
      cardId: number,
      owner: string         // ID do jogador dono
    }
  ],
  votes: {                  // Votos dos detetives
    [playerId]: votedPlayerId
  },
  playedThisRound: string[], // IDs dos jogadores que já jogaram
  winner: {                  // Informações do vencedor (fase game_over)
    name: string,
    score: number
  }
}
```

## Fluxo do Jogo

### Fases do Jogo
1. **lobby**: Espera por 3-8 jogadores
2. **witness_setup**: Testemunha escolhe 1 carta + 2 palavras
3. **detective_play**: Detetives jogam cartas para confundir
4. **voting**: Todos votam para identificar a testemunha
5. **scoring**: Cálculo de pontos e exibição do placar
6. **game_over**: Exibição do vencedor (40 pontos)

### Sistema de Pontuação
- **Testemunha**: Ganha pontos pelos votos que recebeu
- **Detetives**: Ganham 3 pontos se votarem corretamente na testemunha
- **Vitória**: Primeiro a atingir 40 pontos

## Assets e Recursos

### Cartas
- Total de 60 cartas numeradas (1-60)
- URL padrão: `https://github.com/carlossandressantos-cmyk/jogoarquivomorto/blob/main/{cardId}.png?raw=true`

### Palavras
- Lista de 90 palavras temáticas (noir/investigação)
- Categorias: clima, objetos, conceitos, emoções, personagens, lugares

### Áudio
- Música de fundo: `https://files.catbox.moe/tni4fx.mp3`
- Controle de play/pause disponível

## Desenvolvimento e Manutenção

### Constantes Importantes
```javascript
const TOTAL_CARDS = 60;        // Total de cartas disponíveis
const WINNING_SCORE = 40;      // Pontuação para vitória
const GAME_ID = 'sessao_jogo_v4'; // ID da sessão no Firestore
```

### Funções Críticas

**Sincronização**:
- `setupSnapshotListener()`: Configura listener do Firestore
- `renderGame(state)`: Renderiza UI baseado no estado atual

**Lógica do Jogo**:
- `checkIfAllVoted()`: Verifica se todos votaram e inicia cálculo
- `calculateScores()`: Calcula pontuação e verifica vencedor
- `checkIfAllPlayedCards()`: Verifica se todos jogaram cartas

**Utilitários**:
- `drawCards(count)`: Sorteia cartas aleatórias (1-60)

### Tratamento de Erros

**Conexão Firebase**:
- Verifica `navigator.onLine`
- Tratamento de erros específicos (permission-denied, unavailable)
- Retry automático para erros de conexão (timeout 3s)

**Mensagens de Erro**:
- Exibidas em `#connection-status` e `#error-details`
- Categorias: conexão, permissões, sincronização

## Como Testar

1. **Abrir em múltiplas abas/janelas** para simular multiplayer
2. **Testar com mínimo 3 jogadores** para iniciar jogo
3. **Verificar sincronização** ao jogar cartas e votar
4. **Testar reconexão** desconectando internet temporariamente

## Problemas Conhecidos e Soluções

### Firebase App Duplicado
**Problema**: Múltiplas inicializações causavam erro
**Solução**: Nome fixo e verificação de app existente

### Snapshot Listener
**Problema**: Listener não era removido ao reiniciar
**Solução**: `snapshotUnsubscribe()` antes de criar novo listener

### Estado Assíncrono
**Problema**: Estado local desatualizado
**Solução**: Sempre usar `localState` atualizado pelo snapshot

## Deploy e Segurança

### Configuração de Variáveis de Ambiente

**CRÍTICO**: Nunca commite credenciais do Firebase diretamente no código.

**Estrutura de Build**:
1. `build.sh`: Script que injeta variáveis de ambiente no build
2. `netlify.toml`: Configuração do Netlify para executar o build
3. `.env.example`: Template de variáveis de ambiente

**Variáveis Necessárias no Netlify**:
```
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
```

**Fluxo de Build**:
1. Netlify executa `npm run build`
2. Script `build.sh` cria pasta `dist/`
3. Script injeta variáveis de ambiente em `dist/env-config.js`
4. HTML modificado para carregar configuração de `window.ENV`

### Desenvolvimento Local vs Produção

**Local**: 
- Crie arquivo `.env` com credenciais reais
- Ou modifique temporariamente o fallback no `index.html`

**Produção**:
- Configure variáveis no painel do Netlify
- Build automático injeta variáveis no código

## Melhorias Futuras Sugeridas

- [ ] Adicionar timer para cada fase
- [ ] Implementar chat entre jogadores
- [ ] Salvar histórico de partidas
- [ ] Adicionar animações de transição
- [ ] Sistema de salas/rooms múltiplas
- [ ] Ranking global de jogadores
