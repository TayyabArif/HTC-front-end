export const accountSettings = () => {
  return {
    title: 'Account Settings',
    info_card: {
      title: 'Account Details',
      new_user_title: 'New User',
      name: 'Name',
      first_name: 'First name',
      last_name: 'Last name',
      email: 'Email Address',
      username: 'Username',
      company_role: 'Role',
      employee_id: 'Employee ID',
      phone_number: 'Phone Number',
      portal_access_level: 'Portal Access Level',
      password: 'Password',
      password_confirm: 'Password Confirm',
      profile_pic: 'Profile Pic',
      user_title: 'Title',
      access_type: 'Access Type',
      access: 'Access',
      placeholder_first: 'Enter first',
      placeholder_last: 'Enter last',
      placeholder_email: 'Enter email address',
      placeholder_phone: 'Enter phone',
      placeholder_username: 'Create username',
      placeholder_pass: 'Create password',
      placeholder_repass: 'Re-enter password',
      placeholder_employee: 'Enter ID'
    },
    form: {
      save: 'Save',
      edit: 'Edit',
      add: 'Add profile photo',
      enter: 'Enter',
      username_chars: '(at least 6 characters)',
      create: 'Create'
    },
    messages: {
      errors: {
        required: 'Mandatory Field.',
        email: 'Invalid email.',
        phone: 'Invalid phone number.',
        password: 'Password must be at least 6 characters.',
        username_taken: 'Username already taken',
        email_taken: 'Email already taken',
        password_match: 'Passwords do not match.'
      }
    }
  }
}
