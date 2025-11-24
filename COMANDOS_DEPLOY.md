# 🚀 Comandos para Deploy Manual

Execute estes comandos **um por vez** no terminal. Você precisará digitar a senha SSH algumas vezes.

## 1. Verificar se o build está pronto
```bash
ls -la dist/
```

## 2. Enviar index.html
```bash
scp dist/index.html fabianosf@92.113.33.16:/var/www/fabianosf_site/
```

## 3. Enviar favicon
```bash
scp dist/favicon.svg fabianosf@92.113.33.16:/var/www/fabianosf_site/
```

## 4. Enviar assets (CSS e JS)
```bash
scp -r dist/assets/* fabianosf@92.113.33.16:/var/www/fabianosf_site/assets/
```

## 5. Enviar imagens (incluindo a nova foto)
```bash
scp -r dist/images/* fabianosf@92.113.33.16:/var/www/fabianosf_site/images/
```

## 6. Ajustar permissões no servidor
```bash
ssh -t fabianosf@92.113.33.16 "sudo chown -R www-data:www-data /var/www/fabianosf_site && sudo chmod -R 755 /var/www/fabianosf_site && sudo find /var/www/fabianosf_site -type f -exec chmod 644 {} \;"
```

## 7. Verificar se funcionou
```bash
ssh fabianosf@92.113.33.16 "ls -lh /var/www/fabianosf_site/images/20161127_153951.jpg"
```

---

**Ou use o script automatizado:**
```bash
./deploy-manual-simples.sh
```

