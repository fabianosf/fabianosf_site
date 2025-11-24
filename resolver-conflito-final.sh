#!/bin/bash

# Script para resolver o conflito final
# Execute no servidor

echo "🔧 RESOLVENDO CONFLITO FINAL"
echo "============================"
echo ""

# 1. Ver configuração antiga
echo "1. Verificando configuração antiga (fabianosf.com):"
echo "----------------------------------------"
sudo cat /etc/nginx/sites-available/fabianosf.com
echo ""

# 2. Desativar configuração antiga
echo "2. Desativando configuração antiga:"
sudo rm -f /etc/nginx/sites-enabled/fabianosf.com
echo "✅ Configuração fabianosf.com desativada"
echo ""

# 3. Verificar configurações ativas
echo "3. Configurações ativas agora:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

# 4. Testar configuração
echo "4. Testando configuração do Nginx:"
sudo nginx -t
echo ""

# 5. Reiniciar Nginx
echo "5. Reiniciando Nginx:"
sudo systemctl restart nginx
sleep 2
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx reiniciado"
else
    echo "❌ Erro ao reiniciar"
    sudo systemctl status nginx | head -10
fi
echo ""

# 6. Verificar se ainda há avisos
echo "6. Verificando avisos:"
if sudo nginx -t 2>&1 | grep -q "conflicting"; then
    echo "⚠️  Ainda há conflitos"
    sudo nginx -t 2>&1 | grep "conflicting"
else
    echo "✅ Sem conflitos!"
fi
echo ""

# 7. Verificar logs
echo "7. Últimos erros (se houver):"
sudo tail -5 /var/log/nginx/error.log | grep -i error || echo "Nenhum erro recente"
echo ""

echo "======================================"
echo "✅ Conflito resolvido!"
echo "======================================"
echo ""
echo "🌐 Teste agora:"
echo "   - http://92.113.33.16"
echo "   - http://fabianosf.com"
echo ""
echo "Se ainda der erro, veja os logs:"
echo "   sudo tail -f /var/log/nginx/error.log"
echo ""

