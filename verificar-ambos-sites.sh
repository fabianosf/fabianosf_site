#!/bin/bash

# Script para verificar ambos os sites sem apagar nada
# Execute no servidor

echo "🔍 VERIFICANDO AMBOS OS SITES"
echo "============================="
echo ""

# 1. Ver configuração do asbjj (SEM APAGAR)
echo "1. Configuração do asbjj:"
if [ -f "/etc/nginx/sites-available/asbjj" ]; then
    echo "✅ Configuração existe"
    echo "Server name:"
    sudo grep "server_name" /etc/nginx/sites-available/asbjj
    echo "Root:"
    sudo grep "root" /etc/nginx/sites-available/asbjj
    if [ -L "/etc/nginx/sites-enabled/asbjj" ]; then
        echo "Status: ✅ ATIVA"
    else
        echo "Status: Desativada"
    fi
else
    echo "Configuração não encontrada"
fi
echo ""

# 2. Ver configuração do fabianosf_site
echo "2. Configuração do fabianosf_site:"
if [ -f "/etc/nginx/sites-available/fabianosf_site" ]; then
    echo "✅ Configuração existe"
    echo "Server name:"
    sudo grep "server_name" /etc/nginx/sites-available/fabianosf_site
    echo "Root:"
    sudo grep "root" /etc/nginx/sites-available/fabianosf_site
    if [ -L "/etc/nginx/sites-enabled/fabianosf_site" ]; then
        echo "Status: ✅ ATIVA"
    else
        echo "Status: Desativada"
    fi
else
    echo "Configuração não encontrada"
fi
echo ""

# 3. Verificar se há conflito de server_name
echo "3. Verificando conflitos:"
echo "----------------------------------------"
sudo nginx -t 2>&1 | grep -i "conflict\|duplicate" || echo "Sem conflitos detectados"
echo ""

# 4. Testar ambos os sites
echo "4. Testando sites:"
echo "----------------------------------------"
echo "Teste 1 - asbjj.com.br:"
curl -s -H "Host: asbjj.com.br" http://localhost | head -5
echo ""
echo "Teste 2 - fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -5
echo ""

# 5. Verificar arquivos
echo "5. Verificando arquivos:"
echo "----------------------------------------"
echo "Arquivos do ASBJJ:"
if [ -f "/etc/nginx/sites-available/asbjj" ]; then
    ASBJJ_ROOT=$(sudo grep "root" /etc/nginx/sites-available/asbjj | awk '{print $2}' | tr -d ';')
    if [ -n "$ASBJJ_ROOT" ] && [ -d "$ASBJJ_ROOT" ]; then
        echo "Diretório: $ASBJJ_ROOT"
        ls -la "$ASBJJ_ROOT" | head -5
    fi
fi
echo ""
echo "Arquivos do Fabiano:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe"
    ls -la /var/www/fabianosf_site/ | head -5
else
    echo "❌ index.html NÃO existe!"
fi
echo ""

# 6. Verificar Traefik
echo "6. Verificando Traefik:"
if sudo docker ps | grep -q traefik; then
    echo "⚠️  Traefik está rodando"
    echo "Pode estar servindo o asbjj.com.br"
    sudo docker ps | grep traefik
else
    echo "✅ Traefik parado"
fi
echo ""

echo "======================================"
echo "📋 RESUMO:"
echo "======================================"
echo ""
echo "Para que AMBOS funcionem:"
echo ""
echo "1. asbjj.com.br pode usar:"
echo "   - Traefik (se estiver rodando)"
echo "   - Ou Nginx (se a configuração estiver ativa)"
echo ""
echo "2. fabianosf.com deve usar:"
echo "   - Nginx (configuração fabianosf_site)"
echo ""
echo "3. Se o asbjj.com.br precisa do Traefik:"
echo "   - Mantenha o Traefik rodando"
echo "   - Configure o Traefik para NÃO usar porta 80"
echo "   - Ou configure o Nginx como proxy reverso"
echo ""
echo "======================================"
echo ""
echo "💡 IMPORTANTE: Não vamos apagar nada!"
echo "   Apenas verificar e ajustar configurações"
echo ""

