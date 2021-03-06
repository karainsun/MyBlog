import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import storeData from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* compose的返回值还是一个函数，调用这个函数所传递的参数将会作为compose最后一个参数的参数，
 * 从而像’洋葱圈’似的，由内向外，逐步调用，所以最后返回的就是这样的一个函数：
 * compose(fn1, fn2, fn3) (...args) = > fn1(fn2(fn3(...args)))
 */
const myPersistReducer = persistReducer(persistConfig, storeData);
const store: any = createStore(
  myPersistReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);
export { store, persistor };
