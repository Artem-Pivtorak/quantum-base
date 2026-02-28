import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { store, persistor } from './redux/store';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter> {/* змінено */}
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
);