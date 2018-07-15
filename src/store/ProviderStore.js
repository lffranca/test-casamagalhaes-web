import React from 'react'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'

import configureStore from './configureStore'

const {store, persistor} = configureStore()



const ProviderStore = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ProviderStore