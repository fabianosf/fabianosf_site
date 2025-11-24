# 🔧 Resolver Problema do Domínio fabianosf.com

## Problema
- ✅ Pelo IP funciona (mostra portfólio)
- ❌ Pelo domínio fabianosf.com não funciona (mostra ASBJJ)

## Causa Provável
O **Traefik** (Docker) está rodando na porta 80 e interceptando TODAS as requisições antes do Nginx.

## Solução Rápida

### Opção 1: Parar Traefik (Recomendado para testar)

```bash
# No servidor, execute:
ssh fabianosf@92.113.33.16

# Verificar se Traefik está rodando
sudo docker ps | grep traefik

# Se estiver rodando, parar:
sudo docker stop $(sudo docker ps | grep traefik | awk '{print $1}')

# Verificar se Nginx está rodando
sudo systemctl status nginx

# Se não estiver, iniciar:
sudo systemctl start nginx
```

### Opção 2: Usar Script Automático

```bash
# No servidor, execute:
./resolver-dominio-definitivo.sh
```

Este script vai:
1. Verificar se Traefik está rodando
2. Oferecer para parar Traefik
3. Garantir que Nginx está configurado corretamente
4. Testar a configuração

## Verificação

Depois de parar o Traefik, teste:

```bash
# No servidor:
curl -H "Host: fabianosf.com" http://localhost | head -10

# Deve mostrar o HTML do portfólio (com <!doctype html>)
```

## Se Ainda Não Funcionar

Execute o diagnóstico completo:

```bash
# No servidor:
./diagnostico-dominio.sh
```

Este script vai mostrar:
- O que está escutando na porta 80
- Se Traefik está rodando
- Configurações do Nginx
- Testes locais

## Nota Importante

Se você precisa do Traefik rodando (para outros sites), você tem duas opções:

1. **Configurar Traefik para rotear fabianosf.com** (mais complexo)
2. **Usar Nginx na porta 80 e Traefik em outra porta** (mais simples)

Para a opção 2, você precisaria:
- Parar Traefik na porta 80
- Configurar Traefik para usar outra porta (ex: 8080)
- Configurar Nginx como proxy reverso para Traefik quando necessário

## Arquivos Criados

- `resolver-dominio-definitivo.sh` - Script principal para resolver
- `diagnostico-dominio.sh` - Script de diagnóstico completo
- `forcar-dominio-correto.sh` - Script para forçar configuração correta
- `corrigir-dominio.sh` - Script para verificar configurações

