import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../Routes'
import userEvent from '@testing-library/user-event'

/** Material UI **/
import { ThemeProvider } from '@mui/material'
import customTheme from '../../styles/mui_theme'

/** Components **/
import ForgotPasswordChanged from '../../pages/signIn/ForgotPasswordChanged'
import ForgotPassword from '../../pages/signIn/ForgotPassword'
import ForgotPasswordCode from '../../pages/signIn/ForgotPasswordCode'
import ForgotPasswordEmailSent from '../../pages/signIn/ForgotPasswordEmailSent'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}))

describe('Sign In tests', () => {
  const initialState = {
    auth: { token: null, user: null },
    loading: { loading: false }
  }
  const mockStore = configureStore()
  let store

  test('Test Sign in page', () => {
    store = mockStore(initialState)

    render(<Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <Routes/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>)

    const signInPage = screen.getByTestId('sign_in_page')
    expect(signInPage).toBeInTheDocument()

    const requestAccessBtn = screen.getByTestId('request_access_button')
    expect(requestAccessBtn).toBeInTheDocument()

    const forgotPassword = screen.getByTestId('forgot_password')
    expect(forgotPassword).toBeInTheDocument()

    const signInButton = screen.getByTestId('sign_in_button')
    expect(signInButton).toBeInTheDocument()
    expect(signInButton).toBeDisabled()
  })

  test('Test Forgot password page', () => {
    store = mockStore(initialState)

    render(<Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <Routes/>
          <ForgotPassword/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>)

    const forgotPasswordPage = screen.getByTestId('forgot_password_page')
    expect(forgotPasswordPage).toBeInTheDocument()

    const submitBtn = screen.getByTestId('submit_button')
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toBeDisabled()

    const backLogIn = screen.getByTestId('back_log_in')
    expect(backLogIn).toBeInTheDocument()
  })

  test('Test Forgot password code', () => {
    store = mockStore(initialState)

    render(<Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <Routes/>
          <ForgotPasswordCode/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>)

    const forgotPasswordCodePage = screen.getByTestId('forgot_password_code_page')
    expect(forgotPasswordCodePage).toBeInTheDocument()

    const submitBtn = screen.getByTestId('submit_button')
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toBeDisabled()
  })

  test('Test Forgot password Changed', () => {
    store = mockStore(initialState)

    render(<Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <Routes/>
          <ForgotPasswordChanged/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>)

    const forgotPasswordChangedPage = screen.getByTestId('forgot_password_changed_page')
    expect(forgotPasswordChangedPage).toBeInTheDocument()

    const logIn = screen.getByTestId('log_in')

    expect(logIn).toBeInTheDocument()
    userEvent.click(logIn)

    const signInPage = screen.getByTestId('sign_in_page')
    expect(signInPage).toBeInTheDocument()
  })

  test('Test Forgot password Email Sent', () => {
    store = mockStore(initialState)

    render(<Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <Routes/>
          <ForgotPasswordEmailSent/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>)

    const forgotPasswordChangedPage = screen.getByTestId('forgot_password_sent')
    expect(forgotPasswordChangedPage).toBeInTheDocument()

    const logIn = screen.getByTestId('log_in')

    expect(logIn).toBeInTheDocument()
    userEvent.click(logIn)

    const signInPage = screen.getByTestId('sign_in_page')
    expect(signInPage).toBeInTheDocument()
  })
})
