import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initMotionCore } from './motion/motionCore';

let disposeMotionCore: (() => void) | null = null;
const startMotion = () => {
  if (disposeMotionCore) return;
  disposeMotionCore = initMotionCore();
};

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
};
const w = window as IdleWindow;
if (typeof w.requestIdleCallback === 'function') {
  w.requestIdleCallback(startMotion, { timeout: 2000 });
} else {
  setTimeout(startMotion, 200);
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    disposeMotionCore?.();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
