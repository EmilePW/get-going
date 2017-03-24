import {createStore} from 'redux';
import newApp from './reducers';

function allowPromiseDispatch(store) {
  const defaultDispatch = store.dispatch;
  return function(action) {
    if(typeof action.then === 'function') {
      return action.then(defaultDispatch);
    }
    return defaultDispatch(action);
  }
}

function configureStore() {
  const store = createStore(newApp);
  store.dispatch = allowPromiseDispatch(store);
  return store;
}

export default configureStore;
