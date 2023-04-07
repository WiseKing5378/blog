import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import 'normalize.css';
import Store from './Store';
import App from './Components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
