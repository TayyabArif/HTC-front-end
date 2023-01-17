import { makeStyles } from '@mui/styles'

export const companySettingsStyles = makeStyles(theme => ({
  '@global': {
    '.pac-container': {
      zIndex: '999999 !important',
      width: '303px !important'
    }
  },
  container: {
    padding: '0px',
    margin: '0px',
    maxWidth: '100%',
    width: '100%',
    height: '400px',
    backgroundColor: theme.colors.complianceBlue
  },
  cardsContainer: {
    gap: '50px',
    margin: '0px 47px',
    [theme.breakpoints.down('lg')]: {
      display: 'inline'
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex'
    }
  },
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    marginBottom: '16px',
    padding: '10px 10px 1em 1em'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: theme.colors.text,
    padding: '24px 0px 30px 47px'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '900',
    color: theme.colors.text
  },
  avatar: {
    width: '140px',
    height: '140px',
    '&.MuiAvatar-img': {
      objectFit: 'contain'
    }
  },
  emptyAvatar: {
    width: '140px',
    height: '140px',
    backgroundColor: 'white',
    border: '4px solid black'
  },
  editButton: {
    marginLeft: 'auto',
    marginRight: '0',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    lineHeight: '19px'
  },
  dialog: {
    width: '80%'
  },
  saveButton: {
    background: theme.colors.iconBlue,
    color: 'white',
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '36px',
    width: '160px',
    alignSelf: 'flex-end',
    marginRight: '84px',
    marginBottom: '37px',
    marginTop: '48px'
  },
  editComponent: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '70%',
      minWidth: '70%'
    },
    '& .MuiDialogContent-root': {
      padding: '0px'
    }
  },
  error: {
    color: theme.colors.workOrderColors.no_work_order
  },
  compliant: {
    color: theme.colors.workOrderColors.approved
  },
  dialogTitle: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  dialogText: {
    fontSize: '18px',
    fontWeight: '500'
  },
  background: {
    maxWidth: '100%',
    backgroundColor: theme.colors.complianceBlue,
    height: '400px',
    position: 'absolute',
    top: 0,
    zIndex: -1
  },
  uploadButton: {
    borderRadius: '100px',
    width: '152px',
    height: '36px',
    fontSize: '12px',
    fontWeight: '400',
    color: theme.colors.text,
    backgroundColor: theme.colors.signInButton.background,
    textTransform: 'none'
  },
  labelUpload: {
    textAlign: 'center',
    padding: '10px',
    margin: 'auto 0px auto 25px'
  }
}))

export const areaServiceFilterStyles = makeStyles(theme => ({
  noTopPadding: {
    paddingLeft: 15
  },
  topPadding: {
    paddingTop: 10
  },
  saveButton: {
    color: 'white',
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    borderRadius: '100px',
    alignSelf: 'flex-end',
    marginTop: '10px',
    backgroundColor: theme.colors.iconBlue
  },
  multiselectContent: {
    borderColor: theme.colors.buttonGrey,
    border: '1px solid',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8
  },
  multiselectZip: {
    maxHeight: 375,
    overflow: 'auto'
  },
  selector: {
    fontSize: '12px',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px',
    textTransform: 'none',
    width: '100%',
    justifyContent: 'flex-start'
  }
}))

export const clientsComponentStyles = makeStyles(theme => ({
  infoContainer: {
    fontSize: '14px',
    fontWeight: '600',
    paddingTop: '24px'
  },
  itemContainer: {
    padding: '24px 80px 0px 80px',
    [theme.breakpoints.down('md')]: {
      padding: '24px 0 0 0'
    }
  },
  noTopPadding: {
    paddingLeft: '80px',
    paddingRight: '80px',
    [theme.breakpoints.down('md')]: {
      padding: '0'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '24px',
    letterSpacing: '0.05em'
  },
  title_secondary: {
    fontSize: '16px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '19px',
    letterSpacing: '0.05em',
    marginLeft: '80px',
    marginTop: '36px'
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '17px',
    color: theme.colors.black,
    paddingTop: '9px',
    letterSpacing: '0em'
  },
  checkboxes: {
    gridGap: '27px',
    [theme.breakpoints.down('md')]: {
      gridGap: '12px'
    }
  },
  required: {
    color: theme.colors.errorText
  }
}))

export const companyProfileStyles = makeStyles(theme => ({
  infoContainer: {
    fontSize: '14px',
    fontWeight: '600',
    paddingTop: '24px'
  },
  itemContainer: {
    padding: '24px 80px 0px 80px',
    [theme.breakpoints.down('md')]: {
      padding: '24px 0 0 0'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '24px',
    letterSpacing: '0.05em'
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '17px',
    color: theme.colors.black,
    paddingTop: '9px'
  },
  avatar: {
    width: '200px',
    height: '200px',
    '&.MuiAvatar-img': {
      objectFit: 'contain'
    }
  },
  emptyAvatar: {
    width: '200px',
    height: '200px',
    background: theme.colors.profile.avatar_bg,
    color: theme.colors.profile.avatar_icon
  },
  errorAvatar: {
    width: '200px',
    height: '200px',
    background: theme.colors.profile.avatar_bg,
    color: theme.colors.errorColor,
    border: '1px dashed ' + theme.colors.errorColor
  },
  uploadButton: {
    background: theme.colors.grey_2,
    color: theme.colors.profile.text_grey,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    borderRadius: '100px',
    width: '13em',
    height: '36px',
    boxShadow: 'none',
    marginLeft: '3em'
  },
  labels: {
    fontSize: '16px',
    color: theme.colors.grey,
    paddingBottom: '7px'
  },
  outlinedInput: {
    borderRadius: '50px',
    width: '100%',
    height: '36px',
    fontSize: '12px',
    color: theme.colors.profile.text_grey
  },
  formContainer: {
    gap: '4em',
    margin: '2em 6em 0 6em',
    [theme.breakpoints.down('md')]: {
      margin: '2em 0 0 0',
      flexDirection: 'column'
    }
  },
  headerContainer: {
    gap: '1em',
    margin: '2em 6em 0 6em',
    [theme.breakpoints.down('md')]: {
      margin: '2em 0 0 0'
    }
  },
  error: {
    marginLeft: '5px',
    marginTop: '0.5em',
    fontSize: '12px',
    color: theme.colors.errorText
  }
}))

export const customSelectStyles = makeStyles(theme => ({
  outlinedInput: {
    borderRadius: '50px',
    width: '100%',
    height: '36px',
    fontSize: '12px',
    color: theme.colors.profile.text_grey
  },
  select: {
    fontSize: '12px',
    color: theme.colors.profile.text_grey
  },
  selectRoot: {
    '&:focus': {
      borderRadius: '50px'
    }
  }
}))

export const insuranceComponentStyles = makeStyles(theme => ({
  infoContainer: {
    fontSize: '14px',
    fontWeight: '600',
    paddingTop: '24px'
  },
  titleContainer: {
    padding: '24px 80px 0px 80px',
    columnCount: '2',
    [theme.breakpoints.down('md')]: {
      columnCount: '1',
      padding: '24px 0 0 0'
    }
  },
  itemContainer: {
    padding: '24px 80px 0px 80px',
    columnCount: '2',
    [theme.breakpoints.down('md')]: {
      columnCount: '1',
      padding: '24px 0 0 0',
      flexDirection: 'column'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '24px',
    letterSpacing: '0.05em'
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '17px',
    color: theme.colors.black,
    paddingTop: '9px',
    letterSpacing: '0em'
  },
  componentDivider: {
    marginRight: '10px'
  },
  questionDivider: {
    marginRight: '10px',
    marginTop: '10px'
  },
  question: {
    fontSize: '12px',
    paddingTop: '12px',
    color: theme.colors.grey
  },
  centerInput: {
    textAlign: 'center',
    marginRight: '0',
    marginLeft: 'auto',
    width: '6em !important'
  },
  rightColumn: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '12px'
    }
  },
  required: {
    color: theme.colors.errorText
  }
}))

export const profileStepsStyles = makeStyles(theme => ({
  statusContainer: {
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px'
    }
  }
}))

export const preferencesCardStyles = makeStyles(theme => ({
  title: {
    fontSize: '25px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '24px',
    letterSpacing: '0.05em',
    margin: '23px 0px 22px 20px'
  },
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    borderBottom: `1px solid ${theme.colors.disabledField}`,
    marginBottom: '16px'
  },
  actions: {
    display: 'flex',
    padding: '0px 0px'
  },
  content: {
    padding: '0px 20px 30px 20px'
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '500',
    margin: '0 0 -25px 15px'
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  listItemIcon: {
    maxWidth: 'unset',
    minWidth: 'unset',
    width: '15px',
    height: '15px'
  },
  chip: {
    fontSize: '12px',
    margin: '3px',
    height: '32px',
    backgroundColor: theme.colors.chipVisible,
    '&.MuiChip-deletable:focus': {
      backgroundColor: theme.colors.chipVisible
    }
  },
  chipVisibleOff: {
    backgroundColor: theme.colors.chipVisibleOff,
    '&.MuiChip-deletable:focus': {
      backgroundColor: theme.colors.chipVisibleOff
    }
  },
  chipText: {
    userSelect: 'none',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '2',
    marginRight: '6px'
  },
  checkbox: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&.Mui-checked': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent'
    }
  },
  whiteIcon: {
    color: theme.colors.white
  },
  gridIcon: {
    cursor: 'pointer',
    transform: 'translate(0px, 3px)',
    width: '15px',
    height: '15px',
    marginLeft: '5px',
    marginRight: '5px'
  },
  gridIconVisibleOff: {
    color: theme.colors.chipVisible
  },
  description: {
    fontSize: '10px',
    color: '#6C7172',
    margin: '0 0 25px 15px'
  }
}))

export const servicesCardStyles = makeStyles(theme => ({
  component: {
    width: '100%',
    borderRadius: '36px',
    marginTop: '20px',
    padding: '1em 1.5em'
  },
  service_title: {
    fontSize: '20px',
    color: theme.colors.iconBlue,
    fontWeight: '700',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  removeButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: theme.colors.buttonGrey,
    fontSize: '22px'
  },
  chipsContainer: {
    marginBottom: '1.5em'
  },
  ratesContainer: {
    gap: '1em',
    minWidth: '34em',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      minWidth: '100%'
    }
  }
}))

export const statesComponentStyles = makeStyles(theme => ({
  leftComponent: {
    marginRight: '10px',
    minWidth: '14em',
    [theme.breakpoints.down('md')]: {
      minWidth: 'auto',
      flex: 1
    }
  },
  rightComponent: {
    marginRight: '10px',
    minWidth: '13em',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      minWidth: 'auto',
      flex: 1
    }
  },
  label: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    fontSize: '12px',
    color: theme.colors.labels
  },
  iconMargin: {
    marginRight: '7px'
  }
}))

export const supportCardStyles = makeStyles(theme => ({
  title: {
    fontSize: '25px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '24px',
    letterSpacing: '0.05em',
    margin: '23px 0px 22px 20px'
  },
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    borderBottom: `1px solid ${theme.colors.disabledField}`,
    marginBottom: '16px'
  },
  actions: {
    display: 'flex',
    padding: '0px 0px'
  },
  content: {
    padding: '0px 20px 30px 20px'
  },
  versionLabel: {
    fontSize: '15px',
    fontWeight: '400',
    marginBottom: '25px'
  },
  link: {
    fontSize: '15px',
    fontWeight: '400',
    color: theme.palette.primary.light,
    width: '100%',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  contacts: {
    fontSize: '15px',
    fontWeight: '400',
    color: theme.colors.stepperGray,
    marginBottom: '25px'
  }
}))

export const userCardStyles = makeStyles(theme => ({
  userContainer: {
    padding: '24px',
    borderWidth: '1px',
    border: `1px solid ${theme.colors.disabledField}`,
    borderRadius: '36px',
    display: 'flex',
    flexDirection: 'row',
    width: '480px',
    height: '380px',
    marginBottom: '20px'
  },
  column: {
    flex: 10
  },
  separation: {
    flex: 1
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  dialogPaper: {
    width: '577px',
    height: '302px',
    boxShadow: '3.79882px 5.69823px 27.2249px rgba(216, 216, 216, 0.25)',
    borderRadius: '8px'
  },
  dialogTitle: {
    fontWeight: '700',
    fontSize: '24px',
    textAlign: 'center',
    letterSpacing: '0.05em'
  },
  dialogContentFont: {
    fontSize: '18px',
    textAlign: 'center',
    color: theme.colors.basicDisabledButtonColor,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '21px'
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  dialogButtonContainer: {
    alignSelf: 'flex-end',
    marginBottom: '10px'
  }
}))

export const usersComponentStyles = makeStyles(theme => ({
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '1169px',
    padding: '24px',
    [theme.breakpoints.down('md')]: {
      padding: '24px 0',
      minWidth: 'auto'
    }
  },
  titleContainer: {
    padding: '10px 80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addMoreContainer: {
    padding: '0px 80px 10px 80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      padding: '20px 2em',
      minWidth: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0',
      minWidth: 'auto'
    }
  },
  userContainer: {
    columnCount: 2,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '0 5px'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '15px'
    }
  },
  appButton: {
    [theme.breakpoints.down('md')]: {
      padding: '3px 0px !important',
      marginRight: '15px !important'
    }
  }
}))

export const accessPanelStyles = makeStyles(theme => ({
  list: {
    width: 'auto'
  },
  fullList: {
    width: 'auto'
  },
  drawerPaper: {
    width: '360px',
    borderRadius: '8px',
    maxHeight: 'calc(100% - 96px)',
    marginTop: '96px',
    overflowY: 'auto'
  },
  buttonMain: {
    color: theme.colors.backdropColor,
    backgroundColor: theme.colors.inProgressWork,
    '&$buttonDisabled': {
      backgroundColor: theme.colors.settings.disabled
    },
    paddingBottom: '5px',
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'none',
    borderRadius: '8px',
    marginLeft: '196px',
    width: '135px',
    height: '40px',
    marginTop: '17px',
    marginBottom: '17px'
  },
  buttonDisabled: {},
  state: {
    marginBottom: '4px',
    color: theme.colors.settings.fieldInfo,
    fontSize: '14px',
    fontWeight: '400'
  },
  title: {
    padding: '32px 14px',
    marginRight: '100px',
    color: theme.colors.text,
    fontSize: '20px',
    fontWeight: 'bold',
    width: '200px'
  },
  label: {
    marginTop: '16px',
    marginBottom: '4px',
    color: theme.colors.settings.fieldInfo,
    fontSize: '14px',
    fontWeight: '400'
  },
  delete: {
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: '700',
    color: theme.colors.settings.delete,
    borderColor: 'transparent',
    borderRadius: '100px',
    padding: '3px 30px',
    marginTop: '15px',
    marginLeft: '15px'
  },
  save: {
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: '700',
    color: theme.colors.settings.button_info,
    borderColor: theme.colors.settings.button_info,
    borderRadius: '100px',
    padding: '3px 30px',
    marginRight: '0px',
    marginLeft: 'auto',
    marginTop: '15px'
  },
  saveOk: {
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: '700',
    color: theme.colors.text,
    borderColor: theme.colors.settings.button_info,
    borderRadius: '100px',
    padding: '3px 30px',
    marginRight: '0px',
    marginLeft: 'auto',
    marginTop: '15px'
  },
  inputName: {
    marginTop: 'unset',
    backgroundColor: theme.colors.filters.fieldsBackground,
    fontSize: 16,
    borderRadius: '8px',
    width: '303px',
    height: '36px',
    marginBottom: '8px'
  },
  textField: {
    fontSize: 16,
    padding: '8.5px 11px'
  },
  bottomDiv: {
    display: 'flex',
    marginBottom: '100px',
    width: '303px'
  },
  errorMessage: {
    color: theme.colors.errorText,
    fontWeight: '400',
    fontSize: '12px',
    marginLeft: '15px'
  },
  drawerTitle: { display: 'flex', alignItems: 'center' }
}))

export const profileInfoCardStyles = makeStyles(theme => ({
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    marginBottom: '16px',
    padding: '10px 10px 1em 1em',
    color: theme.colors.text
  },
  cardTitle: {
    fontSize: '25px',
    fontWeight: '700'
  },
  editButton: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginRight: '0',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    lineHeight: '19px'
  },
  cardSubtitle: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '1em'
  },
  sectionDivider: {
    marginTop: '2em'
  },
  boxContainer: {
    gap: '1em',
    [theme.breakpoints.down('md')]: {
      display: 'inline'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  marginContainer: {
    marginTop: '32px',
    marginRight: '1em'
  },
  disabledText: {
    '& input.Mui-disabled': {
      WebkitTextFillColor: theme.colors.text,
      padding: '0.5em 1em'
    }
  },
  disabledTextCenter: {
    '& input.Mui-disabled': {
      textAlign: 'center',
      WebkitTextFillColor: theme.colors.text,
      padding: '0.5em 1em',
      marginTop: '0.5em'
    }
  },
  question: {
    fontSize: '12px',
    paddingTop: '12px',
    color: theme.colors.grey
  },
  centerInput: {
    textAlign: 'center',
    marginRight: '0',
    marginLeft: 'auto',
    padding: '0.5em 1em !important'
  },
  fileCard: {
    backgroundColor: theme.colors.grey_2,
    margin: '1em 1em 1em auto',
    padding: '1em',
    border: '1px solid ' + theme.colors.profile.darkCard,
    borderRadius: '12px',
    boxShadow: 'none',
    width: '200px'
  },
  fileTitle: {
    fontSize: '12px',
    fontWeight: '800',
    marginBottom: '0.5em'
  },
  fileData: {
    fontSize: '12px',
    paddingBottom: '0.5em'
  },
  fileLink: {
    fontSize: '12px',
    textDecoration: 'underline',
    color: theme.colors.iconBlue,
    paddingBottom: '0.5em',
    wordBreak: 'break-all'
  }
}))

export const rolesCardStyles = makeStyles(theme => ({
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    borderBottom: `1px solid ${theme.colors.disabledField}`
  },
  title: {
    fontSize: '25px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '24px',
    letterSpacing: '0.05em',
    margin: '23px 0px 22px 20px'
  },
  actions: {
    display: 'flex',
    padding: '0px 0px'
  },
  addButton: {
    marginLeft: 'auto',
    marginRight: '12px',
    color: theme.palette.primary.light
  },
  content: {
    padding: '0px 20px 30px 20px'
  },
  itemDivider: {
    borderBottom: '1px solid ' + theme.colors.grey_2
  },
  roleItem: {
    fontSize: '20px',
    fontWeight: 500,
    paddingBottom: '1.3em',
    paddingTop: '1.3em',
    minWidth: '10em'
  }
}))

export const tradesServicesCardStyles = makeStyles(theme => ({
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    marginBottom: '2em',
    padding: '1em',
    color: theme.colors.text
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '900'
  },
  editButton: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginRight: '0',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    lineHeight: '19px'
  },
  cardSubtitle: {
    fontSize: '16px',
    fontWeight: '500'
  },
  sectionDivider: {
    marginTop: '1em',
    marginBottom: '1em'
  },
  ratesContainer: {
    gap: '1em',
    marginTop: '1em',
    minWidth: '29em'
  }
}))

export const usersCardStyles = makeStyles(theme => ({
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    marginBottom: '16px',
    padding: '10px 10px 1em 1em',
    color: theme.colors.text,
    minHeight: '470px'
  },
  cardTitle: {
    fontSize: '25px',
    fontWeight: '700',
    minWidth: 'fit-content',
    marginTop: '5px',
    marginRight: '1em'
  },
  actions: {
    padding: '0px 0px',
    display: 'flex',
    alignItems: 'baseline'
  },
  content: {
    padding: '0px 20px 30px 0px'
  },
  editButton: {
    marginLeft: 'auto',
    marginRight: '0',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    lineHeight: '19px',
    border: 'none',
    paddingTop: '0px',
    marginBottom: 'auto'
  },
  itemDivider: {
    borderBottom: '1px solid ' + theme.colors.grey_2
  },
  userItem: {
    fontSize: '16px',
    fontWeight: 600,
    minWidth: '10em',
    cursor: 'pointer'
  },
  lineItem: {
    padding: '1em 0 1em'
  },
  searchBar: {
    width: '85%',
    marginTop: '5px'
  },
  usersList: {
    maxHeight: '350px',
    overflow: 'auto'
  }
}))

export const yesNoSelectorStyles = makeStyles(theme => ({
  radio: {
    marginLeft: 'auto'
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  chip: {
    fontSize: '12px',
    color: theme.colors.text,
    height: '22px',
    borderRadius: '100px',
    padding: '4px 0px',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.colors.settings.border}`
  },
  item: {
    fontSize: '16px',
    height: '36px',
    display: 'none',
    justifyContent: 'flex-start',
    width: '303px'
  },
  root: {
    fontSize: '12px',
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '303px',
    marginLeft: '0px',
    height: '36px'
  },
  errorRoot: {
    fontSize: '12px',
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '303px',
    marginLeft: '0px',
    height: '36px',
    borderColor: theme.colors.errorText
  },
  selectLabel: {
    fontSize: '16px'
  },
  content: { marginLeft: '0px' },
  menuItem: {
    fontSize: '12px',
    height: '36px',
    display: 'flex',
    justifyContent: 'flex-start',
    width: '303px'
  }
}))
