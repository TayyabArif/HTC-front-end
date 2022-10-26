import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './i18n'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
