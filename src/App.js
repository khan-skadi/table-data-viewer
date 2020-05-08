import React from 'react';
import configureStore from './store/configureStore.js';
import { Provider } from 'react-redux';
import Dashboard from './components/Dashboard.js';
import './App.css';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;
