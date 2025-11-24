#!/bin/bash

# Script para verificar e corrigir erro 404
# Execute no servidor

echo "🔍 VERIFICANDO ERRO 404"
echo "======================="
echo ""

# 1. Verificar se index.html existe
echo "1. Verificando index.html:"
echo "----------------------------------------"
if [ -f "/var/www/fabianosf_site/index.html" ]; then
    echo "✅ index.html EXISTE"
    ls -lh /var/www/fabianosf_site/index.html
    echo ""
    echo "Primeiras 5 linhas:"
    head -5 /var/www/fabianosf_site/index.html
else
    echo "❌ index.html NÃO EXISTE!"
    echo ""
    echo "💡 Os arquivos não foram enviados ao servidor!"
    echo "   Execute o script de deploy primeiro."
    exit 1
fi
echo ""

# 2. Verificar estrutura de diretórios
echo "2. Estrutura de diretórios:"
echo "----------------------------------------"
ls -la /var/www/fabianosf_site/
echo ""

# 3. Verificar configuração do Nginx
echo "3. Configuração do Nginx:"
echo "----------------------------------------"
sudo grep -A 3 "root\|server_name" /etc/nginx/sites-available/fabianosf_site | head -10
echo ""

# 4. Verificar se o caminho está correto
echo "4. Verificando caminho no Nginx:"
NGINX_ROOT=$(sudo grep "root" /etc/nginx/sites-available/fabianosf_site | grep -v "#" | awk '{print $2}' | tr -d ';')
echo "Nginx root: $NGINX_ROOT"
if [ -f "$NGINX_ROOT/index.html" ]; then
    echo "✅ index.html existe no caminho do Nginx"
else
    echo "❌ index.html NÃO existe no caminho do Nginx!"
    echo "   Caminho esperado: $NGINX_ROOT/index.html"
fi
echo ""

# 5. Verificar permissões
echo "5. Verificando permissões:"
echo "----------------------------------------"
ls -ld /var/www/fabianosf_site/
ls -l /var/www/fabianosf_site/index.html
echo ""

# 6. Testar acesso do www-data
echo "6. Testando acesso do www-data:"
echo "----------------------------------------"
sudo -u www-data test -r /var/www/fabianosf_site/index.html && echo "✅ www-data pode ler" || echo "❌ www-data NÃO pode ler"
echo ""

# 7. Verificar logs do Nginx
echo "7. Últimos erros do Nginx:"
echo "----------------------------------------"
sudo tail -20 /var/log/nginx/error.log | grep -i "404\|not found\|no such file" | tail -5
echo ""

# 8. Testar localmente
echo "8. Testando localmente:"
echo "----------------------------------------"
echo "Teste com curl:"
curl -s -H "Host: fabianosf.com" http://localhost | head -10
echo ""

echo "======================================"
echo "💡 SOLUÇÃO:"
echo "======================================"
echo ""
if [ ! -f "/var/www/fabianosf_site/index.html" ]; then
    echo "❌ PROBLEMA: index.html não existe!"
    echo ""
    echo "Execute no seu PC:"
    echo "  ./enviar-completo.sh"
    echo ""
    echo "Ou manualmente:"
    echo "  npm run build"
    echo "  scp -r dist/* fabianosf@92.113.33.16:/tmp/"
    echo "  # Depois no servidor:"
    echo "  sudo cp -r /tmp/* /var/www/fabianosf_site/"
    echo "  sudo chown -R www-data:www-data /var/www/fabianosf_site"
fi
echo ""

