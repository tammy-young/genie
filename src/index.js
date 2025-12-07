import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux'
import reducer, { loadStateFromStorageAsync } from './reducer.js'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: reducer
});

loadStateFromStorageAsync().then(persistedState => {
  if (persistedState) {
    store.dispatch({ type: 'INIT_STATE', payload: persistedState });
  }
}).catch(err => {
  console.warn('Failed to load persisted state:', err);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
