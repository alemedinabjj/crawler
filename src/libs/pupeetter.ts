import puppeteer from 'puppeteer'

export const getBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  })

  return browser
}
