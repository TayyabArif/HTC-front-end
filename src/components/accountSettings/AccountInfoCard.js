// main components
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { store } from '../../store'
import { authActions } from '../../store/signIn'

// mui components
import {
  Card,
  Button,
  CardContent,
  Grid,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'

/** Redux */
import { useSelector } from 'react-redux'

/** Services **/
import { UpdateAccountInfo } from './UpdateAccountInfo'
import { getCompanyRoles } from '../../services/ApiService'

/** Styles **/
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  card: {
    '&.MuiCard-root': {
      borderRadius: '10px',
      margin: '0px 15px 13px 62px',
      boxShadow: 'none',
      border: 'none'
    }
  },
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      fontSize: '24px',
      fontWeight: '700',
      margin: '23px 0px 22px 20px',
      textTransform: 'none'
    }
  },
  editButton: {
    '&.MuiTypography-root': {
      color: theme.colors.settings.editButton
    }
  },
  field: {
    '&.MuiTypography-root': {
      fontSize: '15px',
      fontWeight: '500',
      color: theme.colors.settings.fieldName
    }
  },
  info: {
    '&.MuiTypography-root': {
      border: `1px solid ${theme.colors.settings.border}`,
      borderRadius: '30px',
      fontSize: '15.3px',
      fontWeight: '400',
      color: theme.colors.black,
      marginBottom: '15px',
      wordWrap: 'break-word',
      padding: '5px 13px'
    }
  },
  gridImg: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: '140px',
    height: '140px'
  },
  content: {
    '&.MuiCardContent-root': {
      padding: '10px 0px 20px 32px'
    }
  }
}))

export const AccountInfoCard = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const user = useSelector(state => state.auth.user)
  const [editDrawer, setEditDrawer] = useState(false)
  const [userInfo, setUserInfo] = useState(JSON.parse(JSON.stringify(user)))
  const [roles, setRoles] = useState()

  useEffect(() => {
    store.dispatch(
      authActions.setUser({
        ...{ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdLSlh4WHdrYU9CWW9wbWIiLCJjbGllbnRJZCI6IjYxOTZiYzYxNDc1Yzg1MTk5MjAwNzExYSIsInVzZXJJZCI6IjYzNzVhNWNmZWJkY2JhMDYwNTcyN2UyMSIsInNjb3BlcyI6InVzZXJzOnJlYWQiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTIzVDIwOjQ1OjMxLjYyMFoiLCJpYXQiOjE2NjkyMzYzMzEsImV4cCI6MTY2OTMyMjczMX0.StThGMT8wzvVBfjG5UyQEgaTWI7xhu69Ax1N4_sWAZA' },
        userInfo: {
          id: '6375a5cfebdcba0605727e21',
          firstName: 'Pablo',
          lastName: 'Chamba',
          email: 'pablo.chamba@crifa.com',
          phone: null,
          photo_url: null,
          createdAt: '2022-11-17T02:23:33.654Z',
          updatedAt: '2022-11-23T16:48:39.445Z',
          lastAccessed: 1669222119,
          role: 'manager',
          roles: '6244632229aebf2bd88a41c5',
          username: 'pabloch',
          created: 1668651813,
          company_id: '63755977aab5eb0012b43dd2',
          status: 'active',
          companyId: '63755977aab5eb0012b43dd2',
          company_name: 'Mario Test client',
          company_address: {
            address: ''
          },
          core_company_id: 16,
          originating_company: '621504cecb2a7e491c0868bb',
          parent_companies: [
            {
              id: '621504cecb2a7e491c0868bb',
              name: 'Automated Decision Solutions'
            }
          ],
          subdomain: {
            parent: 'brightview'
          },
          parent_subdomain: 'brightview',
          logo: {
            url: 'https://s3.amazonaws.com/ftcuploads/company-logo/Automated Decision Solutions/621504cecb2a7e491c0868bb.jpg'
          },
          tech_support: {
            customer_logo: 'https://i.ibb.co/6tfpPwS/Bright-View-Logo.jpg',
            sections: [
              {
                title: 'technical_support',
                support: {
                  from: {
                    day: 'Mon',
                    time: '6:30',
                    meridian: 'AM'
                  },
                  to: {
                    day: 'Fri',
                    time: '6:30',
                    meridian: 'PM'
                  },
                  timezone: 'EST'
                },
                action_buttons: [
                  {
                    icon: {
                      library: 'light',
                      name: 'faPhoneAlt'
                    },
                    label: 'phone',
                    action: 'tel',
                    action_content: '267-753-6000'
                  },
                  {
                    icon: {
                      library: 'light',
                      name: 'faEnvelope'
                    },
                    label: 'email',
                    action: 'mailto',
                    action_content: 'info@automateddecision.com?subject=FTC Techsupport'
                  },
                  {
                    icon: {
                      library: 'light',
                      name: 'faPlayCircle'
                    },
                    label: 'videos',
                    action: 'youtube',
                    action_content: 'https://www.youtube.com/channel/UCZeXA_cKZwKjNXuFb6lIz5A/videos'
                  }
                ]
              }
            ]
          },
          configurations: {
            id: '62a11848fd6dad43d7e04574',
            default: false,
            wo_action: {
              terms_conditions: {
                text: null
              },
              wo_logs: {
                clock_in: {
                  tech_onsite: false,
                  radius: 10000
                },
                clock_out: {
                  radius: 0,
                  multipass: {
                    default: null,
                    snow: {
                      title: 'Select an estimated time of return (ETA)',
                      label: 'Options',
                      options: {
                        '#3_hours': '3 hours',
                        '#6_hours': '6 hours',
                        '#9_hours': '9 hours',
                        '#12_hours': '12 hours'
                      }
                    },
                    land: {
                      title: 'Select an estimated time of return (ETA)',
                      label: 'Options',
                      options: {
                        '#3_hours': '3 hours',
                        '#6_hours': '6 hours',
                        '#9_hours': '9 hours',
                        '#12_hours': '12 hours'
                      }
                    }
                  }
                }
              },
              wo_data: {
                default: {
                  services: 'services',
                  trip_description: 'instructions',
                  notes: 'general_notes'
                }
              },
              eq_services: {
                default: {
                  tasks: {
                    mandatory: true,
                    services: {
                      unique_option: [
                        'no service required',
                        'no service needed'
                      ]
                    }
                  },
                  photos_before: {
                    max: 4,
                    min: 1
                  },
                  photos_after: {
                    max: 4,
                    min: 1
                  },
                  service_type: {
                    gated: false,
                    mandatory: true,
                    options: [
                      'option_3'
                    ]
                  },
                  multiple_service: true
                },
                land: {
                  multiple_service: {
                    enabled: true,
                    max_count: 2,
                    btn_label: 'option_1'
                  },
                  service_type: {
                    gated: false,
                    mandatory: false,
                    options: [
                      'option_9',
                      'option_10'
                    ],
                    follow_order: true,
                    header_text: '',
                    config_required: true
                  }
                },
                option_9: {
                  additional_photos: {
                    max: 4,
                    min: 2,
                    titles: {
                      options: [
                        {
                          title: 'Proof of service 1',
                          mandatory: true
                        },
                        {
                          title: 'Proof of service 2',
                          mandatory: true
                        },
                        {
                          title: 'Street view',
                          mandatory: false
                        },
                        {
                          title: 'Other',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_10: {
                  notes: {
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 1,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: true
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                snow: {
                  service_type: {
                    gated: false,
                    mandatory: true,
                    options: [
                      'option_3'
                    ]
                  },
                  tasks: {
                    mandatory: true,
                    services: {
                      unique_option: [
                        'no service required',
                        'no service needed'
                      ]
                    }
                  },
                  additional_photos: {
                    max: 7,
                    min: 4,
                    titles: {
                      options: [
                        {
                          title: 'Emergency Exit',
                          mandatory: true
                        },
                        {
                          title: 'Main Entrance',
                          mandatory: true
                        },
                        {
                          title: 'Handicap',
                          mandatory: true
                        },
                        {
                          title: 'Drive Lanes',
                          mandatory: true
                        },
                        {
                          title: 'Sidewalk',
                          mandatory: false
                        },
                        {
                          title: 'ATM/Drive-Thru',
                          mandatory: false
                        },
                        {
                          title: 'Loading Dock',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  },
                  notes: {
                    mandatory: false
                  },
                  signature: {
                    mandatory: true,
                    print_name_mandatory: true
                  },
                  multiple_service: true
                },
                special: {
                  service_type: {
                    gated: true,
                    mandatory: true,
                    options: [
                      'option_3'
                    ]
                  },
                  systems: {
                    multi: true
                  },
                  parts: {
                    inventory: false,
                    options: [
                      'option_4',
                      'option_6'
                    ]
                  },
                  notes: {
                    mandatory: true
                  },
                  additional_photos: {
                    max: 8,
                    min: 1
                  },
                  signature: {
                    mandatory: true,
                    print_name_mandatory: true,
                    header_text: 'Signature'
                  },
                  labor: {
                    type: [
                      'option_1',
                      'option_2'
                    ],
                    hours: {
                      mandatory: false
                    }
                  },
                  multiple_service: {
                    enabled: true
                  }
                },
                hvac: {
                  multiple_service: {
                    enabled: true,
                    max_count: 8,
                    btn_label: 'option_2'
                  },
                  service_type: {
                    gated: false,
                    mandatory: false,
                    options: [
                      'option_1',
                      'option_3',
                      'option_4'
                    ]
                  },
                  'notes|as_found': {
                    header_text: 'As Found Condition',
                    placeholder_text: 'option_2',
                    mandatory: true
                  },
                  additional_photos: {
                    max: 4,
                    min: 1,
                    titles: {
                      options: [
                        {
                          title: 'As found condition',
                          mandatory: true
                        },
                        {
                          title: 'Street view',
                          mandatory: false
                        },
                        {
                          title: 'Proof of service',
                          mandatory: false
                        },
                        {
                          title: 'Other',
                          mandatory: false
                        }
                      ],
                      unique: false
                    }
                  },
                  'notes|work_performed': {
                    mandatory: true,
                    header_text: 'Work Performed',
                    placeholder_text: 'option_3'
                  },
                  numeric: {
                    decimals: 2,
                    header_text: 'Labor Hours',
                    mandatory: true,
                    placeholder_text: 'option_4',
                    suffix: 'option_1'
                  },
                  'picker|action_taken': {
                    header_text: 'Action taken',
                    mandatory: true,
                    options: [
                      'option_6',
                      'option_7',
                      'option_3',
                      'option_4',
                      'option_5'
                    ]
                  }
                },
                'pre-season inspection': {
                  multiple_service: {
                    enabled: true,
                    max_count: 25,
                    btn_label: 'option_3',
                    pre_render: true
                  },
                  service_type: {
                    gated: false,
                    mandatory: true,
                    options: [
                      'option_11',
                      'option_12',
                      'option_13',
                      'option_14',
                      'option_15',
                      'option_16',
                      'option_17',
                      'option_18',
                      'option_19',
                      'option_20',
                      'option_21',
                      'option_22',
                      'option_23',
                      'option_24',
                      'option_25',
                      'option_26',
                      'option_27',
                      'option_28',
                      'option_29',
                      'option_30',
                      'option_31',
                      'option_32',
                      'option_33',
                      'option_34'
                    ],
                    follow_order: false,
                    header_text: '',
                    config_required: true
                  }
                },
                option_11: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_found': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_12: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_13: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: true,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: true
                  },
                  additional_photos: {
                    max: 4,
                    min: 1,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: true
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_14: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: true,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_15: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: true,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: true
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_16: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 1,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: true
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_17: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_18: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_19: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_20: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_21: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_22: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_23: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_24: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_25: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_26: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_27: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_28: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_29: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_30: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_31: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_32: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_33: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                },
                option_34: {
                  picker: {
                    header_text: 'Damages',
                    mandatory: false,
                    options: [
                      'option_8',
                      'option_9'
                    ]
                  },
                  'notes|as_founds': {
                    header_text: 'Additional Comments',
                    placeholder_text: 'option_5',
                    mandatory: false
                  },
                  additional_photos: {
                    max: 4,
                    min: 0,
                    titles: {
                      options: [
                        {
                          title: 'Deficiency 1',
                          mandatory: false
                        },
                        {
                          title: 'Deficiency 2',
                          mandatory: false
                        },
                        {
                          title: 'Other 1',
                          mandatory: false
                        },
                        {
                          title: 'Other 2',
                          mandatory: false
                        }
                      ],
                      unique: true
                    }
                  }
                }
              },
              crew_members: true,
              directions: true,
              travel_time: true,
              attachments: true,
              cancel_trip: {
                default: {
                  reasons: {
                    no_service_required: 'No service required'
                  },
                  multipass: false,
                  notes: {
                    mandatory: true
                  }
                }
              },
              scope_of_work: true
            },
            wo_list: {
              wo_creation: {
                snow: {
                  radius: 0,
                  services: [
                    'Snow Removal',
                    'Hauling and Stacking'
                  ],
                  notes: {
                    mandatory: false
                  }
                },
                land: {
                  radius: 0,
                  services: [
                    'Mulch',
                    'Landscape Maintenance'
                  ],
                  notes: {
                    mandatory: false
                  }
                },
                hvac: {
                  radius: 0,
                  services: [],
                  notes: {
                    mandatory: false
                  }
                },
                special: {
                  radius: 0,
                  services: [
                    'Plumbing'
                  ],
                  notes: {
                    mandatory: false
                  }
                },
                default: {
                  radius: 0,
                  services: [],
                  notes: {
                    mandatory: false
                  }
                }
              },
              trade_filter: true,
              site_trade_filter: true,
              sorters: {
                scheduled_date: 'Scheduled date',
                expiration_date: 'Expiration date',
                open_date_d: 'Open date'
              }
            },
            wo_configs: {
              est_service_start: {
                reasons_mandatory: false
              },
              call_type: {
                filter: true,
                label: 'Type',
                values: {
                  Complaint: {
                    icon: {
                      library: 'duotone',
                      name: 'faCircle',
                      color: '#CE0808'
                    }
                  },
                  Enhancement: {
                    icon: {
                      library: 'duotone',
                      name: 'faCircle',
                      color: '#6F6F6F'
                    }
                  }
                }
              },
              display_client_site_label: true
            },
            role_based: false,
            trade_configs: {
              default: {
                dates: {
                  scheduled_date: true,
                  expiration_date: true,
                  open_date: true
                },
                color: '#BDBDBD',
                nte: true
              },
              snow: {
                dates: {
                  open_date: true,
                  expiration_date: true
                },
                color: '#2B78E4',
                nte: true
              },
              land: {
                color: '#5CC867',
                nte: true,
                dates: {
                  open_date: true,
                  expiration_date: true
                }
              },
              sweep: {
                dates: {
                  open_date: true,
                  expiration_date: true
                },
                color: '#CC43D8',
                nte: true
              },
              special: {
                color: '#E47A3E',
                nte: true,
                dates: {
                  open_date: true,
                  expiration_date: true
                }
              },
              'pre-season inspection': {
                color: '#E47A3E',
                nte: true,
                dates: {
                  open_date: true,
                  expiration_date: true
                }
              }
            },
            integrations: {
              trades: 'salesforce',
              sites: 'salesforce',
              attachments: 'salesforce'
            },
            roles: {
              admin: {
                workorders: {
                  read: true,
                  write: true
                }
              }
            },
            onboarding: {
              compliance: {
                information: {
                  fields: {
                    name: 50,
                    legal_entity: 50,
                    country: 0
                  },
                  section_total: 20
                },
                insurance: {
                  fields: {
                    states_registered: 60,
                    w9: 20,
                    ein: 20
                  },
                  section_total: 20
                },
                tradesServices: {
                  section_total: 20
                },
                serviceArea: {
                  section_total: 20
                },
                users: {
                  section_total: 20
                }
              }
            }
          },
          cushman_flow: false,
          cornell_flow: false,
          parts_options: {
            option_1: 'Installed: Customer stock',
            option_2: 'Installed: Truck stock',
            option_3: 'Installed: PO',
            option_4: 'Need Ordered',
            option_5: 'Already on order',
            option_6: 'Used Truck Stock'
          },
          service_types: {
            option_1: 'Estimate',
            option_2: 'Follow Up',
            option_3: 'Repair',
            option_4: 'Inspection',
            option_5: 'Proposal',
            option_6: 'Opportunity',
            option_7: 'Installation',
            option_8: 'Maintenance',
            option_9: 'Service Form',
            option_10: 'Deficiency',
            option_11: 'Curb',
            option_12: 'Bollards',
            option_13: 'Parking Blocks/Bumpers',
            option_14: 'Cart Corrals',
            option_15: 'Light Poles',
            option_16: 'Speed Bumps',
            option_17: 'Dumpster Enclosure',
            option_18: 'Trash Receptacles',
            option_19: 'Planters',
            option_20: 'Turf',
            option_21: 'Beds/Shrubs',
            option_22: 'Docks',
            option_23: 'Sidewalks',
            option_24: 'Fencing',
            option_25: 'Siding',
            option_26: 'Equipment',
            option_27: 'Borders',
            option_28: 'Islands',
            option_29: 'Overhangs',
            option_30: 'Awnings',
            option_31: 'Fire Hydrants',
            option_32: 'Signange',
            option_33: 'Storm Drains',
            option_34: 'Potholes'
          },
          labor_type: {
            option_1: 'Standard rate',
            option_2: 'Overtime rate'
          },
          picker_header: {
            option_1: 'Header Text',
            option_2: 'Action Taken',
            option_3: 'Damages'
          },
          service_form_labels: {
            option_1: 'Capture Deficiency',
            option_2: 'Add New Repair Form'
          },
          picker_options: {
            option_1: 'Option one',
            option_2: 'Option two',
            option_3: 'Work Completed',
            option_4: 'Unable to fix (Need to order parts)',
            option_5: 'Temporary fix (need to come back)',
            option_6: 'Unable to fix',
            option_7: 'Other',
            option_8: 'Yes',
            option_9: 'No'
          },
          service_placeholders: {
            option_1: 'Enter here',
            option_2: 'What’s the condition.. ie. “Clogged toilet”',
            option_3: 'Enter what’s required to repair the issue',
            option_4: 'Enter Labor hours',
            option_5: 'Describe the condition in more detail...'
          },
          numeric_suffix: {
            option_1: 'hrs',
            option_2: 'min'
          },
          service_headers: {
            option_1: 'Equipments',
            option_2: 'Before Photos',
            option_3: 'After Photos',
            option_4: 'Job Notes',
            option_5: 'Signature',
            option_6: 'Servus Pro Signature',
            option_7: 'Customer Signature',
            option_8: 'Equipment',
            option_9: 'Required Photos',
            option_10: 'Optional Photos',
            option_11: 'Other Photos',
            option_12: 'As Found Condition',
            option_13: 'Work Performed',
            option_14: 'Labor Hours',
            option_15: 'Action taken',
            option_16: 'Additional Comments',
            option_17: 'Signature'
          },
          eid_external_token: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ilc0MVRJSHVrNUI3Tk5vdjciLCJjbGllbnRJZCI6IjMiLCJ1c2VySWQiOjQ5NzYsImNyZWF0ZWRBdCI6IjIwMjItMDItMThUMTg6NTU6NDMuMjQ1WiIsImlhdCI6MTY0NTIxMDU0MywiZXhwIjoxNjQ1MjEyOTQzfQ.S2g95EGPhxWcB4zU8dCrqtaoHiCeD6etDVnRR_T-nlQ',
            token_type: 'Bearer',
            expires_in: 3599,
            refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlZ4dTdmcUp6eDJJZlhHN1AiLCJjbGllbnRJZCI6IjMiLCJ1c2VySWQiOjQ5NzYsImNyZWF0ZWRBdCI6IjIwMjItMDItMThUMTg6NTU6NDMuMjQ2WiIsImlhdCI6MTY0NTIxMDU0MywiZXhwIjoxNjc2NzQ2NTQzfQ.VkH_WUB2DUX_BlmPwHxUI1GOsheAcFIAz2XYE7TJy3g',
            user: {
              id: 4976,
              email: 'ucintegration@equipid.com',
              first_name: 'UC',
              last_name: 'Integration User',
              title: null,
              personal_email: null,
              last_sign_in_company_id: 18,
              password_updated: false,
              user_features: [],
              last_sign_in_company_subdomain: 'powercooling',
              last_sign_in_company_name: 'Power Cooling Inc',
              last_sign_in_company_features: [],
              buyer_configurations: [],
              primary_phone_number: null,
              working_phone_number: null,
              other_phone_number: null,
              address: {}
            }
          },
          scopes: {
            id: '6244632229aebf2bd88a41c5',
            name: 'Super Admin',
            permissions: {
              workorders: {
                read: true,
                write: true
              },
              company_settings: {
                read: true,
                write: true
              },
              account_settings: {
                read: true
              },
              invoices: {
                read: true
              }
            },
            default: true,
            companyId: '5dbb570993fa09094d8b4567'
          }
        }
      })
    )
  }, [])

  let firstLoad = true
  useEffect(() => {
    const getRoles = async () => {
      try {
        if (firstLoad) {
          const response = await getCompanyRoles(userInfo.userInfo.originating_company)

          const newPhone = formatPhoneNumber(userInfo.userInfo.phone)
          userInfo.userInfo.phone = newPhone
          setUserInfo(userInfo)

          if (response) {
            setRoles(response)
          }
          firstLoad = false
        }
      } catch (error) {
        console.error(error)
      }
    }
    getRoles()
  }, [firstLoad])

  const handleClosePanel = u => {
    setEditDrawer(false)
    setUserInfo(u)
  }

  const formatPhoneNumber = phoneNumberString => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phoneNumberString
  }

  return (
        <div>
            <UpdateAccountInfo
                editDrawer={editDrawer}
                handleClosePanel={handleClosePanel}
                accountInfo={userInfo}
                accountOwner
                roles={roles}
            />
            <Card className={classes.card} data-testid={'account_info_card'} elevation={0}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography className={classes.title}>
                            {t('account_settings.info_card.title')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => { setEditDrawer(true) }}>
                            <Typography className={clsx(classes.title, classes.editButton)} pr={3}>
                                {t('account_settings.info_card.edit_button')}
                            </Typography>
                        </Button>

                    </Grid>
                </Grid>
                <CardContent className={classes.content}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Typography className={classes.field}>{t('account_settings.info_card.first_name')}</Typography>
                            <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.firstName}</Typography>
                        </Grid>
                        <Grid item xs={5} ml={2}>
                            <Typography className={classes.field}>{t('account_settings.info_card.last_name')}</Typography>
                            <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.lastName ?? '--'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography className={classes.field}>{t('account_settings.info_card.email')}</Typography>
                            <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.email}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography className={classes.field}>{t('account_settings.info_card.phone_number')}</Typography>
                            <Typography className={classes.info} mt={1}>{`${userInfo?.userInfo?.phone}`}</Typography>
                        </Grid>
                        <Grid item xs={4} ml={2}>
                            <Typography className={classes.field}>{t('account_settings.info_card.username')}</Typography>
                            <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.username}</Typography>
                        </Grid>
                        <Grid item xs={3} ml={2}>
                            <Typography className={classes.field}>{t('account_settings.info_card.password')}</Typography>
                            <Typography className={classes.info} mt={1}>{'***********'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography className={classes.field}>{t('account_settings.info_card.company_role')}</Typography>
                            <Typography className={classes.info} mt={1}>{roles?.find(x => x.id === userInfo.userInfo.roles)?.name ?? '--'}</Typography>
                        </Grid>
                        <Grid item xs={4} ml={2}>
                            <Typography className={classes.field}>{t('account_settings.info_card.user_title')}</Typography>
                            <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.role}</Typography>
                        </Grid>
                        <Grid item xs={3} ml={2}>
                            <Typography classes={{ root: classes.field }}>{t('account_settings.info_card.employee_id')}</Typography>
                            <Typography classes={{ root: classes.info }} mt={1}>{userInfo?.userInfo?.employee_id ?? '--'}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
  )
}
