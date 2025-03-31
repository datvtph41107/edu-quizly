import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ContextProvider } from './context/ContextProvider.jsx';
import store from '~/features/features.jsx';
import GlobalStyles from '~/components/GlobalStyles';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ContextProvider>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </ContextProvider>
        </Provider>
    </StrictMode>,
);
