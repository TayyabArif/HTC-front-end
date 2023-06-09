export const Routes = {
  SIGN_IN: {
    path: '/sign-in'
  },
  DASHBOARD: {
    path: '/dashboard'
  },
  FORGOT_PASSWORD: {
    path: '/forgot-password',
    SENT: {
      path: '/forgot-password/sent'
    },
    CODE: {
      path: '/forgot-password/code'
    }
  },
  CREATE_ACCOUNT: {
    path: '/create-account'
  },
  WORK_ORDERS: {
    path: '/work-orders'
  },
  COMPANY_SETTINGS: {
    path: '/company-settings'
  },
  ACCOUNT_SETTINGS: {
    path: '/account-settings'
  },
  LOCATIONS: {
    path: '/locations'
  }
}
export const woStatusOptions = [
  'open',
  'in_progress',
  'completed',
  'cancelled',
  'expired'
]

export const woPriorityOptions = [
  'open',
  'in_progress',
  'completed',
  'cancelled',
  'expired'
]

export const woFixedStatus = ['completed', 'cancelled']
export const inStatusOptions = [
  'open',
  'declined',
  'submitted',
  'approved',
  'draft'
]
export const invoiceStatusOptionsWOList = [
  'open',
  'declined',
  'submitted',
  'approved',
  'draft',
  'not_available'
]
export const NO_RECORD_ITEM = 'no service required'
export const invoiceApproved = 'approved'
export const invoiceSubmitted = 'submitted'
export const invoiceNotSubmitted = ['open', 'declined', 'draft']
export const legalEntities = [
  {
    label: 'Limited Liability Company (LLC)',
    value: 'LLC'
  },
  {
    label: 'C-Corporation',
    value: 'C-Corporation'
  },
  {
    label: 'S-Corporation',
    value: 'S-Corporation'
  },
  {
    label: 'Partnership (LLP)',
    value: 'LLP'
  },
  {
    label: 'Sole Proprietorship',
    value: 'Sole Proprietorship'
  }
]
export const reports = [
  { value: 'Open Work Orders (Count)', label: 'Open Work Orders (Count)' },
  {
    value: 'Completed Work Orders (Count)',
    label: 'Completed Work Orders (Count)'
  },
  {
    value: 'In Progress Work Orders (Count)',
    label: 'In Progress Work Orders (Count)'
  },
  { value: 'Open Work Orders By Trade', label: 'Open Work Orders By Trade' },
  {
    value: 'Completed Work Orders by Trade',
    label: 'Completed Work Orders by Trade'
  },
  { value: '% Open vs Complete', label: '% Open vs Complete' },
  { value: 'Average Age Of Work Orders', label: 'Average Age Of Work Orders' }
]

export const accesses = [
  { value: 'All Access', label: 'All Access' },
  { value: 'Administrator', label: 'Administrator' },
  { value: 'Company Admin', label: 'Company Admin' }
]

export const phoneRegex = /^((\([0-9]{3}\)[ -]?))*?[0-9]{3}[ -]?[0-9]{4}$/
export const mobileBreakpoint = 900
export const maxFileSize = 5
export const companyProfileFiles = ['w9', 'coi', 'comp', 'bank']

export const mapDateRangeOptions = [
  {
    id: 'today'
  },
  {
    id: 'last_3_days'
  },
  {
    id: 'last_5_days'
  },
  {
    id: 'last_7_days'
  },
  {
    id: 'last_30_days'
  },
  {
    id: 'custom'
  }
]

export const mapStatusOptions = [
  {
    id: 'all'
  },
  {
    id: 'open'
  },
  {
    id: 'in_progress'
  },
  {
    id: 'dispatched'
  },
  {
    id: 'returning'
  },
  {
    id: 'completed'
  },
  {
    id: 'canceled'
  }
]

export const AFStateOptions = [
  {
    label: '2x',
    value: 2
  },
  {
    label: '5x',
    value: 5
  },
  {
    label: '10x',
    value: 10
  },
  {
    label: '20x',
    value: 24
  }
]

export const navBarHeaderHeight = '100px'

export const navBarHeaderHeightMobile = '75px'

export const woSortOptions = [
  {
    id: 'work_order_a'
  },
  {
    id: 'work_order_z'
  },
  {
    id: 'status_a'
  },
  {
    id: 'status_z'
  },
  {
    id: 'priority_a'
  },
  {
    id: 'priority_z'
  },
  {
    id: 'tracking_a'
  },
  {
    id: 'tracking_z'
  },
  {
    id: 'none'
  }
]

export const locationsPerPage = 100

export const locationWorkOrdersPerPage = 25

export const profileCardLimits = {
  top: 1340,
  bottom: 1200
}

export const whiteImage =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export const defWorkColumns = [
  { id: 'location', visible: true },
  { id: 'priority', visible: true },
  { id: 'trade', visible: true },
  { id: 'service', visible: true },
  { id: 'wo_number', visible: true },
  { id: 'tracking', visible: true },
  { id: 'open_date', visible: true },
  { id: 'close_date', visible: true },
  { id: 'wo_status', visible: true }
]

export const isChrome = () => {
  const isChromium = window.chrome
  const winNav = window.navigator
  const vendorName = winNav.vendor
  const isOpera = typeof window.opr !== 'undefined'
  const isIEedge = winNav.userAgent.indexOf('Edg') > -1
  const isIOSChrome = winNav.userAgent.match('CriOS')

  if (isIOSChrome) {
    return true
  } else if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true
  } else {
    return false
  }
}

export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
)

export const locationNameLimit = 32

export const locationAddressLimit = 82
