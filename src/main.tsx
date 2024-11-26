import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { registerChartJS } from '@utils/chartJsSetup.ts';

// This function call is to register the chart.js component library
registerChartJS();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
