import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

import { router } from './app/router';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
