# 🎯 GUIA COMPLETO - Configuração Firebase e EmailJS

**Tempo estimado:** 15 minutos
**Dificuldade:** Fácil ⭐⭐☆☆☆

---

## 📍 VOCÊ ESTÁ AQUI

```
[✅ Código implementado] → [⏳ Configurar Firebase] → [⏳ Configurar EmailJS] → [✅ Testar]
                              ↑ VOCÊ ESTÁ AQUI
```

---

# PARTE 1: FIREBASE (10 minutos)

## 🔥 Passo 1.1: Acessar Firebase Console

1. **Abra uma nova aba no navegador**
2. **Acesse:** https://console.firebase.google.com/
3. **Faça login com:** fabiano.freitas@gmail.com
4. **Aguarde carregar o console**

✅ Você deve ver a tela inicial do Firebase Console

---

## 🔥 Passo 1.2: Criar Novo Projeto

1. Clique no botão **"Adicionar projeto"** ou **"Add project"** (botão grande no centro)
2. **Nome do projeto:** Digite `portfolio-fabiano` (pode ser qualquer nome)
3. Clique em **"Continuar"**
4. **Google Analytics:** DESMARQUE a opção (não precisamos)
5. Clique em **"Criar projeto"**
6. **Aguarde 30-60 segundos** (aparece uma animação de loading)
7. Quando terminar, clique em **"Continuar"**

✅ Agora você está dentro do seu projeto!

---

## 🔥 Passo 1.3: Ativar Firestore Database

### No menu lateral ESQUERDO:

1. Procure e clique em **"Firestore Database"** 
   - (ícone de banco de dados, geralmente no meio do menu)
2. Clique no botão **"Criar banco de dados"** ou **"Create database"**
3. **Localização:** 
   - Selecione **"southamerica-east1 (São Paulo)"**
   - Se não encontrar, escolha qualquer opção da América do Sul
4. **Modo de segurança:**
   - Selecione **"Iniciar no modo de produção"**
   - (Production mode)
5. Clique em **"Ativar"** ou **"Enable"**
6. **Aguarde 1-2 minutos** (criando o banco de dados)

✅ Você verá a tela do Firestore com "Nenhum documento ainda"

---

## 🔥 Passo 1.4: Configurar Regras de Segurança

### Ainda na tela do Firestore:

1. Clique na aba **"Regras"** ou **"Rules"** (no topo da tela)
2. Você verá um editor de código
3. **APAGUE TUDO** que está lá
4. **COPIE E COLE** exatamente este código:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

5. Clique no botão **"Publicar"** ou **"Publish"** (canto superior)
6. Aguarde a mensagem de sucesso

✅ Regras configuradas! Agora vamos pegar as credenciais.

---

## 🔥 Passo 1.5: Registrar App Web e Obter Credenciais

### Voltar para a visão geral do projeto:

1. Clique no ícone de **casa** 🏠 no menu lateral (ou "Visão geral do projeto")
2. Na tela principal, você verá: **"Comece adicionando o Firebase ao seu app"**
3. Clique no ícone **</>** (símbolo de código HTML - é o terceiro botão)
4. **Apelido do app:** Digite `Portfolio Web`
5. **Firebase Hosting:** DEIXE DESMARCADO (não marque)
6. Clique em **"Registrar app"**

### IMPORTANTE - Copiar Credenciais:

Você verá um código JavaScript parecido com isso:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnop",
  authDomain: "portfolio-fabiano-12345.firebaseapp.com",
  projectId: "portfolio-fabiano-12345",
  storageBucket: "portfolio-fabiano-12345.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 📋 COPIE ESSAS 6 LINHAS:

**Use um bloco de notas ou arquivo de texto temporário e cole:**

```
apiKey: [COLE AQUI]
authDomain: [COLE AQUI]
projectId: [COLE AQUI]
storageBucket: [COLE AQUI]
messagingSenderId: [COLE AQUI]
appId: [COLE AQUI]
```

7. Depois de copiar, clique em **"Continuar no console"**

✅ **Firebase configurado!** Guarde essas credenciais. Vamos usá-las daqui a pouco.

---

# PARTE 2: EMAILJS (10 minutos)

## 📧 Passo 2.1: Criar Conta no EmailJS

1. **Abra uma NOVA aba no navegador**
2. **Acesse:** https://www.emailjs.com/
3. Clique em **"Sign Up"** (canto superior direito)
4. Preencha:
   - **Email:** fabiano.freitas@gmail.com
   - **Password:** (crie uma senha - DIFERENTE do Google!)
5. Clique em **"Create Account"**
6. **IMPORTANTE:** Abra seu email e clique no link de confirmação
7. Volte para o EmailJS e faça login

✅ Você está no Dashboard do EmailJS

---

## 📧 Passo 2.2: Conectar Gmail

### No Dashboard do EmailJS:

1. No menu lateral ESQUERDO, clique em **"Email Services"**
2. Clique no botão **"Add New Service"** (botão azul)
3. Selecione **"Gmail"** (primeiro da lista)
4. Clique em **"Connect Account"**
5. **Faça login com:** fabiano.freitas@gmail.com
6. **Autorize** o EmailJS a enviar emails
7. De volta ao EmailJS, você verá:
   - **Service ID:** algo como `service_abc1234`
   
### 📋 COPIE o Service ID:

```
Service ID: [COLE AQUI]
```

8. Clique em **"Create Service"**

✅ Gmail conectado!

---

## 📧 Passo 2.3: Criar Template de Email

### No Dashboard do EmailJS:

1. No menu lateral, clique em **"Email Templates"**
2. Clique em **"Create New Template"** (botão azul)

### Configure o template exatamente assim:

**Subject (Assunto):**
```
Nova mensagem do portfólio - {{from_name}}
```

**Content (Conteúdo) - COPIE E COLE EXATAMENTE:**
```
Olá Fabiano,

Você recebeu uma nova mensagem através do formulário de contato!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nome: {{from_name}}
📧 Email: {{from_email}}

💬 Mensagem:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Esta mensagem foi enviada através do seu portfólio.
Responda diretamente para: {{from_email}}
```

**Settings (Configurações):**
- **From Name:** `{{from_name}}`
- **From Email:** `{{from_email}}`
- **To Email:** `fabiano.freitas@gmail.com` ← IMPORTANTE!
- **To Name:** `Fabiano Freitas`

3. Clique em **"Save"** (canto superior direito)
4. Você verá o **Template ID** (algo como: `template_xyz5678`)

### 📋 COPIE o Template ID:

```
Template ID: [COLE AQUI]
```

✅ Template criado!

---

## 📧 Passo 2.4: Obter Public Key

### No Dashboard do EmailJS:

1. No menu lateral, clique em **"Account"**
2. Procure a seção **"API Keys"**
3. Você verá **"Public Key"** (algo como: `abc123DEF456`)

### 📋 COPIE a Public Key:

```
Public Key: [COLE AQUI]
```

✅ **EmailJS configurado!**

---

# PARTE 3: INSERIR CREDENCIAIS NO CÓDIGO

## 📝 Agora você deve ter 9 valores copiados:

### Do Firebase (6 valores):
- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId

### Do EmailJS (3 valores):
- Service ID
- Template ID
- Public Key

---

## 📝 Passo 3.1: Configurar Firebase no Código

Volte para o Cursor/Editor e:

1. Abra o arquivo: **`src/config/firebase.js`**
2. Cole suas credenciais do Firebase

**Exemplo:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnop",           // ← Cole seu apiKey
  authDomain: "portfolio-fabiano-12345.firebaseapp.com",  // ← Cole seu authDomain
  projectId: "portfolio-fabiano-12345",                    // ← Cole seu projectId
  storageBucket: "portfolio-fabiano-12345.firebasestorage.app", // ← Cole seu storageBucket
  messagingSenderId: "123456789012",                       // ← Cole seu messagingSenderId
  appId: "1:123456789012:web:abcdef1234567890"            // ← Cole seu appId
};
```

3. **Salve o arquivo** (Ctrl+S)

---

## 📝 Passo 3.2: Configurar EmailJS no Código

1. Abra o arquivo: **`src/config/emailjs.js`**
2. Cole suas credenciais do EmailJS

**Exemplo:**
```javascript
export const emailjsConfig = {
  serviceId: 'service_abc1234',      // ← Cole seu Service ID
  templateId: 'template_xyz5678',    // ← Cole seu Template ID
  publicKey: 'abc123DEF456ghi789'    // ← Cole sua Public Key
};
```

3. **Salve o arquivo** (Ctrl+S)

✅ **Tudo configurado no código!**

---

# PARTE 4: TESTAR (2 minutos)

## 🧪 Passo 4.1: Rodar o Projeto

No terminal do Cursor:

```bash
npm run dev
```

Aguarde o servidor iniciar. Você verá algo como:
```
➜  Local:   http://localhost:3000/
```

---

## 🧪 Passo 4.2: Testar no Navegador

1. **Abra:** http://localhost:3000
2. **Role** até a seção "Contato"
3. **Preencha o formulário:**
   - Nome: `Teste Sistema`
   - Email: `teste@exemplo.com`
   - Mensagem: `Testando integração Firebase e EmailJS`
4. **Clique em "Enviar Mensagem"**
5. **Aguarde** alguns segundos

### ✅ Se funcionou:
- Você verá: **"✓ Mensagem enviada com sucesso!"**
- O formulário será limpo automaticamente

### ❌ Se deu erro:
- Você verá: **"✗ Erro ao enviar mensagem..."**
- Abra o Console do navegador (F12) e veja o erro
- Verifique se as credenciais foram copiadas corretamente

---

## 🧪 Passo 4.3: Verificar Recebimento

### Verificar no Firebase:

1. Volte para o **Firebase Console**
2. Vá em **Firestore Database**
3. Você verá uma coleção chamada **"contacts"**
4. Clique nela e verá o documento com os dados do teste

### Verificar no Email:

1. Abra **Gmail:** https://gmail.com
2. Login: fabiano.freitas@gmail.com
3. Procure por: **"Nova mensagem do portfólio - Teste Sistema"**
4. Abra o email e confirme que os dados estão corretos

### Testar WhatsApp:

1. No site, procure o **botão verde flutuante** no canto inferior direito
2. Clique nele
3. Deve abrir o WhatsApp com seu número: (21) 99407-8286

✅ **TUDO FUNCIONANDO!** 🎉

---

# 🎊 PARABÉNS!

Seu portfólio agora tem:
- ✅ Backend real com Firebase
- ✅ Emails automáticos chegando no seu Gmail
- ✅ Botão do WhatsApp funcionando
- ✅ Sistema profissional completo

---

# 📋 Checklist Final

- [ ] Firebase projeto criado
- [ ] Firestore ativado
- [ ] Regras de segurança configuradas
- [ ] Credenciais do Firebase copiadas
- [ ] EmailJS conta criada
- [ ] Gmail conectado no EmailJS
- [ ] Template de email criado
- [ ] Credenciais do EmailJS copiadas
- [ ] Arquivo `firebase.js` configurado
- [ ] Arquivo `emailjs.js` configurado
- [ ] Testado localmente - formulário envia
- [ ] Verificado Firebase - dados salvos
- [ ] Verificado Gmail - email recebido
- [ ] Testado botão WhatsApp

---

# 🆘 Problemas? Soluções Rápidas

## ❌ "Firebase: Error (auth/invalid-api-key)"
→ Credenciais do Firebase incorretas. Verifique `src/config/firebase.js`

## ❌ "EmailJS - User not found"
→ Credenciais do EmailJS incorretas. Verifique `src/config/emailjs.js`

## ❌ Email não chega
→ Verifique:
1. Caixa de spam no Gmail
2. Se o email `fabiano.freitas@gmail.com` está no campo "To Email" do template

## ❌ "PERMISSION_DENIED" no Firebase
→ Regras do Firestore incorretas. Volte ao Passo 1.4

## ❌ Console mostra erro de CORS
→ No Firebase Console:
1. Authentication → Settings → Authorized domains
2. Adicione `localhost`

---

# 🚀 Próximo Passo: Deploy

Quando tudo funcionar localmente, faça o deploy:

**Vercel (Recomendado):**
```bash
npm install -g vercel
vercel login
vercel
```

**⚠️ Depois do deploy:**
- Adicione seu domínio de produção nos "Authorized domains" do Firebase

---

**Tempo total:** ~25 minutos
**Custo:** R$ 0,00
**Resultado:** Portfolio profissional full-stack! 🎊

Boa sorte! 🚀

