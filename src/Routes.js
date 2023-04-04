import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

/** Components **/
import ForgotPasswordEmailSent from './pages/signIn/ForgotPasswordEmailSent'
import ForgotPasswordCode from './pages/signIn/ForgotPasswordCode'
import CreateAccount from './pages/createAccount/CreateAccount'

/** Sign in **/
import SignIn from './pages/signIn/SignIn'
import ForgotPassword from './pages/signIn/ForgotPassword'

/** Redux **/
import { useSelector } from 'react-redux'

/** Main Components */
import { MainContainer } from './components/MainContainer'
import Dashboard from './pages/Dashboard'
import WorkOrders from './pages/WorkOrders'
import Locations from './pages/Locations'
import CompanySettings from './pages/CompanySettings'
/** Settings */
import AccountSettings from './pages/AccountSettings'

/** Utils */
import { Routes as MainRoutes } from './lib/Constants'

const Routes = () => {
  // const token = useSelector(state => state.auth.token)
  // const user = useSelector(state => state.auth.user)
  const redirectStore = useSelector(state => state.auth.redirect)
  const myToken = 1

  const redirect = () => {
    return <Redirect to={redirectStore} />
  }
  // changed
  if (myToken === 1) {
    return (
      <BrowserRouter>
        <Switch>
          <MainContainer>
            <Route exact path="/">
              {redirect()}
            </Route>
            <Route exact path={MainRoutes.DASHBOARD.path}>
              <Dashboard />
            </Route>
            <Route exact path={MainRoutes.WORK_ORDERS.path}>
              <WorkOrders />
            </Route>
            <Route exact path={MainRoutes.LOCATIONS.path}>
              <Locations />
            </Route>
            <Route exact path={MainRoutes.COMPANY_SETTINGS.path}>
              <CompanySettings />
            </Route>
            <Route exact path={MainRoutes.ACCOUNT_SETTINGS.path}>
              <AccountSettings />
            </Route>
            <Route path="*">
              <Redirect to={'/'} />
            </Route>
          </MainContainer>
        </Switch>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to={MainRoutes.SIGN_IN.path} />
          </Route>
          <Route exact path={MainRoutes.SIGN_IN.path}>
            <SignIn />
          </Route>
          <Route exact path={MainRoutes.FORGOT_PASSWORD.path}>
            <ForgotPassword />
          </Route>
          <Route path={MainRoutes.FORGOT_PASSWORD.SENT.path}>
            <ForgotPasswordEmailSent />
          </Route>
          <Route path={MainRoutes.FORGOT_PASSWORD.CODE.path}>
            <ForgotPasswordCode />
          </Route>
          <Route exact path={MainRoutes.SIGN_IN.path}>
            <SignIn />
          </Route>
          <Route exact path={MainRoutes.CREATE_ACCOUNT.path}>
            <CreateAccount />
          </Route>
          <Route path="*">
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes
