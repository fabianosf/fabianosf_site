#!/bin/bash

# Script para testar diretamente no servidor
# Execute no servidor

echo "🧪 TESTANDO O QUE ESTÁ SENDO SERVIDO"
echo "===================================="
echo ""

# 1. Verificar arquivos
echo "1. Arquivos em /var/www/fabianosf_site/:"
ls -la /var/www/fabianosf_site/ 2>/dev/null || echo "Diretório não existe"
echo ""

# 2. Testar diretamente no servidor
echo "2. Testando diretamente no servidor:"
echo "----------------------------------------"
echo "Teste 1 - Com IP (92.113.33.16):"
curl -s http://localhost | head -10
echo ""
echo "Teste 2 - Com Host fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -10
echo ""
echo "Teste 3 - Com Host asbjj.com.br:"
curl -s -H "Host: asbjj.com.br" http://localhost | head -10
echo ""

# 3. Verificar qual configuração está respondendo
echo "3. Verificando configurações ativas:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

# 4. Ver configuração do fabianosf_site
echo "4. Configuração fabianosf_site:"
sudo cat /etc/nginx/sites-available/fabianosf_site | grep -E "server_name|root"
echo ""

# 5. Ver configuração do asbjj
echo "5. Configuração asbjj:"
sudo cat /etc/nginx/sites-available/asbjj | grep -E "server_name|root"
echo ""

# 6. Verificar se há conflito
echo "6. Verificando conflitos:"
sudo nginx -t 2>&1 | grep -i "conflict\|duplicate" || echo "Sem conflitos"
echo ""

# 7. Ver logs do Nginx
echo "7. Últimos acessos:"
sudo tail -5 /var/log/nginx/access.log 2>/dev/null || echo "Log não encontrado"
echo ""

echo "======================================"
echo "💡 DIAGNÓSTICO:"
echo "======================================"
echo ""
echo "Se o teste com 'Host: fabianosf.com' mostrar ASBJJ:"
echo "  → A configuração asbjj está pegando o domínio"
echo "  → Precisa verificar a ordem das configurações"
echo ""
echo "Se o teste com IP mostrar seu portfólio:"
echo "  → Os arquivos estão corretos"
echo "  → O problema é na configuração do domínio"
echo ""

