import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import Routes from './router/router.js';

const middleware = applyMiddleware(logger, thunk);

const createStoreWithMiddleware = (createStore(reducers, middleware));

ReactDOM.render(<Provider store={createStoreWithMiddleware}> <Routes /> </Provider>, document.getElementById('root'));