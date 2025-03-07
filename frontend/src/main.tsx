import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import 'dayjs/locale/ru';
import { DatesProvider } from '@mantine/dates'
import '@mantine/dates/styles.css'
import dayjs from 'dayjs';
import { UserContextProvider } from './contexts/UserContext.tsx';

dayjs.locale('ru')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <DatesProvider settings={{ locale: 'ru' }}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </DatesProvider>
    </MantineProvider>
  </StrictMode>,
)
