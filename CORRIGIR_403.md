# 🔧 Corrigir Erro 403 Forbidden no Nginx

O erro 403 significa que o Nginx não tem permissão para acessar os arquivos.

## ✅ Solução Rápida

### 1. Conecte-se ao VPS

```bash
ssh fabianosf@92.113.33.16
```

### 2. Ajuste as Permissões

```bash
# Dar permissões ao diretório
chmod 755 /home/fabianosf/fabianosf_site

# Dar permissões aos arquivos
chmod 644 /home/fabianosf/fabianosf_site/*

# Se o nginx usar usuário www-data (padrão):
sudo chown -R fabianosf:www-data /home/fabianosf/fabianosf_site
sudo chmod -R 755 /home/fabianosf/fabianosf_site
sudo chmod -R 644 /home/fabianosf/fabianosf_site/*
```

### 3. Configure o Nginx

Crie/edite o arquivo de configuração:

```bash
sudo nano /etc/nginx/sites-available/fabianosf_site
```

Cole esta configuração (ajuste o caminho):

```nginx
server {
    listen 80;
    server_name 92.113.33.16;  # Seu IP ou domínio
    
    # Caminho para os arquivos (SEM /dist no final, pois já está no deploy)
    root /home/fabianosf/fabianosf_site;
    index index.html;

    # Configuração para SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para arquivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

### 4. Ative o Site

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/

# Remover default se necessário
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Reiniciar nginx
sudo systemctl restart nginx
```

### 5. Verificar Logs (se ainda der erro)

```bash
# Ver erros do nginx
sudo tail -f /var/log/nginx/error.log

# Ver acessos
sudo tail -f /var/log/nginx/access.log
```

## 🔍 Verificações

```bash
# Verificar se os arquivos existem
ls -la /home/fabianosf/fabianosf_site/

# Verificar permissões
ls -la /home/fabianosf/fabianosf_site/index.html

# Verificar usuário do nginx
ps aux | grep nginx

# Verificar se o nginx pode ler o diretório
sudo -u www-data ls /home/fabianosf/fabianosf_site/
```

## ⚠️ Problemas Comuns

### Problema: SELinux bloqueando (se usar CentOS/RHEL)

```bash
sudo setsebool -P httpd_read_user_content 1
sudo chcon -R -t httpd_sys_content_t /home/fabianosf/fabianosf_site
```

### Problema: Diretório home não acessível

Se o nginx não conseguir acessar `/home/fabianosf/`, mova os arquivos:

```bash
sudo mkdir -p /var/www/fabianosf_site
sudo cp -r /home/fabianosf/fabianosf_site/* /var/www/fabianosf_site/
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
```

E ajuste o `root` no nginx para `/var/www/fabianosf_site`

## ✅ Teste Final

Acesse no navegador:
- `http://92.113.33.16`

Se funcionar, está tudo certo! 🎉

