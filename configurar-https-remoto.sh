#!/bin/bash

# Script para configurar HTTPS remotamente
# Execute no seu PC: ./configurar-https-remoto.sh

VPS_USER="fabianosf"
VPS_HOST="92.113.33.16"

echo "🔒 CONFIGURANDO HTTPS REMOTAMENTE"
echo "================================="
echo ""

# Enviar script para o servidor
echo "1. Enviando script para o servidor..."
scp configurar-https.sh ${VPS_USER}@${VPS_HOST}:~/configurar-https.sh
if [ $? -ne 0 ]; then
    echo "❌ Erro ao enviar script!"
    exit 1
fi
echo "✅ Script enviado"
echo ""

# Tornar executável
echo "2. Tornando script executável..."
ssh ${VPS_USER}@${VPS_HOST} "chmod +x ~/configurar-https.sh"
echo "✅ Script executável"
echo ""

# Executar no servidor
echo "3. Executando configuração no servidor..."
echo "💡 Você precisará digitar a senha do SUDO algumas vezes"
echo ""
ssh -t ${VPS_USER}@${VPS_HOST} "~/configurar-https.sh"

echo ""
echo "======================================"
echo "✅ PROCESSO CONCLUÍDO!"
echo "======================================"
echo ""
echo "🌐 Teste: https://fabianosf.com"
echo ""

