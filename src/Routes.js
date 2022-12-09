import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

/** Components **/
import ForgotPasswordEmailSent from './pages/signIn/ForgotPasswordEmailSent'
import ForgotPasswordCode from './pages/signIn/ForgotPasswordCode'

/** Sign in **/
import SignIn from './pages/signIn/SignIn'
import ForgotPassword from './pages/signIn/ForgotPassword'

/** Redux **/
import { useSelector } from 'react-redux'
import CreateAccount from './pages/createAccount/CreateAccount'

const Routes = () => {
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)

  if (token && user) {
    return (
          <BrowserRouter>
              <Switch>
                  <Route exact path="/">
                  </Route>
              </Switch>
          </BrowserRouter>
    )
  }
  return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to={'/sign-in'}/>
                </Route>
                <Route exact path="/forgot-password">
                    <ForgotPassword />
                </Route>
                <Route path='/forgot-password/sent'>
                    <ForgotPasswordEmailSent/>
                </Route>
                <Route path="/forgot-password/code">
                    <ForgotPasswordCode />
                </Route>
                <Route exact path="/sign-in">
                    <SignIn/>
                </Route>
                <Route exact path="/create-account">
                    <CreateAccount />
                </Route>
            </Switch>
        </BrowserRouter>)
}

export default Routes
