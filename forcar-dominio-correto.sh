#!/bin/bash

# Script para FORÇAR fabianosf.com apontar para o portfólio
# Execute no servidor: ./forcar-dominio-correto.sh

echo "🔧 FORÇANDO DOMÍNIO CORRETO"
echo "============================"
echo ""

# 1. Backup da configuração atual
echo "1. Fazendo backup..."
sudo cp /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-available/fabianosf_site.backup
echo "✅ Backup criado"
echo ""

# 2. Criar configuração CORRETA para fabianosf_site
echo "2. Criando configuração correta..."
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

# 3. Verificar se asbjj NÃO tem fabianosf.com no server_name
echo "3. Verificando configuração do asbjj..."
ASBJJ_CONFIG="/etc/nginx/sites-available/asbjj"
if [ -f "$ASBJJ_CONFIG" ]; then
    if sudo grep -q "fabianosf.com" "$ASBJJ_CONFIG"; then
        echo "⚠️  ATENÇÃO: asbjj tem fabianosf.com no server_name!"
        echo "   Removendo..."
        sudo sed -i '/server_name.*fabianosf.com/d' "$ASBJJ_CONFIG"
        echo "✅ Removido"
    else
        echo "✅ asbjj não tem fabianosf.com"
    fi
fi
echo ""

# 4. Garantir que fabianosf_site está habilitado
echo "4. Habilitando fabianosf_site..."
sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/fabianosf_site
echo "✅ Habilitado"
echo ""

# 5. Verificar se index.html existe
echo "5. Verificando index.html..."
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html existe"
    ls -lh /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO EXISTE!"
    echo "   Execute o script de deploy primeiro!"
    exit 1
fi
echo ""

# 6. Testar configuração do Nginx
echo "6. Testando configuração do Nginx..."
if sudo nginx -t; then
    echo "✅ Configuração OK"
else
    echo "❌ Erro na configuração!"
    exit 1
fi
echo ""

# 7. Recarregar Nginx
echo "7. Recarregando Nginx..."
sudo systemctl reload nginx
if [ $? -eq 0 ]; then
    echo "✅ Nginx recarregado"
else
    echo "❌ Erro ao recarregar Nginx!"
    exit 1
fi
echo ""

# 8. Testar
echo "8. Testando..."
echo "----------------------------------------"
echo "Teste 1 - Com Host fabianosf.com:"
curl -s -H "Host: fabianosf.com" http://localhost | head -10
echo ""
echo "Teste 2 - Com IP:"
curl -s http://92.113.33.16 | head -10
echo ""

echo "======================================"
echo "✅ CONCLUÍDO!"
echo "======================================"
echo ""
echo "🌐 Teste no navegador:"
echo "   http://fabianosf.com"
echo ""
echo "💡 Se ainda mostrar ASBJJ:"
echo "   1. Limpe o cache do navegador (Ctrl+Shift+Delete)"
echo "   2. Teste em modo anônimo"
echo "   3. Verifique DNS: dig fabianosf.com"
echo ""

