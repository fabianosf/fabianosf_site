#!/bin/bash

# Script para verificar se tudo está funcionando
# Execute no servidor

VPS_PATH="/var/www/fabianosf_site"

echo "✅ VERIFICANDO SE TUDO ESTÁ FUNCIONANDO"
echo "======================================="
echo ""

# 1. Verificar se index.html existe
echo "1. Verificando index.html:"
if [ -f "${VPS_PATH}/index.html" ]; then
    echo "✅ index.html existe!"
    echo "Tamanho: $(du -h ${VPS_PATH}/index.html | cut -f1)"
    echo "Primeiras 5 linhas:"
    head -5 ${VPS_PATH}/index.html
else
    echo "❌ index.html NÃO existe!"
    exit 1
fi
echo ""

# 2. Verificar assets
echo "2. Verificando assets:"
if [ -d "${VPS_PATH}/assets" ]; then
    ASSET_COUNT=$(find ${VPS_PATH}/assets -type f 2>/dev/null | wc -l)
    echo "✅ Diretório assets existe"
    echo "Arquivos: $ASSET_COUNT"
    if [ $ASSET_COUNT -gt 0 ]; then
        echo "Lista de arquivos:"
        ls -lh ${VPS_PATH}/assets/ | head -5
    else
        echo "⚠️  Diretório assets está vazio!"
    fi
else
    echo "❌ Diretório assets não existe!"
fi
echo ""

# 3. Verificar permissões
echo "3. Verificando permissões:"
PERM_OWNER=$(stat -c '%U:%G' ${VPS_PATH} 2>/dev/null)
echo "Dono do diretório: $PERM_OWNER"

if [ "$PERM_OWNER" != "www-data:www-data" ]; then
    echo "⚠️  Ajustando permissões..."
    sudo chown -R www-data:www-data ${VPS_PATH}
    sudo chmod -R 755 ${VPS_PATH}
    sudo find ${VPS_PATH} -type f -exec chmod 644 {} \;
    echo "✅ Permissões ajustadas"
else
    echo "✅ Permissões OK"
fi
echo ""

# 4. Testar acesso do www-data
echo "4. Testando acesso do www-data:"
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

# 5. Verificar configuração do Nginx
echo "5. Verificando Nginx:"
if sudo nginx -t 2>&1 | grep -q "successful"; then
    echo "✅ Configuração do Nginx OK"
    sudo systemctl restart nginx
    echo "✅ Nginx reiniciado"
else
    echo "❌ Erro na configuração do Nginx"
    sudo nginx -t
fi
echo ""

# 6. Ver erros recentes
echo "6. Últimos erros (se houver):"
sudo tail -5 /var/log/nginx/error.log 2>/dev/null | grep -i error || echo "Nenhum erro recente"
echo ""

# 7. Status final
echo "======================================="
echo "📊 STATUS FINAL:"
echo "======================================="
echo ""

if [ -f "${VPS_PATH}/index.html" ]; then
    echo "✅ index.html: OK"
else
    echo "❌ index.html: FALTANDO"
fi

if [ -d "${VPS_PATH}/assets" ] && [ $(find ${VPS_PATH}/assets -type f 2>/dev/null | wc -l) -gt 0 ]; then
    echo "✅ assets: OK"
else
    echo "⚠️  assets: Verificar"
fi

if sudo -u www-data test -r ${VPS_PATH}/index.html 2>/dev/null; then
    echo "✅ Permissões: OK"
else
    echo "❌ Permissões: PROBLEMA"
fi

if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx: Rodando"
else
    echo "❌ Nginx: Parado"
fi

echo ""
echo "🌐 Teste acessando:"
echo "   - http://92.113.33.16"
echo "   - http://fabianosf.com"
echo ""

