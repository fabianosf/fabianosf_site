#!/bin/bash

# Script para ver o erro exato do Nginx
# Execute no servidor

echo "🔍 VERIFICANDO ERRO DO NGINX"
echo "============================"
echo ""

# Ver últimos erros
echo "📋 ÚLTIMOS 50 ERROS DO NGINX:"
echo "----------------------------------------"
sudo tail -50 /var/log/nginx/error.log
echo ""
echo ""

# Ver erros específicos do site
echo "📋 ERROS DO SITE:"
echo "----------------------------------------"
if [ -f "/var/log/nginx/fabianosf_site-error.log" ]; then
    sudo tail -50 /var/log/nginx/fabianosf_site-error.log
else
    echo "Arquivo não encontrado"
fi
echo ""
echo ""

# Verificar arquivos
echo "📁 ARQUIVOS NO SERVIDOR:"
echo "----------------------------------------"
ls -lah /var/www/fabianosf_site/
echo ""
echo ""

# Verificar assets
echo "📁 ARQUIVOS EM ASSETS:"
echo "----------------------------------------"
ls -lah /var/www/fabianosf_site/assets/ 2>/dev/null || echo "Diretório assets não existe ou está vazio"
echo ""
echo ""

# Ver conteúdo do index.html
echo "📄 CONTEÚDO DO INDEX.HTML (primeiras 30 linhas):"
echo "----------------------------------------"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    head -30 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO EXISTE!"
fi
echo ""
echo ""

# Verificar permissões
echo "🔐 PERMISSÕES:"
echo "----------------------------------------"
ls -la /var/www/fabianosf_site/ | head -10
echo ""
echo ""

# Testar acesso
echo "🧪 TESTANDO ACESSO DO WWW-DATA:"
echo "----------------------------------------"
sudo -u www-data test -r /var/www/fabianosf_site/index.html && echo "✅ Pode ler" || echo "❌ NÃO pode ler"
echo ""

