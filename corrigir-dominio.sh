#!/bin/bash

# Script para corrigir o problema do domínio
# Execute no servidor

echo "🔧 CORRIGINDO PROBLEMA DO DOMÍNIO"
echo "=================================="
echo ""

# 1. Ver configuração do asbjj
echo "1. Configuração do asbjj (COMPLETA):"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/asbjj
echo ""

# 2. Ver configuração do fabianosf_site
echo "2. Configuração do fabianosf_site (COMPLETA):"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/fabianosf_site
echo ""

# 3. Verificar ordem de leitura (alfabética)
echo "3. Ordem das configurações ativas:"
sudo ls -1 /etc/nginx/sites-enabled/
echo ""

# 4. Verificar se asbjj tem server_name que pega fabianosf.com
echo "4. Verificando server_name do asbjj:"
ASBJJ_SERVER=$(sudo grep "server_name" /etc/nginx/sites-available/asbjj | head -1)
echo "$ASBJJ_SERVER"
if echo "$ASBJJ_SERVER" | grep -q "fabianosf\|_\|default"; then
    echo "⚠️  PROBLEMA: asbjj pode estar pegando fabianosf.com!"
fi
echo ""

# 5. Verificar se fabianosf_site tem server_name correto
echo "5. Verificando server_name do fabianosf_site:"
FABIANO_SERVER=$(sudo grep "server_name" /etc/nginx/sites-available/fabianosf_site)
echo "$FABIANO_SERVER"
echo ""

# 6. Testar qual configuração está respondendo
echo "6. Testando qual configuração responde:"
echo "----------------------------------------"
echo "Teste com Host fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -5
echo ""

# 7. Verificar se há default_server
echo "7. Verificando default_server:"
sudo grep -r "default_server" /etc/nginx/sites-available/
echo ""

echo "======================================"
echo "💡 SOLUÇÃO:"
echo "======================================"
echo ""
echo "Se o asbjj está pegando fabianosf.com, você precisa:"
echo "  1. Garantir que fabianosf_site está listado ANTES do asbjj"
echo "  2. Ou remover qualquer server_name _ ou default do asbjj"
echo "  3. Ou adicionar default_server apenas no fabianosf_site"
echo ""

