import puppeteer from 'puppeteer'

export const getBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
    // executablePath: 'usr/bin/chromium-browser',
  })

  return browser
}
