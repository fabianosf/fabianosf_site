# 🔒 Configurar HTTPS (SSL)

## Método 1: Executar no Servidor (Recomendado)

```bash
# 1. Conectar ao servidor
ssh fabianosf@92.113.33.16

# 2. Copiar o script para o servidor (se ainda não estiver lá)
# Ou executar diretamente do seu PC via SSH:
ssh fabianosf@92.113.33.16 'bash -s' < configurar-https.sh
```

## Método 2: Executar Diretamente do PC

```bash
# No seu PC, execute:
./configurar-https-remoto.sh
```

## O que o script faz:

1. ✅ Instala Certbot (se necessário)
2. ✅ Verifica se Nginx está rodando
3. ✅ Obtém certificado SSL do Let's Encrypt
4. ✅ Configura Nginx automaticamente para HTTPS
5. ✅ Testa a configuração

## Requisitos:

- ✅ Domínio `fabianosf.com` apontando para `92.113.33.16`
- ✅ Porta 80 aberta no firewall
- ✅ Nginx configurado e rodando

## Verificar DNS:

```bash
dig fabianosf.com
# Deve retornar: 92.113.33.16
```

## Verificar Firewall:

```bash
# No servidor:
sudo ufw status
# Porta 80 deve estar aberta
```

## Após configurar:

- ✅ Site disponível em: `https://fabianosf.com`
- ✅ Redirecionamento automático de HTTP para HTTPS
- ✅ Renovação automática do certificado (válido por 90 dias)

## Verificar certificado:

```bash
# No servidor:
sudo certbot certificates
```

## Renovar manualmente (se necessário):

```bash
# No servidor:
sudo certbot renew
```

