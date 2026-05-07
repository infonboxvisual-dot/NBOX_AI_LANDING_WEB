import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initMotionCore } from './motion/motionCore';

const disposeMotionCore = initMotionCore();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    disposeMotionCore();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
