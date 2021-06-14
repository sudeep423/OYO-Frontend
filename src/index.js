import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import userAuthReducer from './store/reducers/userAuth'
import hotelsReducer from './store/reducers/hotels'
import searchReducer from './store/reducers/search'
import hotel from './components/Hotels/Hotel/Hotel';
import hotelReducer from './store/reducers/hotel'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  hotels: hotelsReducer,
  search: searchReducer,
  hotel: hotelReducer

})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
