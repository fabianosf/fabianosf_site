# 🔐 Como Configurar SSH para Deploy (Sem Senha)

## 🎯 Opção 1: Chave SSH (RECOMENDADO - Mais Seguro)

### Passo 1: Gerar chave SSH (se ainda não tiver)

Na sua máquina local:

```bash
ssh-keygen -t rsa -b 4096 -C "seu-email@exemplo.com"
```

- Pressione Enter para usar o local padrão (`~/.ssh/id_rsa`)
- Pressione Enter para deixar a senha da chave vazia (ou crie uma se preferir)

### Passo 2: Copiar chave para o VPS

```bash
ssh-copy-id seu-usuario@seu-ip-vps
```

Ou manualmente:

```bash
# Na sua máquina
cat ~/.ssh/id_rsa.pub

# Copie o conteúdo e cole no VPS:
ssh seu-usuario@seu-ip-vps
mkdir -p ~/.ssh
echo "cole-aqui-a-chave-publica" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Passo 3: Testar conexão

```bash
ssh seu-usuario@seu-ip-vps
```

Se não pedir senha, está funcionando! ✅

### Passo 4: Configurar o deploy.sh

No arquivo `deploy.sh`, deixe assim:

```bash
SSH_KEY=""  # Vazio = usa chave padrão (~/.ssh/id_rsa)
# VPS_PASSWORD=""  # Deixe comentado
```

**Pronto!** Agora o script não vai pedir senha.

---

## 🔑 Opção 2: Usar Senha no Script (MENOS SEGURO)

### Passo 1: Instalar sshpass

**Ubuntu/Debian:**
```bash
sudo apt install sshpass
```

**Outros sistemas:**
- Verifique a documentação do seu sistema

### Passo 2: Configurar o deploy.sh

No arquivo `deploy.sh`, descomente e preencha:

```bash
# SSH_KEY=""  # Deixe vazio
VPS_PASSWORD="sua-senha-aqui"  # Descomente e coloque sua senha
```

⚠️ **ATENÇÃO:** 
- A senha ficará visível no arquivo
- Não commite este arquivo no Git com a senha!
- Adicione `deploy.sh` ao `.gitignore` se usar senha

---

## 📋 Comparação

| Método | Segurança | Facilidade | Recomendado |
|--------|-----------|------------|-------------|
| Chave SSH | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ SIM |
| Senha no script | ⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ NÃO |

---

## 🛡️ Dica de Segurança

Se usar senha, adicione ao `.gitignore`:

```bash
echo "deploy.sh" >> .gitignore
```

Assim a senha não será commitada no Git.

---

## ✅ Teste Rápido

Depois de configurar, teste:

```bash
./deploy.sh
```

Se funcionar sem pedir senha, está tudo certo! 🎉

