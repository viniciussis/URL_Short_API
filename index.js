import express, { json } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const APIUrl = 'https://cleanuri.com/api/v1/shorten';

app.use(cors());
app.use(json());

app.post('/shorten', async (req, res) => {
  try {
    const response = await fetch(APIUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: req.body.url }),
    });
    const data = await response.json();
    res.json({ result_url: data.result_url });
  } catch (error) {
    console.error('Failed to short link: ', error);
    res.status(500).json({ error: 'Failed to shorten link' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});