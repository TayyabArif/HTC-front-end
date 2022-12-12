export const general = () => {
  return {
    labels: {
      cancel: 'Cancel',
      apply: 'Apply'
    },
    messages: {
      errors: {
        required: 'This field is required',
        email: 'It must be a valid email',
        password_does_not_match: 'The password does not match',
        no_sites_found: 'No results found.  Please check your search criteria.',
        size: 'File size can not exceed 25 MB',
        length_6: 'Field must be at least 6 characters long',
        phone: 'Invalid phone number',
        sign_in: 'Both fields are required to login.'
      },
      select_all: 'Select All',
      select: 'Select',
      time: 'Time'
    },
    priority_options: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    },
    report_day_options: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    },
    report_range_options: {
      daily: 'Daily',
      full_week: 'Full Week (7 days)',
      two_full_week: 'Two Full Weeks (14 days)',
      work_week: 'Work Week (5 days)',
      two_work_week: 'Two Work Weeks (10 days)',
      weekend: 'Weekend (2 days)',
      two_weekend: 'Two Weekends (4 days)',
      full_month: 'Full Month (~30 days)'
    },
    report_end_options: {
      never: 'Never',
      occurrences: 'Occurrences'
    },
    trades_options: {
      land: 'Land',
      maintenance: 'Maintenance',
      snow: 'Snow',
      sweep: 'Sweep',
      special: 'Special'
    }
  }
}
