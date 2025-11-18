# 🚀 Guia de Deploy para VPS

Este guia explica como fazer deploy do seu portfólio React/Vite em um servidor VPS.

## 📋 Pré-requisitos

- Acesso SSH ao seu VPS
- Node.js instalado no VPS (versão 18 ou superior)
- Nginx instalado (ou outro servidor web)
- Domínio configurado apontando para o IP do VPS (opcional, mas recomendado)

---

## 🔧 Opção 1: Deploy com Nginx (Recomendado)

### Passo 1: Preparar o Build Localmente

No seu computador local, faça o build do projeto:

```bash
# No diretório do projeto
npm run build
```

Isso criará uma pasta `dist/` com os arquivos otimizados para produção.

### Passo 2: Transferir Arquivos para o VPS

Você pode usar `scp`, `rsync` ou `git`. Aqui estão as opções:

#### Opção A: Usando SCP (Simples)

```bash
# Do seu computador local
scp -r dist/* usuario@seu-vps-ip:/var/www/seu-site/
```

#### Opção B: Usando RSYNC (Recomendado - mais eficiente)

```bash
# Do seu computador local
rsync -avz --delete dist/ usuario@seu-vps-ip:/var/www/seu-site/
```

#### Opção C: Usando Git (Melhor para atualizações)

1. **No VPS, clone o repositório:**
```bash
ssh usuario@seu-vps-ip
cd /var/www
git clone https://github.com/seu-usuario/seu-repositorio.git seu-site
cd seu-site
npm install
npm run build
```

2. **Para atualizar no futuro:**
```bash
cd /var/www/seu-site
git pull
npm install
npm run build
```

### Passo 3: Configurar Nginx no VPS

1. **Conecte-se ao VPS:**
```bash
ssh usuario@seu-vps-ip
```

2. **Crie o diretório para o site:**
```bash
sudo mkdir -p /var/www/seu-site
sudo chown -R $USER:$USER /var/www/seu-site
```

3. **Crie o arquivo de configuração do Nginx:**
```bash
sudo nano /etc/nginx/sites-available/seu-site
```

4. **Cole a seguinte configuração:**
```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;  # ou seu IP se não tiver domínio
    
    root /var/www/seu-site/dist;
    index index.html;

    # Configuração para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para arquivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

5. **Ative o site:**
```bash
sudo ln -s /etc/nginx/sites-available/seu-site /etc/nginx/sites-enabled/
```

6. **Teste a configuração:**
```bash
sudo nginx -t
```

7. **Reinicie o Nginx:**
```bash
sudo systemctl restart nginx
```

### Passo 4: Configurar SSL com Let's Encrypt (Opcional mas Recomendado)

```bash
# Instale o Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtenha o certificado SSL
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com

# O Certbot configurará automaticamente o HTTPS
```

---

## 🔧 Opção 2: Deploy com PM2 e Servidor Node.js

Se preferir usar Node.js para servir os arquivos estáticos:

### Passo 1: Instalar PM2 no VPS

```bash
ssh usuario@seu-vps-ip
npm install -g pm2
```

### Passo 2: Instalar serve (servidor estático)

```bash
npm install -g serve
```

### Passo 3: Transferir e Build no VPS

```bash
# Clone ou transfira o projeto
cd /var/www
git clone https://github.com/seu-usuario/seu-repositorio.git seu-site
cd seu-site
npm install
npm run build
```

### Passo 4: Iniciar com PM2

```bash
pm2 serve dist/ 3000 --name "portfolio" --spa
pm2 save
pm2 startup
```

### Passo 5: Configurar Nginx como Proxy Reverso

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📝 Script de Deploy Automatizado

Crie um script para facilitar o deploy:

### Script Local (deploy.sh)

```bash
#!/bin/bash

echo "🔨 Fazendo build do projeto..."
npm run build

echo "📤 Enviando arquivos para o VPS..."
rsync -avz --delete dist/ usuario@seu-vps-ip:/var/www/seu-site/

echo "✅ Deploy concluído!"
```

**Torne o script executável:**
```bash
chmod +x deploy.sh
```

**Execute:**
```bash
./deploy.sh
```

---

## 🔄 Atualizações Futuras

### Método 1: Script de Deploy
```bash
./deploy.sh
```

### Método 2: Manual com Git
```bash
# No VPS
cd /var/www/seu-site
git pull
npm install
npm run build
sudo systemctl restart nginx  # Se usar Nginx
```

### Método 3: CI/CD com GitHub Actions (Avançado)

Crie `.github/workflows/deploy.yml`:
```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to VPS
        uses: SamKirkland/FTP-Deploy-Action@4.0.0
        with:
          server: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          password: ${{ secrets.VPS_PASSWORD }}
          local-dir: ./dist/
```

---

## 🛠️ Comandos Úteis

### Verificar status do Nginx
```bash
sudo systemctl status nginx
```

### Ver logs do Nginx
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Reiniciar Nginx
```bash
sudo systemctl restart nginx
```

### Verificar portas em uso
```bash
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
```

### Verificar permissões
```bash
ls -la /var/www/seu-site
```

---

## ⚠️ Troubleshooting

### Erro 403 Forbidden
```bash
# Verifique as permissões
sudo chown -R www-data:www-data /var/www/seu-site
sudo chmod -R 755 /var/www/seu-site
```

### Erro 404 em rotas
- Certifique-se de que o Nginx está configurado com `try_files $uri $uri/ /index.html;`

### Site não carrega CSS/JS
- Verifique se os arquivos foram transferidos corretamente
- Verifique as permissões dos arquivos
- Verifique o console do navegador para erros 404

### Problemas com HTTPS
```bash
# Renovar certificado SSL
sudo certbot renew
```

---

## 📚 Recursos Adicionais

- [Documentação do Vite - Deploy](https://vitejs.dev/guide/static-deploy.html)
- [Documentação do Nginx](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)

---

## ✅ Checklist de Deploy

- [ ] Build do projeto executado localmente
- [ ] Arquivos transferidos para o VPS
- [ ] Nginx instalado e configurado
- [ ] Permissões de arquivos configuradas
- [ ] Site acessível via IP ou domínio
- [ ] SSL configurado (se usar domínio)
- [ ] Testado em diferentes navegadores
- [ ] Script de deploy criado (opcional)

---

**Pronto! Seu site deve estar no ar! 🎉**

