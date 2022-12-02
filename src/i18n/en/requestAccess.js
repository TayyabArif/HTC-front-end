export const requestAccess = () => {
  return {
    title: 'Request Access',
    subtitle_1: 'Please enter your company domain',
    company_domain: 'Company domain',
    next: 'Next',
    contact_us_instruction: 'Please follow the link below to contact us via email',
    call_us: 'or call us at ######',
    email_us: 'Email Us',
    first_name: 'First Name',
    last_name: 'Last Name',
    email_address: 'Email Address',
    request_access: 'Request Access',
    company_name: 'Company',
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
    messages: {
      errors: {
        invalid_domain_structure: 'Please enter a valid domain name',
        user_already_exists: 'Email Address Already Used'
      }
    }
  }
}
