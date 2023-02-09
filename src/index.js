import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import './i18n'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/index'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fal } from '@fortawesome/pro-light-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'

const container = document.getElementById('root')
const root = createRoot(container)
library.add(fal, fas, far)

root.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App/>
    </PersistGate>
</Provider>)
