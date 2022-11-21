import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

/** Sign in **/
import SignIn from './pages/signIn/SignIn'

/** Settings */
import AccountSettings from './pages/AccountSettings'

const Routes = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to={'/sign-in'}/>
          </Route>
          <Route exact path="/sign-in">
            <SignIn/>
          </Route>
            <Route exact path="/account-settings">
                <AccountSettings />
            </Route>
        </Switch>
      </BrowserRouter>)
}

export default Routes
