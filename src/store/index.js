import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middlewares = [thunk];

export default createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
