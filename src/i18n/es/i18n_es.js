import { signIn } from './signIn'
import { requestAccess } from './requestAccess'
import { requestAccessSent } from './requestAccessSent'
import { forgotPassword } from './forgotPassword'
import { forgotPasswordCode } from './forgotPasswordCode'
import { forgotPasswordChanged } from './forgotPasswordChanged'
import { general } from './general'
import { contactUs } from './contactUs'
import { contactUsSent } from './contactUsSent'
import { navBar } from './navBar'
import { dashboard } from './dashboard'
import { createAccount } from './createAccount'

export const i18nEs = () => {
  return {
    sign_in: signIn(),
    request_access: requestAccess(),
    request_access_sent: requestAccessSent(),
    forgot_password: forgotPassword(),
    forgot_password_code: forgotPasswordCode(),
    forgot_password_changed: forgotPasswordChanged(),
    contact_us: contactUs(),
    contact_us_sent: contactUsSent(),
    nav_bar: navBar(),
    dashboard: dashboard(),
    general: general(),
    create_account: createAccount()
  }
}
