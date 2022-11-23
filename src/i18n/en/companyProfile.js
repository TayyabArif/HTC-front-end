export const companyProfile = () => {
  return {
    company_profile: 'Company Profile',
    info_insurance: 'Company Info & Insurance',
    clients_trades: 'Clients & Trades',
    service_area: 'Service Area',
    users: 'Users',
    continue: 'Continue',
    yes: 'Yes',
    no: 'No',
    none: 'None',
    weekdays: 'Monday - Friday',
    weekend: 'Saturday - Sunday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    labels: {
      company_legal: 'Company Name',
      upload: 'Upload company logo',
      country: 'Country(s) of Operation',
      entity: 'Legal Entity',
      business_hours: 'Business Hours Phone',
      dba: 'Comp. DBA',
      full_dba: 'Company (Doing Business As)',
      after_hours: 'After Hours Phone',
      headquarters: 'Company Headquarters',
      dispatch: 'Work Order Dispatch Email',
      invoice_email: 'A/P Invoice Email',
      address: 'Company Address',
      days_operation: 'Days of Operation',
      times_operation: 'Times of Operation',
      days_operation_after: 'After Hours Days Of Operation',
      times_operation_after: 'After Hours Times',
      upload_file: 'Upload file',
      ein: 'Company EIN Number (or equivalent)',
      state: 'State(s) Company is Registered',
      contractor_licence: 'Contractor License #',
      coi: 'COI Policy #',
      comp: 'Workers Comp Policy #',
      bank: 'Bank Name',
      account_number: 'Bank Account Number',
      routing_number: 'Bank Routing Number',
      trades: 'Choose your trade(s)',
      standard_rate: 'Standard Rate ($/hr)',
      emergency_rate: 'Emergency Rate ($/hr)',
      travel_cost: 'Travel Costs ($)',
      select_in_map:
        'Select your service area using the selections below.',
      no_users:
        'You have not added any other users for your company. {v1} will be unable to send you work without a service area.',
      incomplete_users:
        'There are remaining uncreated users. Would you like to continue?',
      web_users: 'Web Portal Users',
      add_web_users: 'Add More Web Portal Users',
      app_users: 'FieldTech Mobile Users',
      add_app_users: 'Add More FTC Mobile Users',
      created: 'Created',
      add_service_area: 'Add Service Area',
      loading: 'Uploading file...',
      email: 'Company Email'
    },
    placeholder: {
      company_legal: 'Enter company name',
      country: 'Select',
      entity: 'Select',
      business_hours: 'Enter normal business hours phone',
      dba: 'Enter company DBA',
      after_hours: 'Enter after hours phone',
      headquarters: 'Select',
      dispatch: 'Enter email',
      invoice_email: 'Enter invoice email',
      address: 'Enter address',
      ein: 'Enter company EIN#',
      select_required: 'Select',
      contractor_licence: 'Enter License #',
      coi: 'Enter COI policy #',
      comp: 'Enter Workers Comp Policy #',
      bank: 'Enter Bank Name',
      account_number: 'Enter Account Number',
      routing_number: 'Enter Routing Number',
      month: 'Month',
      year: 'Year',
      rate: 'Enter Rate $/hr',
      cost: 'Enter Cost $',
      no_service_area: 'Add your service area(s)',
      select_state: 'Select State',
      select_territory: 'Select Territory',
      select_city: 'Select City',
      select_county: 'Select County',
      select_country: 'Select Country',
      select_zip: 'Select zip code',
      search: 'Search',
      search_address: 'Search Address',
      mile_radius: 'mile radius',
      no_geo_coordinates: 'GeoCoordinates are coming soon',
      open: 'Open',
      close: 'Close'
    },
    message: {
      company_profile:
        'You can always come back and edit the information.'
    },
    upload: {
      w9: 'Upload your W9',
      coi: 'Upload your COI',
      comp: 'Upload your Workers Comp',
      void: 'Voided Bank Check'
    },
    questions: {
      support_hours: 'Do you provide 24 / 7 support?',
      trucks: 'How many company owned trucks do you have?',
      field_employees: 'How many field employees?',
      administrative_employees: 'How many administrative employees?',
      years: 'How many years has your company been in business?',
      subcontractors: 'Do you use subcontractors?',
      coi: 'When does your COI expire?',
      comp: 'Workers comp expiration date?',
      serve: 'What client(s) do you serve?'
    },
    clients: {
      commercial: 'Commercial',
      industrial: 'Industrial',
      educational: 'Educational',
      residential: 'Residential',
      property_preservation: 'Property Preservation',
      medical: 'Medical'
    },
    trades: {
      beverage_equipment: 'Beverage Equipment',
      disaster_relief: 'Disaster Relief',
      doors: 'Doors',
      fire_systems: 'Fire Systems',
      floor_care: 'Floor Care & Janitorial',
      flooring: 'Flooring - Repair/Replace',
      fuel_systems: 'Fuel Systems',
      gates: 'Gates/Grilles',
      glass: 'Glass',
      kitchen_quipment: 'Kitchen Equipment',
      landscaping: 'Landscaping',
      locks: 'Locks',
      parking_lot: 'Parking Lot',
      pest_control: 'Pest Control',
      refrigeration: 'Refrigeration',
      roof: 'Roof',
      snow_removal: 'Snow Removal',
      electrical: 'Electrical',
      plumbing: 'Plumbing',
      hvac: 'HVAC',
      general_maintenance: 'General Maintenance',
      appliances: 'Appliances',
      painting: 'Painting',
      carpentry: 'Carpentry'
    },
    services: {
      beverage_equipment: 'Beverage Equipment',
      disaster_relief: 'Disaster Relief',
      dock: 'Dock/Levelers',
      overhead_doors: 'Overhead Doors',
      doors: 'Doors',
      entrance_doors: 'Entrance Doors',
      fire_alarm: 'Fire Alarm',
      fire_extinguisher: 'Fire Extinguisher',
      fire_systems: 'Fire Systems',
      fire_back_flow: 'Fire Systems - Back Flow',
      floor_care: 'Floor Care',
      janitorial: 'Janitorial',
      windows: 'Windows',
      flooring: 'Flooring',
      automatic_tank: 'Automatic Tank Gauge',
      compressed_gas: 'Compressed Natural Gas',
      fuel_dispenser: 'Fuel Dispenser',
      fuel_environmental: 'Fuel Environmental',
      underground_storage: 'Underground Storage Tank',
      gates: 'Gates/Grilles',
      glass: 'Glass',
      film: 'Window Film',
      kitchen_equipment: 'Kitchen Equipment',
      exhaust_cleaning: 'Exhaust Hood Cleaning',
      landscaping: 'Landscaping',
      hardscaping: 'Hardscaping',
      irrigation: 'Irrigation',
      locks: 'Locks',
      safes: 'Safes',
      parking_lot: 'Parking Lot',
      pest_control: 'Pest Control',
      refrigeration: 'Refrigeration',
      roof: 'Roof',
      snow_removal: 'Snow Removal',
      exterior_lighting: 'Exterior Lighting',
      interior_lighting: 'Interior Lighting',
      exterior_signage: 'Exterior Signage',
      major_electrical: 'Major Electrical',
      generators: 'Generators',
      minor_electrical: 'Minor Electrical',
      back_flow: 'Back Flow',
      minor_plumbing: 'Minor Plumbing',
      water_systems: 'Water Systems',
      grease_traps: 'Grease Traps',
      septic: 'Septic',
      well_systems: 'Well Systems',
      major_plumbing: 'Major Plumbing',
      water_heater: 'Water Heater',
      hvac: 'HVAC',
      temperature_controls: 'Temperature Controls',
      concrete: 'Concrete',
      general_maintenance: 'General Maintenance',
      blinds: 'Blinds',
      fencing: 'Fencing/Gates',
      paint: 'Paint',
      foundation: 'Foundation',
      power_washing: 'Power washing',
      cabinets: 'Cabinets/Countertops',
      inspections: 'Inspections',
      fireplace: 'Fireplace/Chimney',
      appliances: 'Appliances',
      exterior_painting: 'Exterior Painting',
      interior_painting: 'Interior Painting',
      general_carpentry: 'General Carpentry',
      cabinets_carpentry: 'Cabinets',
      trim_work: 'Trim Work',
      tile: 'Tile'
    },
    area: {
      city: 'City',
      zip: 'Zip Code',
      county: 'County'
    },
    error: {
      email: 'The email address you entered is invalid.',
      file_size: "File size can't exceed $size$MB",
      hours_operation: 'Hours of operation are incorrect',
      general_error: 'There was a problem completing your request. Please contact your system administrator'
    }
  }
}
