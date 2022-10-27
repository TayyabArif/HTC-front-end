'use strict'

const puppeteer = require('puppeteer')

/**
 * Init puppeteer browser and page
 *
 * @param defaultViewport
 * @returns {Promise<{browser: *, page: *}>}
 */
export const init = async (defaultViewport = true) => {
  const browser = await puppeteer.launch({
    headless: true,
    ...(defaultViewport && { defaultViewport: null }),
    args: ['--window-size=1920,1080'],
    // devtools: true,
    waitForInitialPage: true
  })

  const page = await browser.newPage()

  if (page) {
    await page.goto(`http://localhost:${process.env.PORT}`, {
      waitUntil: 'networkidle0'
    })
  } else {
    throw 'Unable to launch the initial page'
  }

  return {
    browser,
    page
  }
}

/**
 * Default login flow
 *
 * @param page
 * @returns {Promise<void>}
 */
export const login = async (page) => {
  await page.click('input#email')
  await page.type('input#email', 'xx@xxx.com')
  await page.click('input#password')
  await page.type('input#password', 'xxxx')
  await page.click('#sign_in_button')
  await page.waitForNavigation()
  const masqueradeComponent = await page.$('[data-testid="masquerade_page"]')
  expect(masqueradeComponent).not.toBeNull()

  await page.click('input[name="client"]')
  await page.type('input[name="client"]', 'Starbucks')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  await page.click('[type="submit"]')
  await page.waitForNavigation()

  const dashboardPage = await page.$('[data-testid="dashboard_page"]')
  expect(dashboardPage).not.toBeNull()
}
