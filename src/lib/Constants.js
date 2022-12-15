export const woStatusOptions = [
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

export const phoneRegex = /^((\([0-9]{3}\)[ -]?))*?[0-9]{3}[ -]?[0-9]{4}$/
export const mobileBreakpoint = 1150
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

export const navBarHeaderHeight = '60px'
