# bookings-cart

> Widget to view G Adventures bookings that are in-progress, optioned and confirmed

[![NPM](https://img.shields.io/npm/v/bookings-cart.svg)](https://www.npmjs.com/package/bookings-cart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bookings-cart
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line
import polyfill from 'babel-polyfill'

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import {Cart, cartReducer, cartSaga} from 'bookings-cart';


const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        bookings: cartReducer
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(cartSaga)

ReactDOM.render(
    <Provider store={store}>
        <Cart/>
    </Provider>,
    document.getElementById('root')
);
```

## Preview: 
[]()


## License

MIT © [gadventures](https://github.com/gadventures)
