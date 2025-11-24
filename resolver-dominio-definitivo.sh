#!/bin/bash

# Script para resolver DEFINITIVAMENTE o problema do domínio
# Execute no servidor

echo "🔧 RESOLVENDO PROBLEMA DO DOMÍNIO DEFINITIVAMENTE"
echo "=================================================="
echo ""

# 1. Verificar se Traefik está rodando
echo "1. Verificando Traefik..."
if sudo docker ps | grep -q traefik; then
    TRAEFIK_CONTAINER=$(sudo docker ps | grep traefik | awk '{print $1}')
    echo "⚠️  Traefik está rodando (container: $TRAEFIK_CONTAINER)"
    echo "   Traefik está interceptando requisições na porta 80!"
    echo ""
    echo "💡 Opções:"
    echo "   A) Parar Traefik temporariamente (Nginx vai funcionar)"
    echo "   B) Configurar Traefik para rotear fabianosf.com"
    echo ""
    read -p "Parar Traefik agora? (s/n): " PARAR_TRAEFIK
    if [ "$PARAR_TRAEFIK" = "s" ] || [ "$PARAR_TRAEFIK" = "S" ]; then
        echo "Parando Traefik..."
        sudo docker stop $TRAEFIK_CONTAINER
        echo "✅ Traefik parado"
        sleep 2
    else
        echo "⚠️  Traefik continua rodando - pode causar conflito"
    fi
else
    echo "✅ Traefik não está rodando"
fi
echo ""

# 2. Garantir que Nginx está rodando
echo "2. Verificando Nginx..."
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx está rodando"
else
    echo "⚠️  Nginx não está rodando. Iniciando..."
    sudo systemctl start nginx
    if [ $? -eq 0 ]; then
        echo "✅ Nginx iniciado"
    else
        echo "❌ Erro ao iniciar Nginx!"
        exit 1
    fi
fi
echo ""

# 3. Verificar se index.html existe
echo "3. Verificando arquivos..."
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe"
else
    echo "❌ index.html NÃO EXISTE!"
    echo "   Execute o script de deploy primeiro!"
    exit 1
fi
echo ""

# 4. Criar/atualizar configuração do fabianosf_site
echo "4. Criando configuração correta do fabianosf_site..."
sudo tee /etc/nginx/sites-available/fabianosf_site > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name fabianosf.com www.fabianosf.com;
    
    root /var/www/fabianosf_site;
    index index.html;
    
    # Logs
    access_log /var/log/nginx/fabianosf_access.log;
    error_log /var/log/nginx/fabianosf_error.log;
    
    # SPA - React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF
echo "✅ Configuração criada"
echo ""

# 5. Garantir que fabianosf_site está habilitado
echo "5. Habilitando fabianosf_site..."
sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/fabianosf_site
echo "✅ Habilitado"
echo ""

# 6. Verificar se asbjj tem conflito
echo "6. Verificando conflitos com asbjj..."
if sudo grep -q "fabianosf.com\|default_server\|server_name _" /etc/nginx/sites-available/asbjj; then
    echo "⚠️  Possível conflito encontrado no asbjj"
    echo "   Verificando..."
    sudo grep "server_name" /etc/nginx/sites-available/asbjj
else
    echo "✅ Sem conflitos aparentes"
fi
echo ""

# 7. Testar configuração
echo "7. Testando configuração do Nginx..."
if sudo nginx -t; then
    echo "✅ Configuração OK"
else
    echo "❌ Erro na configuração!"
    exit 1
fi
echo ""

# 8. Recarregar Nginx
echo "8. Recarregando Nginx..."
sudo systemctl reload nginx
if [ $? -eq 0 ]; then
    echo "✅ Nginx recarregado"
else
    echo "❌ Erro ao recarregar Nginx!"
    exit 1
fi
echo ""

# 9. Verificar o que está na porta 80
echo "9. Verificando porta 80..."
echo "----------------------------------------"
sudo ss -tlnp | grep :80
echo ""

# 10. Testar
echo "10. TESTANDO..."
echo "======================================"
echo ""
echo "Teste 1 - curl localhost com Host fabianosf.com:"
RESULT1=$(curl -s -H "Host: fabianosf.com" http://localhost | head -5)
echo "$RESULT1"
if echo "$RESULT1" | grep -q "Fabiano\|portfolio\|<!doctype"; then
    echo "✅ RESULTADO: Mostrando portfólio!"
else
    echo "❌ RESULTADO: Ainda não está correto"
fi
echo ""

echo "Teste 2 - curl pelo IP:"
RESULT2=$(curl -s http://92.113.33.16 | head -5)
echo "$RESULT2"
if echo "$RESULT2" | grep -q "Fabiano\|portfolio\|<!doctype"; then
    echo "✅ RESULTADO: Mostrando portfólio!"
else
    echo "❌ RESULTADO: Ainda não está correto"
fi
echo ""

echo "======================================"
echo "✅ PROCESSO CONCLUÍDO!"
echo "======================================"
echo ""
echo "🌐 Teste no navegador:"
echo "   http://fabianosf.com"
echo ""
echo "💡 Se ainda mostrar ASBJJ:"
echo "   1. Limpe o cache do navegador (Ctrl+Shift+Delete)"
echo "   2. Teste em modo anônimo"
echo "   3. Verifique se Traefik está rodando: sudo docker ps | grep traefik"
echo "   4. Se Traefik estiver rodando, ele pode estar interceptando"
echo ""

