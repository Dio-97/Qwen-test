require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const MODEL = process.env.QWEN_MODEL || 'qwen-plus';
const API_BASE = 'https://dashscope.aliyuncs.com/api/v1';

// Leggi l'API Key dalle variabili d'ambiente
const API_KEY = process.env.DASHSCOPE_API_KEY;

if (!API_KEY) {
  console.error('❌ Errore: DASHSCOPE_API_KEY non configurato!');
  console.error('Configura la variabile d\'ambiente su Qwen Coder');
  process.exit(1);
}

const conversationHistory = [];

async function chat(userMessage) {
  try {
    // Aggiungi il messaggio dell'utente alla cronologia
    conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    // Fai la richiesta all'API di Qwen
    const response = await axios.post(
      `${API_BASE}/services/aigc/text-generation/generation`,
      {
        model: MODEL,
        messages: conversationHistory,
        temperature: 0.8,
        top_p: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const assistantMessage = response.data.output.choices[0].message.content;

    // Aggiungi la risposta dell'assistente alla cronologia
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage
    });

    return assistantMessage;
  } catch (error) {
    if (error.response) {
      console.error('❌ Errore API:', error.response.status, error.response.data);
    } else {
      console.error('❌ Errore:', error.message);
    }
    throw error;
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('🤖 Qwen Chat');
  console.log('━'.repeat(40));
  console.log('Digita i tuoi messaggi (scrivi "exit" per uscire)\n');

  const askQuestion = () => {
    rl.question('You: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('👋 Goodbye!');
        rl.close();
        return;
      }

      if (!input.trim()) {
        askQuestion();
        return;
      }

      try {
        const response = await chat(input);
        console.log(`\n✅ Qwen: ${response}\n`);
      } catch (error) {
        console.log('\n❌ Errore nella richiesta. Riprova.\n');
      }

      askQuestion();
    });
  };

  askQuestion();
}

main();
