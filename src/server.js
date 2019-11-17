import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Main from './content/Main.jsx';
import article from './bazaar-article_49926.json';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/static', express.static('dist'));

app.get('/*', (req, res) => {
  const app = renderToString(<Main paragraphs={article.data.paragraphs || []} />);
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href='/static/main.css' />
      </head>
      <body>
        <div id="app">${app}</div>
        <script src="/static/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`😎 ${PORT}`);
});
