import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

/** Sign in **/
import SignIn from './pages/signIn/SignIn'

/** Redux **/
import { useSelector } from 'react-redux'

/** Main Components */
import { MainContainer } from './components/MainContainer'
import Dashboard from './pages/Dashboard'
import WorkOrders from './pages/WorkOrders'

const Routes = () => {
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const redirect = useSelector(state => state.auth.redirect)

  if (token && user) {
    return (
      <MainContainer>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect
                to={redirect?.redirect ? redirect.redirect : '/work-orders'}
              />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/work-orders">
              <WorkOrders />
            </Route>
          </Switch>
        </BrowserRouter>
      </MainContainer>
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
        </Switch>
      </BrowserRouter>)
  }
}

export default Routes
