# ⚡ Deploy Rápido - Resumo

## 🎯 Passos Rápidos

### 1️⃣ No seu computador (local)

```bash
# Fazer build do projeto
npm run build

# Editar o script deploy.sh com suas informações do VPS
nano deploy.sh
# Configure: VPS_USER, VPS_HOST, VPS_PATH

# Executar o deploy
./deploy.sh
```

### 2️⃣ No VPS (via SSH)

```bash
# Conectar ao VPS
ssh seu-usuario@seu-ip

# Criar diretório do site
sudo mkdir -p /var/www/seu-site
sudo chown -R $USER:$USER /var/www/seu-site

# Instalar Nginx (se ainda não tiver)
sudo apt update
sudo apt install nginx

# Copiar configuração do Nginx
sudo cp nginx-example.conf /etc/nginx/sites-available/seu-site
sudo nano /etc/nginx/sites-available/seu-site
# Edite: server_name, root

# Ativar site
sudo ln -s /etc/nginx/sites-available/seu-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3️⃣ Configurar SSL (Opcional)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

---

## 📝 Checklist Mínimo

- [ ] Build feito (`npm run build`)
- [ ] Arquivos enviados para VPS
- [ ] Nginx instalado e configurado
- [ ] Site acessível

---

## 🔗 Arquivos de Referência

- **Guia Completo:** `GUIA_DEPLOY_VPS.md`
- **Script de Deploy:** `deploy.sh`
- **Config Nginx:** `nginx-example.conf`

---

**Dúvidas? Consulte o `GUIA_DEPLOY_VPS.md` para instruções detalhadas!**

