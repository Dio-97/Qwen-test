# 🤖 Qwen Chat Test

Applicazione di chat con Qwen integrata in Qwen Coder.

## ⚙️ Setup su Qwen Coder

### 1️⃣ Aggiungi le Variabili d'Ambiente

Su **coder.qwen.ai/setting/caenvironment/**:

- **Nome variabile:** `DASHSCOPE_API_KEY`
- **Valore:** Il tuo API Key di Qwen

Clicca **"Aggiungi variabile"** ➕

### 2️⃣ Installa le dipendenze

```bash
npm install
```

### 3️⃣ Avvia l'app

```bash
npm start
```

## 💬 Utilizzo

Digita i tuoi messaggi e riceverai risposte da Qwen:

```
You: Ciao, come stai?
✅ Qwen: Ciao! Sto bene, grazie...

You: exit
👋 Goodbye!
```

## 📦 Dipendenze

- `axios` - Per le richieste HTTP all'API Qwen
- `dotenv` - Per gestire le variabili d'ambiente

## 🚀 Deploy su Xiaomi Mi Pad 6S

1. Clona il repository
2. Installa Node.js
3. Esegui `npm install`
4. Configura `DASHSCOPE_API_KEY` nell'ambiente
5. Avvia con `npm start`

---

**Creato da:** Dio-97  
**Data:** 2026-05-06
