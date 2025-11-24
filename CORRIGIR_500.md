# 🔧 Corrigir Erro 500 Internal Server Error

O erro 500 significa que o Nginx está configurado, mas há um problema ao servir os arquivos.

## 🔍 Diagnóstico Rápido

### 1. Verificar Logs do Nginx

```bash
ssh fabianosf@92.113.33.16

# Ver erros recentes
sudo tail -20 /var/log/nginx/error.log

# Ver em tempo real
sudo tail -f /var/log/nginx/error.log
```

### 2. Verificar se os arquivos existem

```bash
# Verificar se index.html existe
ls -la /home/fabianosf/fabianosf_site/index.html

# Ver estrutura de arquivos
ls -la /home/fabianosf/fabianosf_site/
```

### 3. Verificar configuração do Nginx

```bash
# Testar configuração
sudo nginx -t

# Ver configuração atual
sudo cat /etc/nginx/sites-available/fabianosf_site
```

## ✅ Solução

### Passo 1: Verificar/Criar Configuração do Nginx

```bash
ssh fabianosf@92.113.33.16
sudo nano /etc/nginx/sites-available/fabianosf_site
```

**Cole esta configuração (ajuste o caminho se necessário):**

```nginx
server {
    listen 80;
    server_name 92.113.33.16 _;
    
    # Caminho para os arquivos (SEM /dist, pois já está no deploy)
    root /home/fabianosf/fabianosf_site;
    index index.html;

    # Logs
    access_log /var/log/nginx/fabianosf-access.log;
    error_log /var/log/nginx/fabianosf-error.log;

    # Configuração para SPA (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para arquivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;
}
```

### Passo 2: Verificar Permissões

```bash
# Verificar permissões
ls -la /home/fabianosf/fabianosf_site/

# Ajustar se necessário
sudo chown -R fabianosf:www-data /home/fabianosf/fabianosf_site
sudo chmod -R 755 /home/fabianosf/fabianosf_site
sudo find /home/fabianosf/fabianosf_site -type f -exec chmod 644 {} \;
```

### Passo 3: Verificar se index.html existe e está correto

```bash
# Verificar se existe
test -f /home/fabianosf/fabianosf_site/index.html && echo "OK" || echo "NÃO EXISTE"

# Ver primeiras linhas
head -5 /home/fabianosf/fabianosf_site/index.html
```

### Passo 4: Ativar e Reiniciar

```bash
# Ativar site
sudo ln -sf /etc/nginx/sites-available/fabianosf_site /etc/nginx/sites-enabled/

# Remover default se existir
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Se teste passar, reiniciar
sudo systemctl restart nginx

# Verificar status
sudo systemctl status nginx
```

## 🐛 Problemas Comuns

### Problema 1: index.html não encontrado

```bash
# Verificar se está no lugar certo
ls -la /home/fabianosf/fabianosf_site/index.html

# Se não existir, verificar se está em subdiretório
find /home/fabianosf/fabianosf_site -name "index.html"
```

### Problema 2: Permissões incorretas

```bash
# Verificar usuário do nginx
ps aux | grep nginx

# Ajustar permissões
sudo chown -R www-data:www-data /home/fabianosf/fabianosf_site
sudo chmod -R 755 /home/fabianosf/fabianosf_site
```

### Problema 3: SELinux (CentOS/RHEL)

```bash
# Se usar CentOS/RHEL
sudo setsebool -P httpd_read_user_content 1
sudo chcon -R -t httpd_sys_content_t /home/fabianosf/fabianosf_site
```

### Problema 4: Diretório home não acessível

Se o nginx não conseguir acessar `/home/fabianosf/`, mova para `/var/www/`:

```bash
# Criar diretório
sudo mkdir -p /var/www/fabianosf_site

# Copiar arquivos
sudo cp -r /home/fabianosf/fabianosf_site/* /var/www/fabianosf_site/

# Ajustar permissões
sudo chown -R www-data:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site

# Atualizar nginx para usar /var/www/fabianosf_site
```

## 📋 Checklist

- [ ] Arquivos existem em `/home/fabianosf/fabianosf_site/`
- [ ] `index.html` existe e está acessível
- [ ] Permissões corretas (755 para diretórios, 644 para arquivos)
- [ ] Nginx configurado corretamente
- [ ] `sudo nginx -t` passa sem erros
- [ ] Nginx reiniciado
- [ ] Logs verificados

## 🔍 Comandos Úteis

```bash
# Ver último erro
sudo tail -1 /var/log/nginx/error.log

# Ver todas as configurações ativas
sudo nginx -T

# Ver processos do nginx
ps aux | grep nginx

# Verificar porta 80
sudo netstat -tulpn | grep :80
```

## ✅ Teste Final

Após corrigir, acesse:
- `http://92.113.33.16`

Se ainda der erro, verifique os logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

