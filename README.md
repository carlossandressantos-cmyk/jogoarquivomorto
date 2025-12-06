# 🔍 Arquivo Morto - Sistema Multiplayer de Investigação

![Arquivo Morto](src/assets/logo.png)

Sistema multiplayer em tempo real com 3 modos interativos de investigação, inspirado em casos frios de delegacia dos anos 80/90.

## 🎮 Sobre o Jogo

**Arquivo Morto** é um sistema colaborativo onde múltiplos jogadores podem interagir simultaneamente em 3 modos diferentes:

### 🔢 Modo 1: Evidência Numérica
Seleção, ocultação e revelação de números de 1 a 6 com carimbo "Confidencial" animado.

### 🃏 Modo 2: Arquivo de Cartas  
Sorteio aleatório de 60 cartas com animação de giro 3D sincronizada entre todos os jogadores.

### 📝 Modo 3: Associação de Palavras
Banco de 90 palavras em 6 categorias. Selecione exatamente 2 palavras para criar associações de evidências.

## 🚀 Acesso Online

**🌐 Jogue agora**: [SEU-LINK-NETLIFY-AQUI]

### Como Jogar Multiplayer:
1. Acesse o link acima
2. Clique em "Iniciar Investigação"
3. **Criar sala**: Clique em "Criar Nova Sala" e compartilhe o código de 6 caracteres
4. **Entrar em sala**: Digite o código recebido e clique em "Entrar na Sala"
5. Todas as ações são sincronizadas em tempo real!

## 🛠️ Tecnologias

- **React 18** + **TypeScript** + **Vite 7**
- **Tailwind CSS** para estilização
- **Firebase/Firestore** para sincronização em tempo real
- **Lucide React** para ícones
- **Netlify** para hospedagem

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/SEU-USUARIO/jogo-arquivo-morto.git
cd jogo-arquivo-morto

# Instalar dependências
npm install

# Configurar Firebase
# 1. Crie um projeto no Firebase Console
# 2. Habilite Firestore Database
# 3. Copie as credenciais e cole em src/api/firebase.ts

# Build de produção
npm run build

# Testar build localmente
npx serve dist
```

## 📦 Deploy

Consulte o guia completo em **[DEPLOY.md](DEPLOY.md)** para instruções detalhadas de como colocar o projeto online usando GitHub, Firebase e Netlify.

### Resumo Rápido:
1. ✅ Configurar projeto Firebase e obter credenciais
2. ✅ Atualizar `src/api/firebase.ts` com suas credenciais
3. ✅ Fazer push para GitHub
4. ✅ Conectar repositório ao Netlify
5. ✅ Deploy automático configurado!

## 📁 Estrutura do Projeto

```
src/
├── api/
│   ├── firebase.ts            # Configuração Firebase
│   └── multiplayerService.ts  # Lógica de salas e sincronização
├── components/
│   ├── Lobby.tsx             # Criar/entrar em salas
│   ├── ModeTabs.tsx          # Navegação entre modos
│   ├── ModeNumbers.tsx       # Modo Números
│   ├── ModeCards.tsx         # Modo Cartas
│   ├── ModeWords.tsx         # Modo Palavras
│   └── AudioPlayer.tsx       # Player de áudio
├── pages/
│   └── Game.tsx              # Página principal
└── types/
    └── game.ts               # Tipos TypeScript
```

## 🎨 Tema Visual

- **Papel envelhecido** com textura de arquivo
- **Fita amarela de cena de crime**
- **Carimbo "Confidencial"** com animação
- **Tipografia retrô**: Courier Prime, Special Elite
- **Animações sincronizadas** entre todos os jogadores

## 🔥 Firebase Firestore

### Estrutura de Dados

```typescript
// Collection: rooms
{
  id: string,              // Código da sala (6 caracteres)
  gameState: {
    mode: 'numbers' | 'cards' | 'words',
    numSelected: number | null,
    numHidden: boolean,
    numRevealed: boolean,
    cardSrc: string,
    cardSpinning: boolean,
    wordsSelected: string[],
    wordsRevealed: boolean,
    lastUpdate: number
  },
  createdAt: number
}
```

### Regras do Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      allow read, create, update, delete: if true;
    }
  }
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Roadmap

- [ ] Sistema de pontuação por rodada
- [ ] Timer/contador regressivo
- [ ] Chat entre jogadores
- [ ] Histórico de partidas
- [ ] Temas visuais alternativos
- [ ] Sons de feedback para ações
- [ ] Animações avançadas com Reactbits

## 📞 Suporte

- **Documentação Completa**: [YOUWARE.md](YOUWARE.md)
- **Guia de Deploy**: [DEPLOY.md](DEPLOY.md)
- **Issues**: [GitHub Issues](https://github.com/SEU-USUARIO/jogo-arquivo-morto/issues)

## 🙏 Créditos

- **Assets originais**: [carlossandressantos-cmyk/jogoarquivomorto](https://github.com/carlossandressantos-cmyk/jogoarquivomorto)
- **Desenvolvido na plataforma**: [Youware](https://www.youware.com)

---

**🎮 Divirta-se investigando casos frios com seus amigos!** 🔍
