import { rest } from 'msw'
import moment from 'moment'
const jwt = require('jwt-encode')

const apiHost = process.env.REACT_APP_FTC_OAUTH_SERVER_URL

export const handlers = [

  rest.get(`${apiHost}/api/users/scopes`, (req, res, ctx) => {
    return res(
      ctx.json([{ id: 1, scope: 'dashboard:read', description: null }, { id: 2, scope: 'work_orders:read', description: null }, { id: 3, scope: 'sites:read', description: null }, { id: 4, scope: 'proposals:read', description: null }, { id: 5, scope: 'company_settings:read', description: null }, { id: 6, scope: 'company_settings:write', description: null }, { id: 7, scope: 'account_settings:read', description: null }, { id: 8, scope: 'account_settings:write', description: null }, { id: 9, scope: 'company_settings.users:create', description: null }, { id: 10, scope: 'company_settings.users:delete', description: null }, { id: 11, scope: 'work_orders:view', description: null }, { id: 12, scope: 'company_settings.manage_access:write', description: null }, { id: 13, scope: 'company_settings.report_scheduler:write', description: null }, { id: 14, scope: 'company_settings.users:edit', description: null }, { id: 15, scope: 'masquerade:write', description: null }, { id: 16, scope: 'company_settings.bes_notifications:write', description: null }])
    )
  }),

  rest.post(`${apiHost}/oauth/token`, (req, res, ctx) => {
    const token = jwt.sign({
      id: 'eb5lffbjYTkQaEig',
      clientId: 1,
      userId: 36,
      scopes: 'dashboard:read work_orders:read sites:read proposals:read company_settings:read company_settings:write account_settings:read account_settings:write company_settings.users:create company_settings.users:delete work_orders:view company_settings.manage_access:write company_settings.report_scheduler:write company_settings.users:edit masquerade:write company_settings.bes_notifications:write',
      createdAt: moment().add(5, 'hours'),
      iat: 1652997232,
      exp: 1653083632
    }, 'secret')

    return res(
      ctx.json({ access_token: token.value, token_type: 'Bearer', expires_in: 86399, refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRmTkFrbDU4OEh4RXVDVDMiLCJjbGllbnRJZCI6MSwidXNlcklkIjozNiwiY3JlYXRlZEF0IjoiMjAyMi0wNS0xOVQyMDoxNDoyMS45NjBaIiwiaWF0IjoxNjUyOTkxMjYxfQ.V3YHBDw22rOQOo2zFEPPxmygQyMgC82RdHvkaYyKkJQ' })
    )
  }),

  rest.get(`${apiHost}/api/users/request-password-reset`, (req, res, ctx) => {
    return res(
      ctx.json({ title: 'Password reset requested', content: 'Check your email for further instructions, user ID: 36', status: true })
    )
  }),

  rest.get(`${apiHost}/api/users/:id`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 36, name: 'Santiago A', first_name: null, last_name: null, role: 'Admin', created_at: '2021-10-04T22:03:56.753Z', updated_at: '2021-10-04T22:03:56.753Z', deleted_at: null, enabled: true, pending_confirmation: true, invitation_token: 'e1328b0da1b8a33e935c19b2943fa35e4bebf2c90c0121fa249e900f8ecc3426', masquerade_client: 4, profile_pic: null, client_id: 181, roles: [{ id: 4, name: 'Master Admin' }], userCredentials: { username: 'sa@crifa.com', email: 'sa@crifa.com', userId: 36 } })
    )
  }),

  rest.get(`${apiHost}/api/client/:id`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 181, external_id: 'b5ca1553-de79-4d58-b8e6-25ee5586eb9e', email: 'info@automateddecision.com', organization_name: 'FTC Techsupport', business_phone: '1234', fax: '1234', notes: null, website: 'https://automateddecision.com', created_at: '2022-05-11T17:15:01.343Z', updated_at: '2022-05-11T17:15:01.343Z', billing_address_street: '6530 West Campus Oval', billing_address_city: 'New Albany', billing_address_state: 'Ohio', billing_address_zip_code: '43054', billing_address_lat: 40.101287841796875, billing_address_lng: -82.81836700439453, billing_address_country: 'US', billing_address_state_code: 'OH', billing_address_country_code: 'US', shipping_address_street: '6530 West Campus Oval', shipping_address_city: 'New Albany', shipping_address_state: 'Ohio', shipping_address_zip_code: '43054', shipping_address_lat: 40.101287841796875, shipping_address_lng: -82.81836700439453, shipping_address_country: 'US', shipping_address_state_code: 'OH', shipping_address_country_code: 'US', local_logo: '', internal_created_at: '2022-05-11T17:15:01.343Z', internal_updated_at: '2022-05-11T17:15:01.343Z', is_deleted: false })
    )
  }),

  rest.get(`${apiHost}/api/client`, (req, res, ctx) => {
    return res(
      ctx.json([{ id: 4, label: 'Starbucks' }, { id: 5, label: '7 Eleven' }, { id: 6, label: 'New Business Account' }, { id: 7, label: 'Advanced Auto Corporate' }, { id: 8, label: 'SA Test Business' }, { id: 9, label: 'Demo' }, { id: 10, label: 'Test Business Account' }, { id: 11, label: 'business account' }, { id: 12, label: 'TR Test 12/29' }, { id: 13, label: 'Allen Business Admin Account' }, { id: 14, label: 'Test Research Inc' }, { id: 15, label: 'BES Standard User Test Account' }, { id: 16, label: 'UPS' }, { id: 17, label: 'TR1_10_Business_BES' }, { id: 18, label: 'TEST' }, { id: 19, label: 'Testbirds GmbH' }, { id: 20, label: 'TR_Test_Account_Business' }, { id: 21, label: '7-Eleven' }, { id: 22, label: 'Retail Outlets of America' }, { id: 23, label: 'CVS Health' }, { id: 24, label: 'Test 2' }, { id: 25, label: 'entailtement data' }, { id: 26, label: 'demo enttt' }, { id: 27, label: 'entitlement record data' }, { id: 28, label: 'Bank of America Corp.' }, { id: 29, label: '20 record test 1' }, { id: 30, label: 'Business Account With Entitelment' }, { id: 31, label: 'Business Account With EntitlementTest' }, { id: 32, label: 'Moac Mall Holdings LLC' }, { id: 33, label: 'Target' }, { id: 34, label: 'TestBusinessAccount01' }, { id: 35, label: 'Nike' }, { id: 36, label: 'test Business Account 1' }, { id: 37, label: 'TEST BUSINESS ACCOUNT' }, { id: 38, label: 'Krispy Kreme' }, { id: 39, label: 'TEST JM' }, { id: 40, label: 'Publix Super Markets' }, { id: 41, label: 'TR Test 2/4 Business' }, { id: 42, label: 'CVS Central Florida' }, { id: 43, label: 'Test Account 20220208' }, { id: 44, label: 'CVS Miami 5' }, { id: 45, label: 'Walgreens, Inc.' }, { id: 46, label: 'HSBC Holdings PLC' }, { id: 47, label: 'PNC' }, { id: 48, label: 'Starbucks Corporation' }, { id: 49, label: "Lowe's Companies, Inc." }, { id: 50, label: 'Ahold Delhaize Usa, Inc.' }, { id: 51, label: 'Target Corporation' }, { id: 52, label: 'CarMax Auto Superstores Services Inc' }, { id: 53, label: 'JPMorgan Chase & Co.' }, { id: 54, label: 'Dollar General' }, { id: 55, label: 'Bank of America' }, { id: 56, label: 'Kindercare Education LLC' }, { id: 57, label: 'Big Lots, Inc.' }, { id: 58, label: 'The Kroger Co.' }, { id: 59, label: 'Frontier Communications Corporation' }, { id: 60, label: 'Comcast Cable Communications Management LLC' }, { id: 61, label: "Macy's, Inc." }, { id: 62, label: 'Speedway LLC' }, { id: 63, label: 'Fifth Third Bank' }, { id: 64, label: 'Walmart Store Inc.' }, { id: 65, label: 'Capital One Financial Corporation' }, { id: 66, label: "BJ's Wholesale Club Holdings, Inc." }, { id: 67, label: 'BB&T' }, { id: 68, label: 'BioLife Plasma Services, L.P.' }, { id: 69, label: 'AT & T Services Inc.' }, { id: 70, label: 'CubeSmart' }, { id: 71, label: 'Burlington Stores, Inc.' }, { id: 72, label: 'The Home Depot Inc.' }, { id: 73, label: 'Verizon Communications Inc.' }, { id: 74, label: 'W.W. Grainger Inc.' }, { id: 75, label: 'Wells Fargo & Company' }, { id: 76, label: 'Best Buy Co., Inc.' }, { id: 77, label: 'Sprint Corporation' }, { id: 78, label: 'Keybank National Association' }, { id: 79, label: 'CBRE Group, Inc.' }, { id: 80, label: 'AutoNation Inc.' }, { id: 81, label: 'Academy Sports Outdoors' }, { id: 82, label: 'Jones Lang Lasalle Incorporated' }, { id: 83, label: 'SunTrust Banks Inc.' }, { id: 84, label: 'PNC Realty LLC' }, { id: 85, label: 'Citibank' }, { id: 86, label: 'Extended Stay America' }, { id: 87, label: 'United States Postal Service' }, { id: 88, label: 'Verizon Wireless, Inc.' }, { id: 89, label: 'Comerica Bank' }, { id: 90, label: 'Waste Management, Inc.' }, { id: 91, label: 'First-Citizens Bank & Trust Company' }, { id: 92, label: 'IHG Hotels' }, { id: 93, label: '24 Hour Fitness Worldwide, Inc.' }, { id: 94, label: 'Regions Bank' }, { id: 95, label: 'At Home Stores LLC' }, { id: 96, label: 'Progressive Casualty Insurance Company' }, { id: 97, label: 'ADP, LLC' }, { id: 98, label: 'Siemens' }, { id: 99, label: 'Westmont Hospitality Group' }, { id: 100, label: 'Cushman & Wakefield Holdings, Inc.' }, { id: 101, label: 'American Senior Communities, LLC' }, { id: 102, label: 'Iron Mountain Incorporated' }, { id: 103, label: 'Miller Electric Company' }, { id: 104, label: 'Valvoline Instant Oil Change' }, { id: 105, label: 'Southeast General Construction, Inc.' }, { id: 106, label: 'Lidl US, LLC' }, { id: 107, label: 'Lincoln Harris LLC' }, { id: 108, label: 'Marand Builders, Inc.' }, { id: 109, label: 'American Cancer Society' }, { id: 110, label: 'MedExpress' }, { id: 111, label: 'The Union Bank Company' }, { id: 112, label: 'Advance Auto Parts, Inc.' }, { id: 113, label: 'United Parcel Service (CBRE)' }, { id: 114, label: 'Fulton Savings Bank Inc' }, { id: 115, label: 'Bank of the West' }, { id: 116, label: 'SPB Hospitality' }, { id: 117, label: 'Dominion Energy, Inc.' }, { id: 118, label: 'Graham Enterprises, Inc.' }, { id: 119, label: 'THOR ASB - Barneys' }, { id: 120, label: 'US Bancorp' }, { id: 121, label: 'Mapco Express, Inc.' }, { id: 122, label: 'Consumer Petroleum of CT' }, { id: 123, label: 'Holiday Retirement' }, { id: 124, label: "America's Discount Tire Co." }, { id: 125, label: 'Connecticut Water Service Inc' }, { id: 126, label: 'Clean Harbors Environmental Services, Inc.' }, { id: 127, label: 'Ledcor Construction Inc.' }, { id: 128, label: 'Sams Club' }, { id: 129, label: 'Eurest Services, Inc.' }, { id: 130, label: 'Dillards Inc.' }, { id: 131, label: 'Panera Bread Company' }, { id: 132, label: 'United Health Care Services Inc' }, { id: 133, label: 'White Lodging Services Corporation' }, { id: 134, label: 'Truist Financial Corporation' }, { id: 135, label: 'Store Space Self Storage' }, { id: 136, label: 'Elite Building Services' }, { id: 137, label: 'Hiffman National' }, { id: 138, label: 'RKB Handyman Services, Inc.' }, { id: 139, label: 'Atlas Sign Industries of Fla., LLC' }, { id: 140, label: 'Emerus Management Company, LLC' }, { id: 141, label: 'Gordon Food Service Store' }, { id: 142, label: 'Bass Pro, LLC' }, { id: 143, label: 'WolfCRE dba Wolf Commercial Real Estate' }, { id: 144, label: 'Knight-Swift Transportation Holdings Inc.' }, { id: 145, label: 'The Boeing Company' }, { id: 146, label: 'State Farm Mutual Automobile Insurance Company' }, { id: 147, label: 'Amazon.com, Inc.' }, { id: 148, label: 'Livcor, LLC' }, { id: 149, label: 'Prosperity Bank' }, { id: 150, label: 'ISS Facility Services, Inc (Capgemini Service SAS)' }, { id: 151, label: 'Cummins Inc.' }, { id: 152, label: 'Bancorpsouth Bank Securities Corporation' }, { id: 153, label: 'BNSF Railway Company' }, { id: 154, label: 'ABB, Inc.' }, { id: 155, label: 'Hilltop Holdings Inc' }, { id: 156, label: 'Circle K Stores Inc' }, { id: 157, label: 'Albertsons Companies, Inc.' }, { id: 158, label: 'Fresenius Medical Care' }, { id: 159, label: 'Krispy Kreme Doughnuts, Inc.' }, { id: 160, label: 'B&A Property Maintenance' }, { id: 161, label: 'Kimberly-Clark Corporation' }, { id: 162, label: 'Cox Communications Inc.' }, { id: 163, label: 'Cadence Education, LLC' }, { id: 164, label: 'Child Development Schools, Inc.' }, { id: 165, label: 'Johnson Controls Inc' }, { id: 166, label: 'Fedex Corporation' }, { id: 167, label: 'Driven Brands' }, { id: 168, label: 'Accel Schools Ohio LLC' }, { id: 169, label: 'Legal Ascension Health Senior Care Company' }, { id: 170, label: 'Southern California Edison Company' }, { id: 171, label: 'Wesco International, Inc.' }, { id: 172, label: 'ToD Test Account 20220209' }, { id: 173, label: 'TEST CO.' }, { id: 174, label: 'Goodwill, Inc.' }, { id: 175, label: 'TR Test 3/1' }, { id: 176, label: 'SA business Account for w-33832' }, { id: 177, label: 'SauP-TestBusinessAccount' }, { id: 178, label: 'TestBA3222022_01' }, { id: 179, label: 'maynak Om Test Account' }, { id: 181, label: 'FTC Client Portal Enterprise Solutions' }])
    )
  }),

  rest.post(`${apiHost}/api/users/request-access`, (req, res, ctx) => {
    return res(
      ctx.json(true)
    )
  }),

  rest.get(`${apiHost}/api/users/getItem/columns`, (req, res, ctx) => {
    return res(
      ctx.json([{ id: 'pon', visible: true }, { id: 'sites', visible: true }, { id: 'trade', visible: true }, { id: 'service', visible: true }, { id: 'won', visible: true }, { id: 'eta', visible: true }, { id: 'opendate', visible: true }, { id: 'call_type', visible: true }, { id: 'wostat', visible: true }])
    )
  }),

  rest.get(`${apiHost}/api/roles/scopes`, (req, res, ctx) => {
    return res(
      ctx.json([{ id: 1, name: 'Admin', createUsers: 'yes', editUsers: 'yes', deleteUsers: 'yes', woView: 'yes', manageRoles: 'yes', reportScheduler: 'yes', clientId: null }, { id: 2, name: 'View Only', createUsers: 'no', editUsers: 'no', deleteUsers: 'no', woView: 'yes', manageRoles: 'no', reportScheduler: 'no', clientId: null }, { id: 3, name: 'Test Role', createUsers: 'yes', editUsers: 'yes', deleteUsers: 'yes', woView: 'no', manageRoles: 'yes', reportScheduler: 'yes', clientId: null }, { id: 4, name: 'Master Admin', createUsers: 'yes', editUsers: 'yes', deleteUsers: 'yes', woView: 'yes', manageRoles: 'yes', reportScheduler: 'yes', clientId: null }])
    )
  }),

  rest.get(`${apiHost}/api/roles`, (req, res, ctx) => {
    return res(
      ctx.json([{ id: 1, name: 'Admin', created_at: '2021-09-21T14:27:35.000Z', updated_at: '2021-09-21T14:27:35.000Z', deleted_at: null, enabled: true, client_id: null }, { id: 2, name: 'View Only', created_at: '2021-09-21T14:27:37.000Z', updated_at: '2021-09-21T14:27:35.000Z', deleted_at: null, enabled: true, client_id: null }, { id: 3, name: 'Test Role', created_at: '2021-11-29T21:23:11.000Z', updated_at: '2021-11-29T21:23:11.000Z', deleted_at: null, enabled: true, client_id: null }, { id: 4, name: 'Master Admin', created_at: '2021-12-09T15:54:25.377Z', updated_at: '2021-12-09T15:54:25.377Z', deleted_at: null, enabled: true, client_id: null }])
    )
  }),

  rest.get(`${apiHost}/api/users`, (req, res, ctx) => {
    return res(
      ctx.json([{ id: 1, name: 'Mario', first_name: null, last_name: 'Lopez', role: 'Administrator', created_at: '2021-09-30T10:08:52.000Z', updated_at: '2021-09-30T10:09:03.000Z', deleted_at: null, enabled: true, pending_confirmation: false, invitation_token: 'e1328b0da1b8a33e935c19b2943fa35e4bebf2c90c0121fa249e900f8ecc3426', masquerade_client: null, profile_pic: 'https://use2-621151366817-staging-besportal-s3.s3.us-east-2.amazonaws.com/account-profile-pics/1/user_1_2022-31-3_11-46-57.png', client_id: 4, roles: [{ id: 1, name: 'Admin' }], userCredentials: { username: 'admin', email: 'mlopez@automateddecision.com', userId: 1 } }, { id: 304, name: 'Mo Tester', first_name: null, last_name: null, role: 'Tester', created_at: '2022-05-05T21:47:24.640Z', updated_at: '2022-05-05T21:47:24.640Z', deleted_at: null, enabled: true, pending_confirmation: true, invitation_token: '5a6d4624a9ed1fa4b898e1182a35a8c3cfb3ac32b9b2f5b1b25569180e76a405', masquerade_client: null, profile_pic: null, client_id: 4, roles: [{ id: 1, name: 'Admin' }], userCredentials: { username: 'msarraj24+11@automateddecision.com', email: 'msarraj24+11@automateddecision.com', userId: 304 } }, { id: 306, name: 'TestPreSt1', first_name: null, last_name: null, role: 'Tester', created_at: '2022-05-06T15:13:59.163Z', updated_at: '2022-05-06T15:13:59.163Z', deleted_at: null, enabled: true, pending_confirmation: true, invitation_token: '91d9bb207b2a667556576aefae5e8251063a6f3935e8937407eea57d0b1c800e', masquerade_client: null, profile_pic: null, client_id: 4, roles: [{ id: 1, name: 'Admin' }], userCredentials: { username: 'testprestbv1@superrito.com', email: 'testprestbv1@superrito.com', userId: 306 } }, { id: 307, name: 'Testing Martin', first_name: null, last_name: null, role: 'Testing Role', created_at: '2022-05-06T17:47:05.640Z', updated_at: '2022-05-06T17:47:05.640Z', deleted_at: null, enabled: true, pending_confirmation: false, invitation_token: '88755ed7dc714625e48a949d3b15df4503d76ee78725b430dd1c5750ecea3668', masquerade_client: null, profile_pic: null, client_id: 4, roles: [{ id: 1, name: 'Admin' }], userCredentials: { username: 'cristianma.2109@windowslive.com', email: 'cristianma.2109@windowslive.com', userId: 307 } }, { id: 309, name: 'Tester User', first_name: null, last_name: null, role: 'Tester', created_at: '2022-05-06T21:23:42.830Z', updated_at: '2022-05-06T21:23:42.830Z', deleted_at: null, enabled: true, pending_confirmation: true, invitation_token: '432809f8ce313b2bfe377bc67b5a2635124efcaf3cdabe83e41089cff9f17d62', masquerade_client: null, profile_pic: null, client_id: 4, roles: [{ id: 1, name: 'Admin' }], userCredentials: { username: 'msarraj+12@automateddecision.com', email: 'msarraj+12@automateddecision.com', userId: 309 } }, { id: 312, name: 'Test Peterson', first_name: null, last_name: null, role: 'Testing Role', created_at: '2022-05-12T15:14:39.837Z', updated_at: '2022-05-12T15:14:39.837Z', deleted_at: null, enabled: true, pending_confirmation: true, invitation_token: '954aef8378c473e55cd87b78c87ebb8fd2bc50103eee3fc16ac834a8d92b3a75', masquerade_client: null, profile_pic: null, client_id: 4, roles: [{ id: 1, name: 'Admin' }], userCredentials: { username: 'info@automateddecision.com', email: 'info@automateddecision.com', userId: 312 } }, { id: 313, name: 'Eryn 2', first_name: null, last_name: null, role: 'BOSSWOMAN', created_at: '2022-05-17T19:44:29.813Z', updated_at: '2022-05-17T19:44:29.813Z', deleted_at: null, enabled: true, pending_confirmation: true, invitation_token: '67f2e296fe207520bf0234f8a4c4a3fc6855388a0c70cc29d9ff04420ef3cd49', masquerade_client: null, profile_pic: null, client_id: 4, roles: [{ id: 1, name: 'Admin' }], userCredentials: { username: 'info@automateddecision.com', email: 'info@automateddecision.com', userId: 313 } }])
    )
  }),

  rest.put(`${apiHost}/api/users/:id`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 1, name: 'Mario m', first_name: null, last_name: 'Lopez', role: 'Administrator', created_at: '2021-09-30T10:08:52.000Z', updated_at: '2021-09-30T10:09:03.000Z', deleted_at: null, enabled: true, pending_confirmation: false, invitation_token: 'e1328b0da1b8a33e935c19b2943fa35e4bebf2c90c0121fa249e900f8ecc3426', masquerade_client: null, profile_pic: 'https://use2-621151366817-staging-besportal-s3.s3.us-east-2.amazonaws.com/account-profile-pics/1/user_1_2022-31-3_11-46-57.png', client_id: 4 })
    )
  }),

  rest.post(`${apiHost}/api/users/account-info`, (req, res, ctx) => {
    return res(
      ctx.json(true)
    )
  }),

  rest.post(`${apiHost}/api/users`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 314, name: 'Santiago test', role: 'Admin', created_at: '2022-05-25T15:00:49.817Z', updated_at: '2022-05-25T15:00:49.817Z', enabled: true, pending_confirmation: true, invitation_token: '385500f0af18ef083bb098283113de6fc5c99ac7f665f4ca46b03f4689854fbe', client_id: 4 })
    )
  }),

  rest.post(`${apiHost}/api/service/request`, (req, res, ctx) => {
    return res(
      ctx.json({ status: true })
    )
  }),

  rest.post(`${apiHost}/api/notifications/send`, (req, res, ctx) => {
    return res(
      ctx.json(true)
    )
  })
]
