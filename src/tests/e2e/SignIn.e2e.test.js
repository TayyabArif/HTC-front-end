import '@testing-library/jest-dom'
import { init } from './e2e'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}))

let page, browser

describe('Sign In Page tests', () => {
  beforeAll(async () => {
    const initObj = await init()

    browser = initObj.browser
    page = initObj.page
  }, 10000)

  test('Forgot Password Flow', async () => {
    await page.click('[data-testid="forgot_password"]')
    const forgotPasswordPage = await page.$('[data-testid="forgot_password_page"]')
    expect(forgotPasswordPage).not.toBeNull()

    await page.click('input#email')
    await page.type('input#email', 'xx@xxx.com')
    await page.click('[data-testid="submit_button"]')
    await page.waitForNavigation()
    const forgotPasswordChangedPage = await page.$('[data-testid="forgot_password_sent"]')
    expect(forgotPasswordChangedPage).not.toBeNull()

    await page.click('[data-testid="log_in"]')
    const signInPage = await page.$('[data-testid="sign_in_page"]')
    expect(signInPage).not.toBeNull()
  }, 10000)

  test('Request Access Flow', async () => {
    await page.click('[data-testid="request_access_button"]')
    const requestAccessPage = await page.$('[data-testid="request_access_page"]')
    expect(requestAccessPage).not.toBeNull()

    await page.click('input#domain')
    await page.type('input#domain', 'xxx.com')
    await page.click('[data-testid="next_button"]')

    await page.click('input#first_name')
    await page.type('input#first_name', 'first name')

    await page.click('input#last_name')
    await page.type('input#last_name', 'last name')

    await page.click('input#email')
    await page.type('input#email', 'xx@xxx.com')

    await page.click('input#company_name')
    await page.type('input#company_name', 'company')

    await page.click('[type="submit"]')
    await page.waitForNavigation()
    const requestAccessSendPage = await page.$('[data-testid="request_access_sent_page"]')
    expect(requestAccessSendPage).not.toBeNull()

    await page.click('[data-testid="back_to_login"]')
    const signInPage = await page.$('[data-testid="sign_in_page"]')
    expect(signInPage).not.toBeNull()
  }, 10000)

  test('Sign In Flow', async () => {
    await page.click('input#email')
    await page.type('input#email', 'xx@xxx.com')
    await page.click('input#password')
    await page.type('input#password', 'xxxx')
    await page.click('#sign_in_button')
    await page.waitForNavigation()
    const masqueradeComponent = await page.$('[data-testid="masquerade_page"]')
    expect(masqueradeComponent).not.toBeNull()
  }, 10000)

  test('Masquerade', async () => {
    await page.click('input[name="client"]')
    await page.type('input[name="client"]', 'Starbucks')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    await page.click('[type="submit"]')
    await page.waitForNavigation()
    await browser.close()
  }, 10000)
})
