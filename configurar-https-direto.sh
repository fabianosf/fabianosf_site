#!/bin/bash

# Script para configurar HTTPS diretamente via SSH
# Execute no seu PC: ./configurar-https-direto.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"

echo "🔒 CONFIGURANDO HTTPS"
echo "===================="
echo ""
echo "💡 Você precisará digitar a senha do SUDO algumas vezes"
echo ""

# 1. Verificar se Certbot está instalado
echo "1. Verificando Certbot..."
CERTBOT_INSTALLED=$(ssh ${VPS_USER}@${VPS_HOST} "command -v certbot" 2>/dev/null)
if [ -z "$CERTBOT_INSTALLED" ]; then
    echo "⚠️  Certbot não está instalado. Instalando..."
    echo "💡 Digite a senha do SUDO"
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo apt update && sudo apt install -y certbot python3-certbot-nginx"
    echo "✅ Certbot instalado"
else
    echo "✅ Certbot já está instalado"
fi
echo ""

# 2. Verificar se Nginx está rodando
echo "2. Verificando Nginx..."
NGINX_ACTIVE=$(ssh ${VPS_USER}@${VPS_HOST} "sudo systemctl is-active nginx 2>/dev/null || echo 'inactive'")
if [ "$NGINX_ACTIVE" != "active" ]; then
    echo "⚠️  Nginx não está rodando. Iniciando..."
    echo "💡 Digite a senha do SUDO"
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo systemctl start nginx"
    echo "✅ Nginx iniciado"
else
    echo "✅ Nginx está rodando"
fi
echo ""

# 3. Verificar configuração atual do Nginx
echo "3. Verificando configuração do Nginx..."
NGINX_CONFIG_EXISTS=$(ssh ${VPS_USER}@${VPS_HOST} "test -f /etc/nginx/sites-available/fabianosf_site && echo 'yes' || echo 'no'")
if [ "$NGINX_CONFIG_EXISTS" = "yes" ]; then
    echo "✅ Configuração encontrada"
    
    # Verificar se já tem SSL configurado
    HAS_SSL=$(ssh -t ${VPS_USER}@${VPS_HOST} "sudo grep -q 'listen 443' /etc/nginx/sites-available/fabianosf_site 2>/dev/null && echo 'yes' || echo 'no'" | tr -d '\r\n')
    if [ "$HAS_SSL" = "yes" ]; then
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

# 4. Obter certificado SSL
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
echo "💡 Digite a senha do SUDO quando solicitado"
echo "💡 Depois responda as perguntas do Certbot (email, termos, etc.)"
echo ""
ssh -t ${VPS_USER}@${VPS_HOST} "sudo certbot --nginx -d fabianosf.com -d www.fabianosf.com"

CERTBOT_EXIT=$?

if [ $CERTBOT_EXIT -eq 0 ]; then
    echo ""
    echo "✅ Certificado SSL obtido com sucesso!"
    echo ""
    
    # Verificar configuração
    echo "5. Verificando configuração..."
    echo "💡 Digite a senha do SUDO"
    ssh -t ${VPS_USER}@${VPS_HOST} "sudo nginx -t && sudo systemctl reload nginx && echo '✅ Nginx recarregado'"
    echo ""
    
    # Testar HTTPS
    echo "6. Testando HTTPS..."
    echo "----------------------------------------"
    ssh ${VPS_USER}@${VPS_HOST} "curl -I https://fabianosf.com 2>&1 | head -5"
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

echo ""
echo "✅ Processo concluído!"

