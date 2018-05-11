import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import reducer from './redux/reducers';

import App from './App';
import rootSaga from './redux/sagas';

// Initializing to an empty object, but here is where you could
// preload your redux state with initial values (from localStorage, perhaps)
const preloadedState = {};
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const theme = createMuiTheme({
  palette: {
    primary: {
        light: '#757ce8',
        main: '#009688',
        dark: '#78909C',
        contrastText: '#ffff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#fff',
      },
    type:'dark',
  },
})

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </ MuiThemeProvider>  
  </Provider>,
  document.getElementById('react-root'),
);
