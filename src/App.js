import React from 'react'
import Routes from './Routes'
import customTheme from './styles/mui_theme'
import { ThemeProvider } from '@mui/material'
import './assets/fonts/Roboto-Regular.woff2'

function App () {
  // Start Mock Service Worker if the app is running in test mode
  if (process.env.REACT_APP_STAGE === 'test') {
    const { worker } = require('./mocks/browser')
    worker.start()
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Routes/>
    </ThemeProvider>
  )
}

export default App
