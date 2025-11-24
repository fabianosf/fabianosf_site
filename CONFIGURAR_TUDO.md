# 🚀 Configuração Completa do Zero

Guia para configurar tudo do zero no servidor usando `/var/www`.

## 📋 Passo a Passo

### 1️⃣ Configurar o Servidor (Execute no VPS)

```bash
# Conecte-se ao servidor
ssh fabianosf@92.113.33.16

# Copie o script de configuração para o servidor
# (Da sua máquina local)
scp configurar-servidor.sh fabianosf@92.113.33.16:~/

# No servidor, execute:
chmod +x configurar-servidor.sh
./configurar-servidor.sh
```

O script vai:
- ✅ Criar `/var/www/fabianosf_site`
- ✅ Instalar/configurar Nginx
- ✅ Configurar permissões
- ✅ Ativar o site

### 2️⃣ Fazer Deploy (Da sua máquina local)

```bash
# Na sua máquina, no diretório do projeto
cd /home/fabianosf/Downloads/fabianosf_site

# Execute o deploy
./deploy.sh
```

O script já está configurado para:
- ✅ Usar `/var/www/fabianosf_site` no servidor
- ✅ Ajustar permissões automaticamente
- ✅ Enviar os arquivos

### 3️⃣ Verificar

Acesse no navegador:
- http://92.113.33.16

## 🔧 O que foi alterado:

### `deploy.sh` (sua máquina)
- ✅ Agora usa `/var/www/fabianosf_site` no servidor
- ✅ Ajusta permissões automaticamente

### `configurar-servidor.sh` (servidor)
- ✅ Script novo para configurar tudo do zero
- ✅ Cria diretório em `/var/www`
- ✅ Configura Nginx completo
- ✅ Ajusta todas as permissões

## 📁 Estrutura Final:

**Sua máquina:**
- `/home/fabianosf/Downloads/fabianosf_site/` - Projeto local

**Servidor:**
- `/var/www/fabianosf_site/` - Arquivos do site (deploy)
- `/etc/nginx/sites-available/fabianosf_site` - Configuração Nginx

## 🔄 Para Atualizar no Futuro:

Apenas execute na sua máquina:
```bash
./deploy.sh
```

Tudo será atualizado automaticamente! 🎉

## 🐛 Troubleshooting

### Se der erro de permissão:

```bash
# No servidor
sudo chown -R fabianosf:www-data /var/www/fabianosf_site
sudo chmod -R 755 /var/www/fabianosf_site
```

### Se o Nginx não funcionar:

```bash
# Verificar logs
sudo tail -f /var/log/nginx/fabianosf_site-error.log

# Testar configuração
sudo nginx -t

# Reiniciar
sudo systemctl restart nginx
```

### Se precisar limpar e começar de novo:

```bash
# No servidor
sudo rm -rf /var/www/fabianosf_site
sudo rm /etc/nginx/sites-enabled/fabianosf_site
./configurar-servidor.sh
```

