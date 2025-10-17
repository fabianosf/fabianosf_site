# 🔥 Instruções de Configuração - Firebase e EmailJS

## 📋 Resumo da Implementação

Implementei com sucesso:
- ✅ **Firebase Firestore** para salvar os dados do formulário de contato
- ✅ **EmailJS** para enviar os dados para seu email (fabiano.freitas@gmail.com)
- ✅ **Botão flutuante do WhatsApp** com seu número (21) 99407-8286

---

## 🔧 Parte 1: Configurar Firebase

### 1. Criar projeto no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Adicionar projeto"** ou **"Create a project"**
3. Dê um nome ao projeto (ex: "portfolio-fabiano")
4. Siga as etapas até criar o projeto

### 2. Configurar Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"** ou **"Create database"**
3. Selecione **"Iniciar no modo de produção"**
4. Escolha a localização (recomendo: `southamerica-east1` - São Paulo)
5. Clique em **"Ativar"**

### 3. Configurar regras de segurança do Firestore

1. Na aba **"Regras"** do Firestore, cole o seguinte código:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      // Permite apenas criar novos documentos (write), não ler
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

2. Clique em **"Publicar"**

### 4. Obter credenciais do Firebase

1. No menu lateral, clique no ícone de **engrenagem** ⚙️ e depois em **"Configurações do projeto"**
2. Role até a seção **"Seus aplicativos"**
3. Clique no ícone **</>** (Web)
4. Dê um nome ao app (ex: "Portfolio Web")
5. Clique em **"Registrar app"**
6. Copie as credenciais que aparecem (apiKey, authDomain, projectId, etc.)

### 5. Adicionar credenciais no código

Abra o arquivo `src/config/firebase.js` e substitua as informações:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",              // Cole aqui
  authDomain: "seu-projeto.firebaseapp.com", // Cole aqui
  projectId: "seu-projeto-id",               // Cole aqui
  storageBucket: "seu-projeto.appspot.com",  // Cole aqui
  messagingSenderId: "123456789",            // Cole aqui
  appId: "seu-app-id"                        // Cole aqui
};
```

---

## 📧 Parte 2: Configurar EmailJS

### 1. Criar conta no EmailJS

1. Acesse: https://www.emailjs.com/
2. Clique em **"Sign Up"** e crie uma conta gratuita
3. Confirme seu email

### 2. Adicionar serviço de email

1. No dashboard, clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor de email (Gmail recomendado)
4. Conecte sua conta do Gmail (fabiano.freitas@gmail.com)
5. Copie o **Service ID** que aparece

### 3. Criar template de email

1. Clique em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Use este template:

**Subject:**
```
Nova mensagem do portfólio - {{from_name}}
```

**Content:**
```
Você recebeu uma nova mensagem do formulário de contato do seu portfólio:

Nome: {{from_name}}
Email: {{from_email}}

Mensagem:
{{message}}

---
Esta mensagem foi enviada através do seu portfólio.
```

4. Clique em **"Save"**
5. Copie o **Template ID**

### 4. Obter Public Key

1. Clique em **"Account"** no menu
2. Na seção **"API Keys"**, copie sua **Public Key**

### 5. Adicionar credenciais no código

Abra o arquivo `src/config/emailjs.js` e substitua:

```javascript
export const emailjsConfig = {
  serviceId: 'SEU_SERVICE_ID',      // Cole o Service ID aqui
  templateId: 'SEU_TEMPLATE_ID',    // Cole o Template ID aqui
  publicKey: 'SUA_PUBLIC_KEY'       // Cole a Public Key aqui
};
```

---

## 🎉 Testando a Implementação

### 1. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### 2. Testar o formulário

1. Acesse seu portfólio no navegador
2. Vá até a seção de contato
3. Preencha o formulário e envie
4. Você deve receber uma mensagem de sucesso

### 3. Verificar os dados

**No Firebase:**
1. Acesse o Firebase Console
2. Vá em "Firestore Database"
3. Você verá a coleção "contacts" com os dados enviados

**No Email:**
1. Verifique sua caixa de entrada (fabiano.freitas@gmail.com)
2. Você deve receber um email com os dados do formulário

### 4. Testar o botão do WhatsApp

1. No canto inferior direito do site, você verá um botão verde flutuante
2. Ao clicar, abrirá o WhatsApp com seu número
3. O botão tem animação de pulso e expande ao passar o mouse

---

## 🚀 Deploy

Quando fizer deploy do seu site (Vercel, Netlify, etc.), certifique-se de:

1. **Adicionar o domínio de produção no Firebase:**
   - Firebase Console → Authentication → Settings → Authorized domains
   - Adicione seu domínio (ex: seu-portfolio.vercel.app)

2. **Testar em produção:**
   - Após o deploy, teste o formulário novamente
   - Verifique se os dados chegam no Firestore e no email

---

## 📝 Observações Importantes

- ✅ Os dados do formulário são salvos no Firebase automaticamente
- ✅ Um email é enviado para fabiano.freitas@gmail.com
- ✅ O botão do WhatsApp abre direto no app/web com mensagem pré-definida
- ⚠️ O plano gratuito do EmailJS permite 200 emails/mês
- ⚠️ O plano gratuito do Firebase é mais do que suficiente para um portfólio

---

## 🐛 Resolução de Problemas

### Erro ao enviar formulário:
1. Verifique se as credenciais do Firebase estão corretas
2. Verifique se as credenciais do EmailJS estão corretas
3. Abra o console do navegador (F12) para ver erros específicos

### Email não chega:
1. Verifique a caixa de spam
2. Verifique se conectou o email correto no EmailJS
3. Teste o template diretamente no dashboard do EmailJS

### Botão do WhatsApp não funciona:
1. Verifique se está acessando via HTTPS (alguns navegadores bloqueiam em HTTP)
2. Teste em um dispositivo móvel com WhatsApp instalado

---

## 💡 Próximos Passos (Opcional)

- Adicionar Google Analytics para rastrear submissões
- Criar um painel admin para visualizar as mensagens
- Adicionar validação adicional no formulário
- Implementar captcha para evitar spam

---

Se tiver alguma dúvida durante a configuração, consulte:
- Firebase Docs: https://firebase.google.com/docs/firestore
- EmailJS Docs: https://www.emailjs.com/docs/

Boa sorte! 🚀

