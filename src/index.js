import React from 'react';
import App from './App';
import './index.css';
import { HashRouter } from "react-router-dom";




//渲染App到页面
import {
  createRoot
} from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HashRouter>
  <App />
</HashRouter>);