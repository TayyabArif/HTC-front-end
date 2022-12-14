export const createAccount = () => {
  return {
    title: 'Create Account',
    subtitle: 'Please populate the fields below to finish creating your account.',
    send: 'Create',
    placeholder: {
      firstName: 'Enter First Name',
      lastName: 'Enter Last Name',
      password: 'Enter New Password'
    },
    label: {
      firstName: 'First Name',
      lastName: 'Last Name',
      password: 'Password'
    },
    user_roles: {
      accounting: 'Accounting/AR',
      account_manager: 'Account Manager',
      administrator: 'Administrator',
      crew_member: 'Crew Member',
      crew_leader: 'Crew Leader',
      dispatcher: 'Dispatcher',
      field_supervisor: 'Field Supervisor',
      installer: 'Installer',
      manager: 'Manager',
      operations_manager: 'Operations Manager',
      owner: 'Owner',
      president: 'President',
      technician: 'Technician'
    },
    admin_roles: {
      accounting: 'Accounting/AR',
      account_manager: 'Account Manager',
      administrator: 'Administrator',
      dispatcher: 'Dispatcher',
      operations_manager: 'Operations Manager',
      owner: 'Owner',
      president: 'President'
    },
    email_notifications: {
      all_notifications: 'All Email Notifications'
    }
  }
}
