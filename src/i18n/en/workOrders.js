export const workOrders = () => {
  return {
    search_placeholder: 'Search',
    export_selected: 'Export Selected',
    download_selected: 'Download selected',
    download_all: 'Download all',
    filter_counts: 'Show Counts',
    filter_sites: 'Use My Sites',
    advanced_button: 'Advanced Search',
    reset_button: 'Clear All Filters',
    counts: 'Counts',
    data_export: 'Data Export',
    open_invoice: 'Open Invoice',
    export_message:
      'This may take a few minutes.  We’ll email you the report once it’s finished.  Be sure to check your spam/junk folder.',
    date_ranges: {
      today: 'Today',
      yesterday: 'Yesterday',
      this_month: 'This Month',
      last_month: 'Last Month',
      last_two_months: 'Last Two Months',
      last_three_months: 'Last Three Months',
      last_six_months: 'Last Six Months'
    },
    wo_states: {
      open: 'Open',
      active: 'In Progress',
      returning: 'Returning',
      complete: 'Completed',
      completed: 'Completed',
      cancelled: 'Cancelled',
      expired: 'Expired',
      no_status: 'No Status',
      incomplete: 'Incomplete',
      in_progress: 'In Progress',
      no_work_order: 'No Work Order'
    },
    column_names: {
      client_name: 'Client Name',
      site_name: 'Location Name',
      priority: 'Priority',
      trade: 'Trade',
      service: 'Service',
      won: 'Work Order #',
      opendate: 'Start Date',
      duedate: 'End Date',
      wostat: 'WO Status',
      invoices: 'Invoice Status',
      external_id: 'Tracking Id'
    },
    advanced_fields: {
      state: 'State',
      city: 'City',
      site: 'Site name',
      wonum: 'Work order number',
      open_date: 'Work order open date',
      wodate: 'Work order date',
      past_due: 'Past Due',
      service: 'Service',
      trade: 'Trade',
      wo_status: 'Work order status',
      call_type: 'Work Order Type'
    },
    toggle_labels: {
      all: 'All',
      custom: 'Custom',
      not_selected: 'Not Selected',
      select_all: 'Select All'
    },
    details_fields: {
      open: 'Open',
      expiration: 'Expiration',
      priority: 'Priority',
      billing: 'Client Billing Method',
      type: 'Type',
      agreement: 'Agreement',
      trip: 'Trip',
      description: 'Description',
      no_call_type: 'Work Order Type Undefined'
    },
    missing_card: {
      trip_not_created: 'Trip Not Created',
      no_activities_found: 'No Activities found',
      no_activities_found_detail:
        'A trip for this work order has not been created.',
      empty_trip:
        'No new data has been found.  Field captured details update automatically after check in and check out.'
    },
    csv: {
      sitetitle: 'Site Name',
      sitesub: 'Site Location',
      city: 'Site City',
      state: 'Site State',
      trade: 'Trade',
      service: 'Service',
      pon: 'PO Number',
      won: 'WO Number',
      eta: 'ETA',
      opendate: 'Open Date',
      duedate: 'Due Date',
      call_type: 'Work Order Type',
      wostat: 'WO status',
      site_address: 'Site Address',
      site_zip: 'Site Zip',
      trip_num: 'Trip Number',
      checkin_ftc: 'Checkin FTC',
      checkout_ftc: 'Checkout FTC',
      checkin_web: 'Checkin Web',
      checkout_web: 'Checkout Web',
      tasks_ftc: 'Tasks FTC',
      photos_ftc: 'Photos FTC',
      tasks_web: 'Tasks Web'
    },
    trips: {
      origin: 'Source',
      eta: 'ETA',
      checkin: 'Clocked In',
      checkout: 'Clocked Out',
      no_checkin: 'Not clocked in',
      checklist: 'Tasks Performed',
      photos: 'Photos',
      photos_after: 'Photos After',
      photos_before: 'Photos Before',
      web_trip: 'Web Portal',
      mobile: 'Mobile',
      description: 'Trip Description',
      notes: 'Notes',
      signature: 'Signature',
      add_note: 'Add Note',
      photos_remaining: '{v1} Photos Remaining',
      one_photos_remaining: '1 Photo Remaining',
      mandatory: '(required)',
      fields_required: 'All fields in red are required to update the trip.',
      sign: 'sign off form',
      enter_signature_name: 'Enter signature name'
    },
    audit_card: {
      legend: 'Audit Trial will be coming soon!\nThank you for your patience.',
      work_order: 'Work Order',
      created: 'created',
      trip: 'Trip',
      has_created: 'has been created',
      eta_set: 'ETA is set for',
      check_in: 'The contractor has checked in',
      check_out: 'The contractor has checked out',
      has_changed: 'has changed to'
    },
    apply_advanced: 'Apply Search',
    activities: 'Activities',
    audit: 'Audit Trail',
    details: 'Details',
    due: 'Due',
    empty_message_title: 'Whoops...',
    empty_message:
      'There are no work orders in your account. Contact your Management company to get new work!',
    empty_message_filters:
      'Your search did not return any results. Check your search criteria and try again.',
    please: 'Please',
    try: 'try again',
    clear_search: 'Clear Search',
    checkin_message:
      'Field crews have not checked in.  Field captured details update automatically after check in and check out.',
    checkout_message: 'Field captured data will update automatically. ',
    expired_message:
      'The service appointment has expired due to no activity. Contact your representative if another service appointment is required.',
    cancelled_message:
      'The service appointment has been cancelled. There are no field services.',
    images_message:
      'Photos will update automatically once the field crews check out.',
    sort: 'Sort',
    clear: 'Clear',
    highest: 'Highest',
    lowest: 'Lowest',
    oldest: 'Oldest',
    newest: 'Newest',
    service_appointment: 'Service Appointment',
    field_service: 'Field Services',
    audit_trail: {
      created: 'Service Appt {v1} created',
      checkIn: 'Clocked In, FTC',
      checkOut: 'Clocked Out, FTC',
      eta: 'ETA Update',
      invoiceCreated: 'Invoice Created, Draft',
      submit: 'Invoice Submitted',
      decline: 'Invoice Declined',
      approve: 'Invoice Approved'
    },
    wo_details: {
      location: 'Location Name',
      address: 'Address',
      priority: 'Priority',
      start_date: 'Start Date',
      end_date: 'End Date',
      trade: 'Trade',
      services: 'Services',
      location_contacts: 'Location Contacts',
      notes: 'Notes',
      attachments: 'Attachments',
      nte: 'NTE'
    },
    upload_messages: {
      clock_in: 'Uploading check in log',
      clock_out: 'Uploading check out log',
      repair: 'Uploading {v1} form'
    }
  }
}
