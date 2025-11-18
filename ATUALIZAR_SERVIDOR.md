# 🔄 Guia de Atualização do Servidor

Guia rápido para atualizar o servidor VPS após fazer alterações no seu PC.

---

## 🚀 Método 1: Script Automatizado (Recomendado)

### Configuração Inicial (apenas uma vez)

1. **Edite o arquivo `deploy.sh`** com suas informações do VPS:

```bash
nano deploy.sh
```

Configure estas variáveis no início do arquivo:
```bash
VPS_USER="seu-usuario"           # Exemplo: root ou ubuntu
VPS_HOST="seu-ip-ou-dominio"     # Exemplo: 192.168.1.100 ou meusite.com
VPS_PATH="/var/www/seu-site"     # Caminho no VPS
```

### Atualizar o Servidor

Sempre que fizer alterações no seu PC, execute:

```bash
./deploy.sh
```

O script vai:
- ✅ Fazer o build automaticamente
- ✅ Enviar os arquivos para o VPS
- ✅ Substituir os arquivos antigos

**Pronto!** Seu site estará atualizado.

---

## 🔧 Método 2: Comandos Manuais

Se preferir fazer manualmente:

### Passo 1: Build do Projeto

```bash
npm run build
```

### Passo 2: Enviar para o VPS

**Opção A - Usando RSYNC (Recomendado):**
```bash
rsync -avz --delete dist/ seu-usuario@seu-ip:/var/www/seu-site/
```

**Opção B - Usando SCP:**
```bash
scp -r dist/* seu-usuario@seu-ip:/var/www/seu-site/
```

### Passo 3: Reiniciar Nginx (se necessário)

```bash
ssh seu-usuario@seu-ip
sudo systemctl restart nginx
```

---

## 📝 Método 3: Usando Git (Se o projeto está no Git)

### No seu PC:

```bash
# Commit e push das alterações
git add .
git commit -m "Atualização do site"
git push
```

### No VPS:

```bash
ssh seu-usuario@seu-ip
cd /var/www/seu-site
git pull
npm install  # Se adicionou novas dependências
npm run build
sudo systemctl restart nginx
```

---

## ⚡ Comando Rápido (Copiar e Colar)

Substitua as informações e execute:

```bash
npm run build && rsync -avz --delete dist/ seu-usuario@seu-ip:/var/www/seu-site/ && echo "✅ Atualizado!"
```

---

## 🔍 Verificar se Atualizou

1. Acesse seu site no navegador
2. Pressione `Ctrl + F5` (ou `Cmd + Shift + R` no Mac) para forçar atualização do cache
3. Verifique se as alterações aparecem

---

## ⚠️ Dicas Importantes

- **Sempre faça `npm run build` antes de enviar** - os arquivos em `src/` não funcionam no servidor
- **Use `--delete` no rsync** - remove arquivos antigos que não existem mais
- **Limpe o cache do navegador** - pode estar vendo versão antiga em cache

---

## 🐛 Problemas Comuns

### Arquivos não atualizaram
```bash
# Verifique se o build foi feito
ls -la dist/

# Verifique permissões no VPS
ssh seu-usuario@seu-ip
ls -la /var/www/seu-site/
```

### Erro de permissão
```bash
# No VPS, ajuste permissões
sudo chown -R www-data:www-data /var/www/seu-site
sudo chmod -R 755 /var/www/seu-site
```

### Site ainda mostra versão antiga
- Limpe o cache do navegador (Ctrl + F5)
- Verifique se os arquivos foram enviados corretamente
- Verifique os logs do Nginx: `sudo tail -f /var/log/nginx/error.log`

---

## 📋 Checklist Rápido

- [ ] Alterações feitas no código
- [ ] `npm run build` executado
- [ ] Arquivos enviados para VPS
- [ ] Cache do navegador limpo
- [ ] Alterações visíveis no site

---

**💡 Dica:** Use o `deploy.sh` para automatizar tudo isso em um comando só!

