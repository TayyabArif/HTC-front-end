import { render, screen, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
// import userEvent from '@testing-library/user-event'
import { store } from '../../store'

/** Material UI **/
import { ThemeProvider } from '@mui/material'
import customTheme from '../../styles/mui_theme'

/** Components **/
import CompanySettings from '../../pages/CompanySettings'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}))

jest.mock('../../store')

const initialState = {
  auth: {
    token: 'token',
    user: {
      scopes: 'company_settings.manage_access:write company_settings.users:create',
      userInfo: {
        name: 'test',
        profile_pic: 'test_pic',
        roles: [
          { name: 'testRole' }
        ],
        userCredentials: {
          email: 'testing@test.com'
        }
      }
    }
  },
  loading: { loading: false },
  services: { snackbar: true, snackmessage: 'test' }
}

// in this point store.getState is going to be mocked
store.getState = () => initialState

describe('Company Settings', () => {
  const mockStore = configureStore()

  // simulate window resize
  window.innerWidth = 1800
  window.dispatchEvent(new Event('resize'))

  test('Test Company settings', async () => {
    render(
      <Provider store={mockStore(initialState)}>
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <CompanySettings testingWidth={1800}/>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
    )

    const companySettingsPage = screen.getByTestId('company_settings_page')
    expect(companySettingsPage).toBeInTheDocument()

    const companyLogoCard = screen.getByTestId('logo_card')
    expect(companyLogoCard).toBeInTheDocument()

    const profileInfoCard = screen.getByTestId('profile_info_card')
    expect(profileInfoCard).toBeInTheDocument()

    const preferencesCard = screen.getByTestId('preferences_card')
    expect(preferencesCard).toBeInTheDocument()

    const supportCard = screen.getByTestId('support_card')
    expect(supportCard).toBeInTheDocument()

    const usersCard = screen.getByTestId('users_card')
    expect(usersCard).toBeInTheDocument()

    const companySupportCard = screen.getByTestId('roles_card')
    expect(companySupportCard).toBeInTheDocument()
  })
})
