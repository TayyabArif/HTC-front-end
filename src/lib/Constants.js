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

export const navBarHeaderHeight = '60px'
