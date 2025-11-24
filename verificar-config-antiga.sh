#!/bin/bash

# Script para verificar configuração antiga
# Execute no servidor

echo "🔍 VERIFICANDO CONFIGURAÇÃO ANTIGA"
echo "==================================="
echo ""

# 1. Ver configuração antiga (fabianosf.com)
echo "1. Configuração antiga (fabianosf.com):"
echo "----------------------------------------"
if [ -f "/etc/nginx/sites-available/fabianosf.com" ]; then
    sudo cat /etc/nginx/sites-available/fabianosf.com
    echo ""
    echo "Root configurado:"
    sudo grep "root" /etc/nginx/sites-available/fabianosf.com
else
    echo "Arquivo não existe"
fi
echo ""

# 2. Ver configuração nova (fabianosf_site)
echo "2. Configuração nova (fabianosf_site):"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/fabianosf_site
echo ""

# 3. Verificar qual está respondendo
echo "3. Testando qual site responde no localhost:"
echo "----------------------------------------"
curl -s http://localhost | head -20
echo ""

# 4. Verificar se há includes ou configurações padrão
echo "4. Verificando nginx.conf principal:"
echo "----------------------------------------"
sudo grep -E "include|server_name" /etc/nginx/nginx.conf | head -10
echo ""

# 5. Verificar logs de acesso
echo "5. Últimos acessos:"
echo "----------------------------------------"
sudo tail -5 /var/log/nginx/access.log 2>/dev/null || echo "Log não encontrado"
echo ""

# 6. Verificar se há configuração padrão
echo "6. Verificando se há server block padrão:"
echo "----------------------------------------"
sudo grep -r "server_name.*_" /etc/nginx/sites-available/ 2>/dev/null
echo ""

echo "======================================"
echo "💡 Se ainda mostra ASBJJ:"
echo "   1. Limpe o cache do navegador"
echo "   2. Use modo anônimo"
echo "   3. Teste com: curl http://fabianosf.com"
echo "======================================"

