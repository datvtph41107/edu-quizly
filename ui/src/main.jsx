import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from '~/components/GlobalStyles';
import { ContextProvider } from './context/ContextProvider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContextProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </ContextProvider>
    </StrictMode>,
);
