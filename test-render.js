import 'global-jsdom/register';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.tsx'; 

try {
  const html = renderToString(React.createElement(App));
  console.log("RENDER SUCCESS, length:", html.length);
} catch (e) {
  console.error("REACT RENDER ERROR:", e);
}
