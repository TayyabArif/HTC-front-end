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

const Routes = () => {
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const redirectStore = useSelector(state => state.auth.redirect)

  const redirect = () => {
    return <Redirect to={redirectStore}/>
  }

  if (token && user) {
    return (
      <BrowserRouter>
        <Switch>
          <MainContainer>
            <Route exact path="/">
              {redirect()}
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/work-orders">
              <WorkOrders />
            </Route>
            <Route exact path="/locations">
              <Locations />
            </Route>
            <Route exact path="/company-settings">
              <CompanySettings />
            </Route>
            <Route exact path="/account-settings">
              <AccountSettings />
            </Route>
            <Route path='*'>
              <Redirect to={'/'}/>
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
            <Redirect to={'/sign-in'} />
          </Route>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path='/forgot-password/sent'>
            <ForgotPasswordEmailSent />
          </Route>
          <Route path="/forgot-password/code">
            <ForgotPasswordCode />
          </Route>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route exact path="/create-account">
            <CreateAccount />
          </Route>
          <Route path='*'>
            <Redirect to={'/'}/>
          </Route>
        </Switch>
      </BrowserRouter>)
  }
}

export default Routes
