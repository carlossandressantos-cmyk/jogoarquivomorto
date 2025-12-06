# 🚀 Guia de Deploy - Arquivo Morto

Este guia explica como colocar o projeto **Arquivo Morto** online usando GitHub, Firebase e Netlify.

## 📋 Pré-requisitos

Antes de começar, você precisa ter:
- [ ] Conta no [GitHub](https://github.com)
- [ ] Conta no [Firebase](https://console.firebase.google.com)
- [ ] Conta no [Netlify](https://www.netlify.com)
- [ ] Git instalado no seu computador
- [ ] Node.js instalado (versão 18+)

---

## 🔥 Passo 1: Configurar Firebase

### 1.1. Criar Projeto Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"** ou **"Create a project"**
3. Nome do projeto: `jogo-arquivo-morto` (ou outro nome de sua preferência)
4. Siga os passos e **desabilite Google Analytics** (opcional)
5. Clique em **"Criar projeto"**

### 1.2. Habilitar Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Começar no modo de produção"**
4. Escolha a localização: **"us-central"** ou mais próxima de você
5. Clique em **"Ativar"**

### 1.3. Configurar Regras do Firestore

1. Na aba **"Regras"** do Firestore, cole o seguinte código:

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

2. Clique em **"Publicar"**

> ⚠️ **Nota**: Essas regras são abertas para facilitar o teste. Para produção, adicione autenticação.

### 1.4. Obter Credenciais do Firebase

1. Clique no ícone de **engrenagem ⚙️** ao lado de "Visão geral do projeto"
2. Clique em **"Configurações do projeto"**
3. Role até **"Seus aplicativos"** e clique no ícone **"</>"** (Web)
4. Registre o app com nome: **"Arquivo Morto Web"**
5. **NÃO marque** Firebase Hosting por enquanto
6. Clique em **"Registrar app"**
7. **Copie as configurações** que aparecem (você vai precisar delas!)

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 1.5. Atualizar Arquivo de Configuração

1. Abra o arquivo `src/api/firebase.ts` no seu projeto
2. Substitua as credenciais existentes pelas suas:

```typescript
const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

3. Salve o arquivo

---

## 📦 Passo 2: Preparar Projeto para Deploy

### 2.1. Testar Build Localmente

1. No terminal, dentro da pasta do projeto, execute:

```bash
npm install
npm run build
```

2. Verifique se a pasta `dist/` foi criada com sucesso
3. Teste localmente abrindo `dist/index.html` no navegador

### 2.2. Criar arquivo .gitignore (se não existir)

Crie um arquivo `.gitignore` na raiz do projeto:

```
# Dependências
node_modules/

# Build
dist/

# Arquivos de ambiente (NÃO COMITAR CREDENCIAIS)
.env
.env.local

# Logs
*.log
npm-debug.log*

# Sistema
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

> ⚠️ **IMPORTANTE**: Nunca comite a pasta `node_modules/` ou arquivos `.env` com credenciais sensíveis!

---

## 🐙 Passo 3: Enviar para GitHub

### 3.1. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Configure:
   - **Nome**: `jogo-arquivo-morto` (ou outro nome)
   - **Visibilidade**: Public ou Private (sua escolha)
   - **NÃO** marque "Initialize with README" (você já tem arquivos)
5. Clique em **"Create repository"**

### 3.2. Inicializar Git e Enviar Código

No terminal, dentro da pasta do projeto:

```bash
# Inicializar repositório Git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "feat: initial commit - multiplayer investigation system"

# Adicionar o repositório remoto (SUBSTITUA pela URL do seu repo)
git remote add origin https://github.com/SEU-USUARIO/jogo-arquivo-morto.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

> 💡 **Dica**: Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

### 3.3. Verificar no GitHub

1. Acesse seu repositório no GitHub
2. Verifique se todos os arquivos foram enviados
3. Confirme que `src/api/firebase.ts` tem suas credenciais

---

## 🌐 Passo 4: Deploy no Netlify

### 4.1. Conectar Netlify ao GitHub

1. Acesse [netlify.com](https://www.netlify.com) e faça login
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Escolha **"Deploy with GitHub"**
4. Autorize o Netlify a acessar seu GitHub
5. Selecione o repositório **`jogo-arquivo-morto`**

### 4.2. Configurar Build Settings

Na tela de configuração do deploy:

1. **Branch to deploy**: `main`
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. Clique em **"Deploy site"**

### 4.3. Aguardar Deploy

1. O Netlify vai começar a fazer o build automaticamente
2. Aguarde alguns minutos (você verá o progresso em tempo real)
3. Quando terminar, você verá uma URL como: `https://random-name-12345.netlify.app`

### 4.4. Personalizar URL (Opcional)

1. Clique em **"Site settings"**
2. Na seção **"Site details"**, clique em **"Change site name"**
3. Escolha um nome único: `arquivo-morto-game` (ou outro disponível)
4. Sua URL ficará: `https://arquivo-morto-game.netlify.app`

---

## ✅ Passo 5: Testar o Jogo Online

### 5.1. Acessar o Jogo

1. Abra a URL do Netlify no navegador
2. Você verá a tela inicial do **Arquivo Morto**
3. Clique em **"Iniciar Investigação"**

### 5.2. Testar Multiplayer

**No primeiro dispositivo:**
1. Clique em **"Criar Nova Sala"**
2. Anote o código de 6 caracteres (ex: `ABC123`)

**No segundo dispositivo (ou aba):**
1. Abra a mesma URL
2. Clique em **"Iniciar Investigação"**
3. Digite o código da sala: `ABC123`
4. Clique em **"Entrar na Sala"**

**Testar Sincronização:**
1. No dispositivo 1, selecione um número no Modo Números
2. No dispositivo 2, você deve ver a mesma seleção instantaneamente
3. Teste os 3 modos para confirmar que tudo está sincronizado

---

## 🔄 Deploy Contínuo (Automático)

Agora que tudo está configurado, **qualquer mudança** que você fizer no código será automaticamente deployada!

### Como funciona:

1. Faça mudanças no código localmente
2. Commit e push para GitHub:
   ```bash
   git add .
   git commit -m "feat: adicionar nova funcionalidade"
   git push
   ```
3. O Netlify detecta o push automaticamente
4. Faz novo build
5. Publica a nova versão em minutos

---

## 🛠️ Comandos Úteis

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Testar build localmente (requer servidor local)
npx serve dist

# Ver status do Git
git status

# Enviar mudanças para GitHub
git add .
git commit -m "sua mensagem"
git push

# Ver histórico de commits
git log --oneline
```

---

## 🐛 Troubleshooting

### Erro: "Firebase not initialized"

**Solução**: Verifique se você atualizou `src/api/firebase.ts` com suas credenciais do Firebase.

### Erro: "Permission denied to Firestore"

**Solução**: Confirme que as regras do Firestore estão configuradas corretamente (Passo 1.3).

### Erro: "Secrets scanning found secrets in build" no Netlify

**Problema**: Netlify detecta a API Key do Firebase e bloqueia o build.

**Solução**: Já está resolvido! O arquivo `netlify.toml` tem a configuração:
```toml
SECRETS_SCAN_SMART_DETECTION_ENABLED = "false"
```

**Por que é seguro?**
- Firebase API keys são PÚBLICAS por natureza em apps frontend
- A segurança vem das regras do Firestore, não do ocultamento da key
- Qualquer site que usa Firebase expõe a API key no código cliente
- Para proteger seus dados:
  1. Configure as regras do Firestore corretamente
  2. Adicione restrições de domínio no Firebase Console
  3. Implemente autenticação quando necessário

### Site não atualiza no Netlify

**Solução**: 
1. Verifique se o push foi feito para a branch `main`
2. Acesse o painel do Netlify → "Deploys" → veja se há erros
3. Se necessário, clique em "Trigger deploy" → "Clear cache and deploy site"

### Cartas não aparecem

**Solução**: Verifique se todas as 60 cartas estão em `src/assets/cards/` e se o build incluiu a pasta `assets/`.

### Multiplayer não sincroniza

**Solução**: 
1. Abra o Console do navegador (F12)
2. Procure por erros relacionados ao Firebase
3. Confirme que o projeto Firebase está ativo
4. Verifique se ambos dispositivos estão usando a mesma URL

---

## 📚 Recursos Adicionais

- [Documentação Firebase](https://firebase.google.com/docs)
- [Documentação Netlify](https://docs.netlify.com)
- [Git Básico](https://git-scm.com/book/pt-br/v2)
- [Repositório Original dos Assets](https://github.com/carlossandressantos-cmyk/jogoarquivomorto)

---

## 🎉 Pronto!

Seu jogo **Arquivo Morto** agora está online e funcionando! 

**URLs importantes:**
- 🌐 **Site ao vivo**: `https://seu-site.netlify.app`
- 📦 **Repositório GitHub**: `https://github.com/seu-usuario/jogo-arquivo-morto`
- 🔥 **Console Firebase**: `https://console.firebase.google.com`
- 🚀 **Dashboard Netlify**: `https://app.netlify.com`

**Próximos passos sugeridos:**
1. Adicionar domínio personalizado no Netlify
2. Habilitar HTTPS (já vem por padrão no Netlify)
3. Adicionar autenticação Firebase para salas privadas
4. Implementar sistema de pontuação persistente
5. Adicionar analytics para monitorar jogadores

---

**Dúvidas?** Consulte a documentação ou abra uma issue no GitHub! 🚀
