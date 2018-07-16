import React from 'react'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import io from 'socket.io-client'

import configureStore from './configureStore'
import {URL_SOCKET} from '../constants/url-constant'
import { EVENT_SOCKET_CONNECT, EVENT_SOCKET_CONNECT_ERROR, EVENT_SOCKET_ERROR, EVENT_SOCKET_DISCONNECT } from '../constants/socket-constant';
import { EVENT_CATEGORY_RECEIVE_ALL } from '../constants/category-constant';
import {getAllCategories} from '../actions/CategoryActions'

const {store, persistor} = configureStore()

const socket = io(URL_SOCKET)
const categorySocket = io(`${URL_SOCKET}/category`)

// EVENTS SOCKET
socket.on(EVENT_SOCKET_CONNECT, () => console.log(EVENT_SOCKET_CONNECT, socket.id))
socket.on(EVENT_SOCKET_CONNECT_ERROR, () => console.log(EVENT_SOCKET_CONNECT_ERROR))
socket.on(EVENT_SOCKET_ERROR, () => console.log(EVENT_SOCKET_ERROR))
socket.on(EVENT_SOCKET_DISCONNECT, () => console.log(EVENT_SOCKET_DISCONNECT))

// EVENTS SOCKET CATEGORY
categorySocket.on(EVENT_SOCKET_CONNECT, () => console.log(EVENT_SOCKET_CONNECT, categorySocket.id))
categorySocket.on(EVENT_SOCKET_CONNECT_ERROR, () => console.log(EVENT_SOCKET_CONNECT_ERROR))
categorySocket.on(EVENT_SOCKET_ERROR, () => console.log(EVENT_SOCKET_ERROR))
categorySocket.on(EVENT_SOCKET_DISCONNECT, () => console.log(EVENT_SOCKET_DISCONNECT))

categorySocket.on(EVENT_CATEGORY_RECEIVE_ALL, (data) => {
  console.log(EVENT_CATEGORY_RECEIVE_ALL, data, store)
  store.dispatch(getAllCategories(data))
})

export {categorySocket}

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