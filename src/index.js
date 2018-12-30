import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import './assets/styles.css'
import RootStore from './store/RootStore';

const rootStore = new RootStore();

ReactDOM.render(
    <Provider store={rootStore}>
        <App />
    </Provider>
    , document.getElementById('root'));
// registerServiceWorker();


