import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import unleash from './services/unleash.js';

dotenv.config()

const app = express();
const port = 3000;

app.get('/visao-geral', async (req, res) => {
  const unleashResponse = await axios.get(process.env.UNLEASH_URL + '/client/features', {
    headers: {
      'Authorization': process.env.UNLEASH_TOKEN,
    },
  });
  
  const liberaAcessoVisaoGeral = unleashResponse.data.features.find((feature) => feature.name === "nova-visao-geral")?.enabled;
  
  if (liberaAcessoVisaoGeral) {
    res.json({ message: 'Nova visão geral!' });
  } else {
    res.json({ message: 'Visão geral antiga' });
  }
});

app.get('/gerar-relatorio', async (req, res) => {
  const liberaAcessoNovoRelatorio = await unleash.isEnabled('relatorio-com-fatura');
  
  if (liberaAcessoNovoRelatorio) {
    res.json({ message: 'Novo modelo de relatório' });
  } else {
    res.json({ message: 'Modelo antigo de relatório' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
