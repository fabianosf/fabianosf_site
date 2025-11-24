#!/bin/bash

# Script para configurar HTTPS com Let's Encrypt
# Execute no servidor: ./configurar-https.sh

echo "🔒 CONFIGURANDO HTTPS"
echo "===================="
echo ""

# Verificar se Certbot está instalado
echo "1. Verificando Certbot..."
if ! command -v certbot &> /dev/null; then
    echo "⚠️  Certbot não está instalado. Instalando..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
    echo "✅ Certbot instalado"
else
    echo "✅ Certbot já está instalado"
fi
echo ""

# Verificar se Nginx está rodando
echo "2. Verificando Nginx..."
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx está rodando"
else
    echo "⚠️  Nginx não está rodando. Iniciando..."
    sudo systemctl start nginx
    echo "✅ Nginx iniciado"
fi
echo ""

# Verificar configuração atual do Nginx
echo "3. Verificando configuração do Nginx..."
if [ -f "/etc/nginx/sites-available/fabianosf_site" ]; then
    echo "✅ Configuração encontrada"
    
    # Verificar se já tem SSL configurado
    if sudo grep -q "listen 443" /etc/nginx/sites-available/fabianosf_site; then
        echo "⚠️  HTTPS já está configurado!"
        echo ""
        read -p "Deseja reconfigurar? (s/n): " RECONFIG
        if [ "$RECONFIG" != "s" ] && [ "$RECONFIG" != "S" ]; then
            echo "Cancelado."
            exit 0
        fi
    fi
else
    echo "❌ Configuração do Nginx não encontrada!"
    echo "   Execute primeiro o script corrigir-404-completo.sh"
    exit 1
fi
echo ""

# Obter certificado SSL
echo "4. Obtendo certificado SSL do Let's Encrypt..."
echo "💡 Isso vai pedir:"
echo "   - Email para notificações"
echo "   - Aceitar termos de serviço"
echo "   - Compartilhar email com EFF (opcional)"
echo ""
echo "💡 Certifique-se de que:"
echo "   - O domínio fabianosf.com aponta para este servidor (92.113.33.16)"
echo "   - A porta 80 está aberta no firewall"
echo ""

read -p "Continuar? (s/n): " CONTINUAR
if [ "$CONTINUAR" != "s" ] && [ "$CONTINUAR" != "S" ]; then
    echo "Cancelado."
    exit 0
fi

# Executar Certbot
sudo certbot --nginx -d fabianosf.com -d www.fabianosf.com

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Certificado SSL obtido com sucesso!"
    echo ""
    
    # Verificar configuração
    echo "5. Verificando configuração..."
    if sudo nginx -t; then
        echo "✅ Configuração do Nginx OK"
        sudo systemctl reload nginx
        echo "✅ Nginx recarregado"
    else
        echo "❌ Erro na configuração do Nginx!"
        exit 1
    fi
    echo ""
    
    # Testar HTTPS
    echo "6. Testando HTTPS..."
    echo "----------------------------------------"
    curl -I https://fabianosf.com 2>&1 | head -5
    echo ""
    
    echo "======================================"
    echo "✅ HTTPS CONFIGURADO COM SUCESSO!"
    echo "======================================"
    echo ""
    echo "🌐 Seu site agora está disponível em:"
    echo "   https://fabianosf.com"
    echo "   https://www.fabianosf.com"
    echo ""
    echo "💡 O certificado será renovado automaticamente"
    echo "   Verifique com: sudo certbot certificates"
    echo ""
else
    echo ""
    echo "❌ Erro ao obter certificado SSL!"
    echo ""
    echo "💡 Possíveis causas:"
    echo "   1. Domínio não aponta para este servidor"
    echo "   2. Porta 80 bloqueada no firewall"
    echo "   3. Nginx não está configurado corretamente"
    echo ""
    echo "Verifique:"
    echo "   - DNS: dig fabianosf.com"
    echo "   - Firewall: sudo ufw status"
    echo "   - Nginx: sudo nginx -t"
    exit 1
fi

