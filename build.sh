#!/bin/bash
# Build script para Netlify - Injeta variáveis de ambiente no código

echo "🔨 Starting build process..."

# Criar diretório de distribuição
mkdir -p dist

# Copiar index.html para dist
cp index.html dist/

# Criar arquivo de configuração com variáveis de ambiente
cat > dist/env-config.js << EOF
// Configuração injetada durante o build
window.ENV = {
    FIREBASE_API_KEY: "${FIREBASE_API_KEY}",
    FIREBASE_AUTH_DOMAIN: "${FIREBASE_AUTH_DOMAIN}",
    FIREBASE_PROJECT_ID: "${FIREBASE_PROJECT_ID}",
    FIREBASE_STORAGE_BUCKET: "${FIREBASE_STORAGE_BUCKET}",
    FIREBASE_MESSAGING_SENDER_ID: "${FIREBASE_MESSAGING_SENDER_ID}",
    FIREBASE_APP_ID: "${FIREBASE_APP_ID}"
};
EOF

# Injetar script de configuração no HTML
sed -i 's|<head>|<head>\n    <script src="env-config.js"></script>|' dist/index.html

echo "✅ Build completed successfully!"
echo "📦 Files ready in dist/"
