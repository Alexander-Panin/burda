import React from 'react';
import ReactDom from 'react-dom';
import Main from './content/Main';
import article from './bazaar-article_49926.json'

ReactDom.hydrate(
  <Main paragraphs={article.data.paragraphs || []} />,
  document.getElementById('app')
);
