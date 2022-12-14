import React from 'react'
import Routes from './Routes'
import customTheme from './styles/mui_theme'
import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import './assets/fonts/Rubik-Regular.ttf'
import './assets/fonts/Rubik-Bold.ttf'
import './assets/fonts/Rubik-Light.ttf'

function App () {
  // Start Mock Service Worker if the app is running in test mode
  if (process.env.REACT_APP_STAGE === 'test') {
    const { worker } = require('./mocks/browser')
    worker.start()
  }

  return (
  <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <Routes />
      </ThemeProvider>
  </StyledEngineProvider>
  )
}

export default App
