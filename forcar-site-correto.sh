#!/bin/bash

# Script para FORÇAR o site correto
# Execute no servidor

echo "🔧 FORÇANDO SITE CORRETO"
echo "========================"
echo ""

# 1. Ver todas as configurações ativas
echo "1. Configurações ativas ANTES:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

# 2. Desativar TODAS as configurações com fabianosf.com
echo "2. Desativando TODAS as configurações antigas:"
sudo rm -f /etc/nginx/sites-enabled/fabianosf.com
sudo rm -f /etc/nginx/sites-enabled/fabianosf_site
echo "✅ Todas desativadas"
echo ""

# 3. Verificar qual é a configuração correta
echo "3. Verificando configuração fabianosf_site:"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/fabianosf_site
echo ""

# 4. Ativar APENAS fabianosf_site
echo "4. Ativando APENAS fabianosf_site:"
sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/
echo "✅ Ativada"
echo ""

# 5. Verificar configurações ativas DEPOIS
echo "5. Configurações ativas DEPOIS:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

# 6. Verificar qual root está configurado
echo "6. Verificando root configurado:"
sudo grep "root" /etc/nginx/sites-enabled/fabianosf_site
echo ""

# 7. Verificar se os arquivos estão no lugar certo
echo "7. Verificando arquivos:"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe em /var/www/fabianosf_site/"
    echo "Primeiras 5 linhas (deve ser o portfólio):"
    head -5 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO existe!"
fi
echo ""

# 8. Verificar configuração antiga (para comparar)
echo "8. Verificando configuração antiga (fabianosf.com):"
echo "----------------------------------------"
if [ -f "/etc/nginx/sites-available/fabianosf.com" ]; then
    echo "Configuração antiga ainda existe (mas deve estar desativada):"
    sudo grep "root" /etc/nginx/sites-available/fabianosf.com
else
    echo "Configuração antiga não existe"
fi
echo ""

# 9. Testar e reiniciar
echo "9. Testando e reiniciando:"
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
sleep 2
echo "✅ Nginx reiniciado"
echo ""

# 10. Verificar processos
echo "10. Verificando processos do Nginx:"
sudo ps aux | grep nginx | grep -v grep | head -3
echo ""

# 11. Verificar qual configuração está sendo usada
echo "11. Testando qual site responde:"
curl -s -I http://localhost | head -5
echo ""

echo "======================================"
echo "✅ Processo concluído!"
echo "======================================"
echo ""
echo "🌐 IMPORTANTE:"
echo "   1. Limpe o cache do navegador (Ctrl+Shift+Delete)"
echo "   2. Ou use modo anônimo (Ctrl+Shift+N)"
echo "   3. Teste: http://fabianosf.com"
echo ""
echo "Se ainda mostrar ASBJJ, pode ser cache do navegador!"
echo ""

