#!/bin/bash

# Script para verificar tudo e mostrar o erro exato
# Execute no servidor

VPS_PATH="/var/www/fabianosf_site"

echo "🔍 VERIFICAÇÃO COMPLETA"
echo "======================="
echo ""

# 1. Verificar arquivos
echo "📁 ARQUIVOS NO SERVIDOR:"
echo "----------------------------------------"
ls -lah ${VPS_PATH}/
echo ""

# 2. Verificar index.html
echo "📄 INDEX.HTML:"
echo "----------------------------------------"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo "✅ Existe"
    echo "Tamanho: $(du -h ${VPS_PATH}/index.html | cut -f1)"
    echo "Primeiras 20 linhas:"
    head -20 ${VPS_PATH}/index.html
else
    echo "❌ NÃO EXISTE!"
fi
echo ""

# 3. Verificar assets
echo "📁 ASSETS:"
echo "----------------------------------------"
if [ -d "${VPS_PATH}/assets" ]; then
    echo "✅ Diretório existe"
    ls -lah ${VPS_PATH}/assets/
else
    echo "❌ Diretório não existe!"
fi
echo ""

# 4. Ver erros do Nginx
echo "❌ ERROS DO NGINX:"
echo "----------------------------------------"
sudo tail -50 /var/log/nginx/error.log | grep -A 5 -B 5 "error\|failed\|denied" || echo "Nenhum erro encontrado nos últimos logs"
echo ""

# 5. Ver erros específicos do site
echo "❌ ERROS DO SITE:"
echo "----------------------------------------"
if [ -f "/var/log/nginx/fabianosf_site-error.log" ]; then
    sudo tail -50 /var/log/nginx/fabianosf_site-error.log
else
    echo "Arquivo de log não encontrado"
fi
echo ""

# 6. Verificar permissões
echo "🔐 PERMISSÕES:"
echo "----------------------------------------"
ls -la ${VPS_PATH}/ | head -10
echo ""

# 7. Testar acesso
echo "🧪 TESTE DE ACESSO:"
echo "----------------------------------------"
if sudo -u www-data test -r ${VPS_PATH}/index.html 2>/dev/null; then
    echo "✅ www-data pode ler index.html"
else
    echo "❌ www-data NÃO pode ler index.html"
    echo "Ajustando..."
    sudo chown -R www-data:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
fi
echo ""

# 8. Ver configuração do Nginx
echo "⚙️  CONFIGURAÇÃO DO NGINX:"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/fabianosf_site | grep -E "root|server_name|index"
echo ""

echo "======================================"
echo "Envie esta saída completa"
echo "======================================"

