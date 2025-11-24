#!/bin/bash

# Script para corrigir tudo de uma vez
# Execute no servidor

echo "🔧 CORREÇÃO FINAL COMPLETA"
echo "=========================="
echo ""

# 1. Verificar arquivos
echo "1. Verificando arquivos em /var/www/fabianosf_site/:"
ls -la /var/www/fabianosf_site/ 2>/dev/null || echo "Diretório não existe ou sem permissão"
echo ""

# 2. Procurar index.html
echo "2. Procurando index.html:"
find /var/www -name "index.html" -type f 2>/dev/null
echo ""

# 3. Ver configuração asbjj
echo "3. Verificando configuração asbjj:"
if [ -f "/etc/nginx/sites-available/asbjj" ]; then
    echo "Configuração encontrada:"
    sudo grep -E "server_name|root" /etc/nginx/sites-available/asbjj
    echo ""
    if [ -L "/etc/nginx/sites-enabled/asbjj" ]; then
        echo "⚠️  asbjj está ATIVA - desativando..."
        sudo rm /etc/nginx/sites-enabled/asbjj
        echo "✅ asbjj desativada"
    else
        echo "✅ asbjj já está desativada"
    fi
else
    echo "Configuração asbjj não encontrada"
fi
echo ""

# 4. Verificar se index.html existe
echo "4. Verificando se index.html existe:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe!"
    echo "Tamanho: $(du -h /var/www/fabianosf_site/index.html | cut -f1)"
    echo "Primeiras 5 linhas:"
    head -5 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe em /var/www/fabianosf_site/"
    echo ""
    echo "💡 Você precisa enviar os arquivos da sua máquina:"
    echo "   cd /home/fabianosf/Downloads/fabianosf_site"
    echo "   ./enviar-completo.sh"
fi
echo ""

# 5. Verificar configuração do Nginx
echo "5. Verificando configuração do Nginx:"
sudo grep -E "server_name|root" /etc/nginx/sites-enabled/fabianosf_site
echo ""

# 6. Testar configuração
echo "6. Testando configuração:"
sudo nginx -t
echo ""

# 7. Reiniciar Nginx
echo "7. Reiniciando Nginx:"
sudo systemctl restart nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx reiniciado"
else
    echo "❌ Erro ao reiniciar"
fi
echo ""

# 8. Testar
echo "8. Testando:"
echo "----------------------------------------"
echo "Com IP:"
curl -s http://92.113.33.16 | head -5
echo ""
echo "Com Host fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -5
echo ""

echo "======================================"
echo "✅ Diagnóstico concluído!"
echo "======================================"
echo ""
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ Tudo parece estar OK!"
    echo "🌐 Teste: http://fabianosf.com"
    echo "💡 Se ainda mostrar ASBJJ, limpe o cache do navegador"
else
    echo "❌ Arquivos não encontrados!"
    echo "💡 Execute o deploy da sua máquina:"
    echo "   ./enviar-completo.sh"
fi
echo ""

