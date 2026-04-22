# Portfólio Profissional - Fabiano Sousa de Freitas

Portfólio profissional desenvolvido em ReactJS com Vite e Tailwind CSS.

## 🚀 Tecnologias

- React 18
- Vite
- Tailwind CSS
- Lucide React (ícones)

## 📦 Instalação

```bash
npm install
```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 👨‍💻 Sobre

Site portfólio profissional destacando habilidades em:
- Análise de Dados
- Desenvolvimento Web
- Python, Django, Power BI
- Machine Learning

---

**"Transformando dados em decisões inteligentes."**

====================================================

## Manual do Bot WhatsApp — Fabiano Freitas
1. Quem o bot responde
Situação	Bot age?
Primeiro contato vindo pelo link do site ou anúncio (contém [site])	✅ Sim
Primeiro contato direto — amigo, familiar, desconhecido	❌ Não
Pessoa que já interagiu antes e manda mensagem de novo	✅ Sim
2. Horário de atendimento
Segunda a Sexta, das 8h às 18h (fuso de Brasília).

Fora desse horário o bot responde apenas:

"Recebi sua mensagem, mas estou fora do horário agora. O Fabiano responde pessoalmente assim que abrir."

3. Fluxo de menus

Cliente manda mensagem
        │
        ▼
  [Primeira vez?]
    ├── Sim → Envia saudação + Menu Principal
    └── Não → Continua no menu onde parou
        │
        ▼
   MENU PRINCIPAL
   1 — Site profissional
   2 — Tráfego pago (anúncios)
   3 — Pacote completo (site + anúncios)
   4 — Preços e pacotes
   5 — Portfólio
   6 — Falar com o Fabiano
Cada opção abre um submenu:

1 → Site → mostra o que inclui → opções: ver preços / portfólio / falar com Fabiano
2 → Tráfego → explica Facebook/Instagram/Google Ads → opções: preços / falar
3 → Pacote completo → explica site + anúncios → opções: preços / falar
4 → Preços → mostra tabela completa → opções: escolher Página de Captação / Site Profissional / Pacote / falar
5 → Portfólio → lista links dos sites entregues → opções: quero um assim / preços / falar
6 → Falar → silencia o bot por 24h e te notifica imediatamente
4. Palavras-chave que o bot reconhece
Além dos números, o bot entende mensagens com certas palavras:

Palavras	Bot responde com
oi, olá, bom dia, boa tarde...	Menu principal
site, página, landing, wordpress	Menu de sites
tráfego, anúncio, facebook, instagram, google, ads	Menu de tráfego pago
preço, valor, quanto, custa, pacote, plano	Menu de preços
portfólio, portfolio, exemplo, projeto	Menu de portfólio
falar, fabiano, atendente, humano	Conecta com você
prazo	Responde os prazos de entrega
parcela	Responde as formas de pagamento
garantia	Responde sobre suporte e ajustes
5. Quando você é notificado
Você recebe uma mensagem no seu próprio WhatsApp sempre que:

Cliente digita opção 6 (falar com Fabiano)
Cliente escolhe um pacote específico (Captação / Profissional / Completo)
Cliente bate o limite de 2 mensagens sem sentido (fallback automático)
Mensagem que você recebe:


🔔 Novo lead aguardando atendimento!
👤 Nome: [nome]
📱 Número: [número]
🎯 Interesse: [ex: site profissional]
🕐 Horário: [hora]
6. Modo humano
Quando o cliente escolhe falar com você, o bot silencia por 24 horas para aquele número. Depois das 24h, o bot volta a responder automaticamente caso o cliente mande outra mensagem.

7. Follow-ups automáticos
O bot acompanha leads que pararam de responder:

Quando	O que acontece
24h sem resposta após demonstrar interesse	Bot manda mensagem perguntando se ainda quer conversar
72h sem resposta	Bot manda última mensagem de despedida com o link do site
Só acontece dentro do horário comercial (Seg–Sex, 8h–18h).

8. Fallback (mensagem não reconhecida)
Se o cliente mandar 2 mensagens seguidas que o bot não entende, ele automaticamente:

Manda o menu de fallback simples
Te notifica como se fosse um lead novo
9. O que o bot salva de cada cliente
Nome do WhatsApp
Número
Interesse declarado (site / tráfego / pacote)
Último menu que visitou
Se já recebeu follow-up de 24h e 72h
Se está em atendimento humano
10. Para mudar qualquer coisa
O que mudar	Onde fica
Textos das mensagens	/home/fabianosf/whatsapp-bot/bot/menus.py
Horário de atendimento	menus.py → BOT_CONFIG
Tempo do modo humano (hoje 24h)	menus.py → pausa_humano_horas
Lógica do fluxo	/home/fabianosf/whatsapp-bot/bot/main.py
Após qualquer edição: docker compose restart bot no VPS.