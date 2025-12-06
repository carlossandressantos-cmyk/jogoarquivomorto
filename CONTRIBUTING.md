# 🤝 Guia de Contribuição - Arquivo Morto

Obrigado por considerar contribuir com o **Arquivo Morto**! Este documento fornece diretrizes para contribuições ao projeto.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
# Clique no botão "Fork" no GitHub
# Clone seu fork
git clone https://github.com/SEU-USUARIO/jogo-arquivo-morto.git
cd jogo-arquivo-morto
```

### 2. Configure o Ambiente

```bash
# Instale as dependências
npm install

# Configure o Firebase (veja DEPLOY.md)
# Copie suas credenciais para src/api/firebase.ts

# Execute o build para testar
npm run build
```

### 3. Crie uma Branch

```bash
# Para nova funcionalidade
git checkout -b feature/nome-da-funcionalidade

# Para correção de bug
git checkout -b fix/nome-do-bug

# Para melhorias
git checkout -b improve/nome-da-melhoria
```

## 📝 Padrões de Código

### TypeScript

- Use **TypeScript** para todo código novo
- Defina tipos explícitos sempre que possível
- Evite usar `any` - prefira tipos específicos

```typescript
// ✅ BOM
interface Player {
  id: string;
  name: string;
  score: number;
}

// ❌ RUIM
const player: any = { id: 1, name: 'João' };
```

### React Components

- Use **functional components** com hooks
- Prefira **named exports** para componentes principais
- Props devem ter interfaces definidas

```typescript
// ✅ BOM
interface ModeTabsProps {
  currentMode: GameMode;
  onChangeMode: (mode: GameMode) => void;
}

export default function ModeTabs({ currentMode, onChangeMode }: ModeTabsProps) {
  // ...
}
```

### Estilização

- Use **Tailwind CSS** para estilos
- Mantenha classes CSS customizadas em `src/index.css`
- Siga o tema investigativo existente

```tsx
// ✅ BOM - Tailwind
<button className="px-6 py-3 bg-red-800 text-white font-bold">
  Botão
</button>

// ❌ EVITE - Inline styles
<button style={{ padding: '12px 24px', background: 'red' }}>
  Botão
</button>
```

### Nomenclatura

- **Componentes**: PascalCase (`ModeTabs.tsx`)
- **Funções**: camelCase (`updateGameState`)
- **Constantes**: SCREAMING_SNAKE_CASE (`DEFAULT_GAME_STATE`)
- **Interfaces**: PascalCase (`GameState`)

## 🔄 Processo de Pull Request

### 1. Commit suas Mudanças

Use **Conventional Commits**:

```bash
# Tipos de commit
feat:     # Nova funcionalidade
fix:      # Correção de bug
improve:  # Melhoria de funcionalidade existente
refactor: # Refatoração de código
docs:     # Apenas documentação
style:    # Mudanças de formatação
test:     # Adicionar testes
chore:    # Tarefas de manutenção

# Exemplos
git commit -m "feat: adicionar modo timer com contagem regressiva"
git commit -m "fix: corrigir sincronização de cartas no modo multiplayer"
git commit -m "docs: atualizar guia de deploy com Firebase Hosting"
```

### 2. Push para seu Fork

```bash
git push origin feature/nome-da-funcionalidade
```

### 3. Abra um Pull Request

1. Vá para o repositório original no GitHub
2. Clique em **"New Pull Request"**
3. Selecione sua branch
4. Preencha o template:

```markdown
## Descrição
Breve descrição das mudanças realizadas.

## Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ✨ Nova funcionalidade
- [ ] 🔨 Refatoração
- [ ] 📝 Documentação
- [ ] 🎨 Estilo/UI

## Como Testar
1. Passo a passo para testar as mudanças
2. Cenários de teste importantes

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Build passa sem erros (`npm run build`)
- [ ] Testei localmente
- [ ] Documentação atualizada (se necessário)
```

### 4. Revisão de Código

- Aguarde feedback dos mantenedores
- Faça ajustes solicitados
- Mantenha a conversa profissional e respeitosa

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado em [Issues](https://github.com/SEU-USUARIO/jogo-arquivo-morto/issues)
2. Teste na versão mais recente
3. Confirme que não é um problema de configuração local

### Template de Bug Report

```markdown
**Descrição do Bug**
Descrição clara e concisa do problema.

**Como Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Observe '...'

**Comportamento Esperado**
O que deveria acontecer.

**Comportamento Atual**
O que está acontecendo.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**
- Navegador: [ex: Chrome 120]
- Dispositivo: [ex: Desktop, Mobile]
- Sistema Operacional: [ex: Windows 11]

**Informações Adicionais**
Console logs, mensagens de erro, etc.
```

## 💡 Sugerir Melhorias

### Template de Feature Request

```markdown
**Descrição da Funcionalidade**
Descrição clara da funcionalidade desejada.

**Problema que Resolve**
Qual problema esta funcionalidade resolve?

**Solução Proposta**
Como você imagina que funcione?

**Alternativas Consideradas**
Outras soluções que você pensou.

**Exemplos**
Links ou imagens de referência.
```

## 🎯 Áreas para Contribuição

### Prioridade Alta
- [ ] Sistema de pontuação por rodada
- [ ] Timer/contador regressivo
- [ ] Melhorias de performance
- [ ] Correção de bugs críticos

### Prioridade Média
- [ ] Chat entre jogadores
- [ ] Histórico de partidas
- [ ] Sons de feedback
- [ ] Animações avançadas

### Prioridade Baixa
- [ ] Temas visuais alternativos
- [ ] Customização de sala
- [ ] Estatísticas de jogadores
- [ ] Modo espectador

## 📚 Recursos Úteis

- [Documentação do Projeto](YOUWARE.md)
- [Guia de Deploy](DEPLOY.md)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)

## ✅ Checklist Antes de Submeter

- [ ] Código está limpo e bem comentado
- [ ] Build passa sem erros (`npm run build`)
- [ ] Testei as mudanças localmente
- [ ] Commits seguem Conventional Commits
- [ ] Branch está atualizada com `main`
- [ ] PR tem descrição clara
- [ ] Documentação atualizada (se necessário)

## 🙏 Agradecimentos

Obrigado por contribuir com o **Arquivo Morto**! Sua ajuda torna o projeto melhor para todos. 🎉

---

**Dúvidas?** Abra uma [Discussion](https://github.com/SEU-USUARIO/jogo-arquivo-morto/discussions) ou entre em contato!
