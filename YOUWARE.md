# YOUWARE.md - Arquivo Morto Game

Este é um sistema multiplayer de investigação em tempo real com 3 modos interativos, inspirado em casos frios de delegacia.

## Status do Projeto

- **Tipo**: React + TypeScript Multiplayer Web App
- **Framework**: React 18 com Vite
- **Estilização**: Tailwind CSS + Tema Investigativo (papel, fita crime, carimbo)
- **Backend**: Firebase/Firestore para sincronização em tempo real
- **Entry Point**: `src/main.tsx`
- **Deployment**: Build via Vite, assets hospedados em `/assets/`

## Sobre o Sistema

**Arquivo Morto** é um sistema multiplayer com 3 modos de investigação:

### 1. Modo Números (Evidência Numérica)
- Seleção de números de 1 a 6
- Estados: Selecionado → Oculto (Confidencial) → Revelado
- Sincronização em tempo real entre todos os jogadores

### 2. Modo Cartas (Arquivo de Imagens)
- Sorteio aleatório de 60 cartas disponíveis
- Animação de giro 3D sincronizada (3 segundos)
- Verso da carta padrão `/assets/verso.png`
- Cartas numeradas: `/assets/cards/1.png` até `60.png`

### 3. Modo Palavras (Associação de Evidências)
- Banco de 90 palavras divididas em 6 categorias
- Seleção de exatamente 2 palavras
- Revelação com efeito de piscar e fita de crime
- Categorias: Ambiente, Objetos, Conceitos, Ação, Personagens/Lugares, Twist

### Temática Investigativa
O sistema possui estética de delegacia anos 80/90:
- Papel envelhecido com textura
- Fita amarela de cena de crime
- Carimbo "Confidencial" animado
- Tipografia de máquina de escrever (Courier Prime, Special Elite)
- Efeitos de pulsação no logo

## Estrutura do Projeto

```
src/
├── api/
│   ├── firebase.ts            # Configuração Firebase
│   └── multiplayerService.ts  # Serviços de multiplayer (criar/entrar salas, sincronização)
├── assets/
│   ├── cards/                 # 60 cartas numeradas (1.png - 60.png)
│   ├── fundo.png             # Imagem de fundo (delegacia/arquivo)
│   ├── logo.png              # Logo do sistema
│   ├── verso.png             # Verso das cartas
│   └── audio.mp3             # Áudio de fundo
├── components/
│   ├── AudioPlayer.tsx       # Player de áudio com controle de mute
│   ├── Lobby.tsx             # Lobby multiplayer (criar/entrar em salas)
│   ├── ModeTabs.tsx          # Componente de navegação entre modos
│   ├── ModeNumbers.tsx       # Modo 1: Evidência Numérica
│   ├── ModeCards.tsx         # Modo 2: Cartas com animação
│   └── ModeWords.tsx         # Modo 3: Seleção de Palavras
├── pages/
│   └── Game.tsx              # Página principal com sistema de abas
├── types/
│   └── game.ts               # Tipos TypeScript (GameState, GameMode, palavras)
└── App.tsx                   # Entry point renderizando Game
```

## Sistema Multiplayer

### Fluxo de Uso
1. **Splash Screen**: Animação de logo com pulsação
2. **Lobby**: Criar nova sala ou entrar com código de 6 caracteres
3. **Sistema Principal**: 3 modos com navegação por abas
   - Código da sala exibido no canto superior esquerdo
   - Sincronização em tempo real de todas as ações
   - Todos os jogadores veem as mesmas mudanças instantaneamente

### Tecnologia de Sincronização
- Firebase Firestore para estado compartilhado
- Escuta em tempo real (onSnapshot) em todas as salas
- Cada sala mantém um `GameState` único
- Atualizações incrementais via `updateGameState()`

## Estado do Jogo (GameState)

```typescript
interface GameState {
  mode: 'numbers' | 'cards' | 'words';  // Modo atual
  
  // Modo Números
  numSelected: number | null;           // 1-6
  numHidden: boolean;                   // Estado "Confidencial"
  numRevealed: boolean;                 // Estado revelado
  
  // Modo Cartas
  cardSrc: string;                      // Path da carta atual
  cardSpinning: boolean;                // Animação ativa
  
  // Modo Palavras
  wordsSelected: string[];              // Array de 2 palavras
  wordsRevealed: boolean;               // Estado revelado
  
  lastUpdate: number;                   // Timestamp
}
```

## Firebase/Firestore

### Configuração
```javascript
apiKey: "AIzaSyAbddYCH65EHCTRluFHe4FOE6J5z9yBLxw"
projectId: "jogo-arquivo-morto"
```

### Estrutura de Dados

**Collection: `rooms`**
```typescript
{
  id: string,              // Código da sala (6 caracteres uppercase)
  gameState: GameState,    // Estado compartilhado do jogo
  createdAt: number        // Timestamp de criação
}
```

### Serviços Multiplayer

**`multiplayerService.ts`** fornece:
- `generateRoomCode()` - Gera código aleatório de 6 caracteres
- `createRoom()` - Cria nova sala com estado inicial
- `joinRoom(roomId)` - Verifica e entra em sala existente
- `updateGameState(roomId, updates)` - Atualiza estado incremental
- `subscribeToRoom(roomId, callback)` - Escuta mudanças em tempo real

## Banco de Palavras

90 palavras divididas em 6 categorias (definidas em `src/types/game.ts`):
1. **Ambiente** (15): Chuva, Nevoeiro, Sombra, Luz, Ruído, Silêncio, etc.
2. **Objetos** (15): Sangue, Vidro, Metal, Chave, Relógio, Espelho, etc.
3. **Conceitos** (15): Verdade, Mentira, Segredo, Culpa, Tempo, Destino, etc.
4. **Ação** (15): Medo, Raiva, Desejo, Vingança, Fuga, Busca, etc.
5. **Personagens/Lugares** (15): Vítima, Casa, Rua, Hospital, Prisão, etc.
6. **Twist** (15): Início, Fim, Sempre, Nunca, Antes, Depois, etc.

## Comandos de Desenvolvimento

- **Instalar dependências**: `npm install`
- **Build de produção**: `npm run build`
- **Output**: Arquivos gerados em `dist/`

## Funcionalidades Implementadas

✅ **Sistema Multiplayer**: Sincronização em tempo real via Firebase
✅ **3 Modos Interativos**: Números, Cartas, Palavras
✅ **Lobby**: Criar/entrar em salas com código de 6 caracteres
✅ **Navegação por Abas**: Interface modular com ModeTabs
✅ **Animações Sincronizadas**: Giro de cartas, carimbo confidencial, piscar
✅ **Tema Investigativo**: Papel envelhecido, fita crime, tipografia retrô
✅ **Áudio de Fundo**: Player com controle de mute
✅ **Interface Responsiva**: Mobile-first com Tailwind CSS
✅ **60 Cartas**: Sistema de sorteio aleatório com animação 3D
✅ **90 Palavras**: Banco completo com seleção de 2 palavras

## Tecnologias Utilizadas

### Core
- **React 18**: Functional components e hooks
- **TypeScript**: Type safety completo
- **Vite 7**: Build rápido e HMR
- **Tailwind CSS 3**: Estilização utility-first

### UI e Ícones
- **Lucide React**: Ícones modernos
- **Google Fonts**: Courier Prime, Special Elite, VT323

### Backend/Multiplayer
- **Firebase 11**: Plataforma backend
- **Firestore**: Database em tempo real
- **Real-time Listeners**: Sincronização automática de estado

## Design Visual - Tema Investigativo

### Paleta de Cores
- **Papel**: `#f0f0f0` - Fundo principal com textura
- **Preto/Cinza**: Texto e bordas estilo máquina de escrever
- **Vermelho**: `#b91c1c` - Destaque para confidencial e alertas
- **Amarelo/Preto**: Fita de cena de crime (listras diagonais)

### Efeitos Visuais
- **Paper Texture**: Background com textura de papel envelhecido
- **Crime Tape**: Fita amarela e preta em diagonal
- **Stamp Animation**: Carimbo "Confidencial" com rotação
- **Card Spinning**: Giro 3D de 1800 graus em 3 segundos
- **Blinking Text**: Palavras piscando estilo alerta

### Tipografia
- **Courier Prime**: Font principal (máquina de escrever)
- **Special Elite**: Font para títulos (máquina antiga)
- **VT323**: Font retrô opcional
- Classes CSS: `.title-font`, `.retro-font`, `.paper-texture`, `.crime-tape`

## Fluxo de Uso

1. **Splash Screen**: Logo com animação de pulsação + botão "Iniciar Investigação"
2. **Lobby**: Criar nova sala ou entrar com código de 6 caracteres
3. **Sistema Principal**: 
   - Exibe código da sala (canto superior esquerdo)
   - 3 abas de navegação: Números, Cartas, Palavras
   - Cada modo tem seus próprios controles e estados
4. **Interação Multiplayer**:
   - Qualquer jogador pode mudar de modo
   - Qualquer jogador pode interagir com os controles
   - Todas as ações são sincronizadas em tempo real
   - Estado compartilhado mantém todos os jogadores sincronizados

## Firebase Rules (Recomendado)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if true;
    }
  }
}
```

**Nota**: Para produção, adicionar regras mais restritivas baseadas em autenticação.

## Detalhes Técnicos de Cada Modo

### Modo Números
- **Controles**: OCULTAR → MOSTRAR → RESTAURAR
- **Estados visuais**: Grid selecionável → Tela confidencial → Revelação com número destacado
- **Animação**: Carimbo "Confidencial" com entrada em escala e rotação

### Modo Cartas
- **Controles**: INVESTIGAR ARQUIVO (sorteia nova carta)
- **Animação**: Giro 3D de 1800° em 3 segundos sincronizado
- **Mecânica**: Mostra verso → Animação → Carta aleatória revelada
- **Bloqueio**: Botão desabilitado durante animação

### Modo Palavras
- **Controles**: REVELAR SELEÇÃO → NOVA SELEÇÃO
- **Limite**: Exatamente 2 palavras selecionadas
- **Grid**: 90 palavras em grid responsivo com scroll
- **Revelação**: 2 caixas pretas rotacionadas + fita crime + palavra piscante

## Próximos Passos Sugeridos

1. **Sistema de Pontuação**: Adicionar lógica de pontos por rodada
2. **Timer**: Contador regressivo para cada fase
3. **Chat**: Comunicação entre jogadores
4. **Histórico de Partidas**: Salvar e exibir partidas anteriores
5. **Customização**: Temas visuais alternativos
6. **Sons de Feedback**: Efeitos sonoros para ações (selecionar, revelar, etc.)
7. **Animações com Reactbits**: Usar biblioteca de animações para efeitos mais avançados

## Notas Importantes

- ⚠️ **Não modificar** `index.html` - Entry point do Vite
- ⚠️ **Assets paths**: Sempre usar `/assets/` para referências
- ⚠️ **Build obrigatório**: Executar `npm run build` após mudanças
- 🔥 **Firebase**: Configuração já incluída com regras abertas (ajustar para produção)
- 🎮 **Multiplayer**: Sistema de salas com sincronização em tempo real
- 🎨 **Tema**: Estética investigativa com papel, carimbo e fita crime
- 🔊 **Áudio**: Player com mute no canto superior direito

## Troubleshooting

**Firebase não conecta:**
- Verificar configuração em `src/api/firebase.ts`
- Confirmar regras do Firestore permitem leitura/escrita
- Verificar console do navegador para erros de autenticação

**Build warnings:**
- Firebase adiciona ~140KB ao bundle (esperado)
- Warning sobre chunk size >500KB é normal para apps Firebase
- Considerar code splitting apenas se necessário

**Cartas não carregam:**
- Verificar que todas as 60 cartas estão em `/assets/cards/`
- Confirmar nomes: `1.png`, `2.png`, ..., `60.png`
- Verificar paths absolutos começam com `/assets/`

**Sala não sincroniza:**
- Verificar se ambos jogadores estão na mesma sala (código idêntico)
- Abrir console do navegador para ver logs de conexão
- Confirmar que Firebase está acessível (sem bloqueios de rede)

## Deploy e Hospedagem

### Netlify (Recomendado)

O projeto está configurado para deploy automático no Netlify:

1. **Arquivo `netlify.toml`** já configurado com:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Redirecionamentos para SPA
   - Headers de segurança e cache

2. **Processo de Deploy**:
   - Push para GitHub → Netlify detecta automaticamente
   - Build automático executado
   - Deploy em minutos
   - URL gerada: `https://seu-site.netlify.app`

3. **Variáveis de Ambiente** (se usar .env):
   - Configure no Netlify Dashboard → Site settings → Environment variables
   - Adicione `VITE_FIREBASE_*` se usar variáveis de ambiente

### Firebase Hosting (Alternativa)

Também é possível usar Firebase Hosting:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login no Firebase
firebase login

# Inicializar projeto
firebase init hosting

# Deploy
npm run build
firebase deploy --only hosting
```

### GitHub Pages (Limitado)

Não recomendado devido a limitações com SPAs e Firebase.

## Documentação Adicional

- **[DEPLOY.md](DEPLOY.md)**: Guia completo passo a passo para colocar online
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Diretrizes para contribuições
- **[README.md](README.md)**: Visão geral e quick start

## Arquivos Importantes

- **`.gitignore`**: Configurado para não comitar `node_modules/`, `dist/`, `.env`
- **`netlify.toml`**: Configuração de build e deploy do Netlify
- **`firebase.rules`**: Regras de segurança do Firestore
- **`.env.example`**: Template para variáveis de ambiente

## Segurança

### Credenciais Firebase

⚠️ **ATENÇÃO**: As credenciais do Firebase em `src/api/firebase.ts` são públicas por natureza (frontend).

**Boas práticas**:
1. Use regras de segurança do Firestore (`firebase.rules`)
2. Adicione restrições de domínio no Firebase Console
3. Implemente autenticação para recursos sensíveis
4. Monitore uso no Firebase Console

### Variáveis de Ambiente (Opcional)

Para ocultar credenciais do código-fonte:

1. Crie arquivo `.env` (já no .gitignore):
```bash
VITE_FIREBASE_API_KEY=sua-key
VITE_FIREBASE_PROJECT_ID=seu-projeto
# ... outras credenciais
```

2. Atualize `src/api/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};
```

3. Configure as mesmas variáveis no Netlify Dashboard

## Repositório Original

Assets importados de: https://github.com/carlossandressantos-cmyk/jogoarquivomorto
