#!/bin/bash

# Diagnóstico completo do problema do domínio
# Execute no servidor

echo "🔍 DIAGNÓSTICO COMPLETO DO DOMÍNIO"
echo "==================================="
echo ""

# 1. Verificar o que está escutando na porta 80
echo "1. O QUE ESTÁ ESCUTANDO NA PORTA 80:"
echo "----------------------------------------"
sudo netstat -tlnp | grep :80
echo ""
sudo ss -tlnp | grep :80
echo ""

# 2. Verificar Traefik
echo "2. VERIFICANDO TRAEFIK:"
echo "----------------------------------------"
if sudo docker ps | grep -q traefik; then
    echo "⚠️  TRAEFIK ESTÁ RODANDO!"
    sudo docker ps | grep traefik
    echo ""
    echo "💡 Traefik pode estar interceptando as requisições!"
    echo "   Traefik geralmente fica na frente do Nginx"
else
    echo "✅ Traefik não está rodando"
fi
echo ""

# 3. Verificar configurações do Nginx
echo "3. CONFIGURAÇÕES DO NGINX:"
echo "----------------------------------------"
echo "Configurações ativas:"
sudo ls -la /etc/nginx/sites-enabled/
echo ""

echo "Configuração fabianosf_site:"
sudo grep -A 5 "server_name" /etc/nginx/sites-available/fabianosf_site | head -10
echo ""

echo "Configuração asbjj:"
sudo grep -A 5 "server_name" /etc/nginx/sites-available/asbjj | head -10
echo ""

# 4. Testar localmente
echo "4. TESTANDO LOCALMENTE:"
echo "----------------------------------------"
echo "Teste 1 - curl localhost com Host fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -20
echo ""

echo "Teste 2 - curl localhost com Host asbjj.com.br:"
curl -s -H "Host: asbjj.com.br" http://localhost | head -20
echo ""

# 5. Verificar logs do Nginx
echo "5. ÚLTIMOS LOGS DO NGINX:"
echo "----------------------------------------"
sudo tail -20 /var/log/nginx/access.log 2>/dev/null | tail -5
echo ""

# 6. Verificar DNS
echo "6. VERIFICANDO DNS:"
echo "----------------------------------------"
echo "Resolução de fabianosf.com:"
dig +short fabianosf.com
echo ""

# 7. Verificar se há proxy reverso
echo "7. VERIFICANDO PROXY REVERSO:"
echo "----------------------------------------"
if sudo grep -r "proxy_pass" /etc/nginx/sites-available/ | grep -v "#"; then
    echo "⚠️  Há proxy_pass configurado!"
    sudo grep -r "proxy_pass" /etc/nginx/sites-available/ | grep -v "#"
else
    echo "✅ Sem proxy_pass"
fi
echo ""

echo "======================================"
echo "💡 DIAGNÓSTICO:"
echo "======================================"
echo ""
echo "Se Traefik está rodando na porta 80:"
echo "  → Traefik está interceptando TODAS as requisições"
echo "  → Nginx não está recebendo as requisições"
echo "  → SOLUÇÃO: Parar Traefik ou configurar Traefik para rotear fabianosf.com"
echo ""
echo "Se Nginx está na porta 80 mas ainda mostra ASBJJ:"
echo "  → A configuração asbjj está sendo lida primeiro"
echo "  → SOLUÇÃO: Reordenar ou remover conflitos"
echo ""

