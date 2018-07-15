import { createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import createAsyncEncryptor from 'redux-persist-transform-encrypt/async'

import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const asyncEncryptor = createAsyncEncryptor({
  secretKey: 'my-super-secret-key'
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Category'],
  transforms: [asyncEncryptor]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = createStore(persistedReducer, composeEnhancers())
  const persistor = persistStore(store)
  return { store, persistor }
}