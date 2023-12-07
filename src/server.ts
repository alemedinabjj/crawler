import { getBrowser } from './libs/pupeetter'
import { emailService } from './services/emailService'

async function runMonitor(query: string) {
  const browser = await getBrowser()
  const page = await browser.newPage()

  await Promise.all([
    console.log('Waiting for navigation...'),
    page.waitForNavigation(),
    page.goto(`https://infojobs.com.br`),

    console.log('Waiting for selector...'),
  ])

  const aggreeButton = await page.$('#didomi-notice-agree-button')

  if (aggreeButton) {
    await aggreeButton.click()
  }

  await page.waitForSelector('#keywordsCombo')

  const searchInput = await page.$('#keywordsCombo')

  if (!searchInput) {
    throw new Error('Search input not found')
  }

  await searchInput.type(query)

  await Promise.all([
    console.log('Waiting for navigation...'),
    page.waitForNavigation(),
    searchInput.press('Enter'),

    console.log('Waiting for selector...'),
  ])

  await page.waitForSelector('.js_cardLink')

  const jobs = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('.js_cardLink')

    const jobs = [...nodeList]

    return jobs.map((job) => {
      const title = job.querySelector('h2')?.textContent
      const company = job.querySelector('.text-body a')?.textContent
      const location = job.querySelector('.mr-24')?.textContent

      const description = job
        .querySelectorAll('.small.text-medium:not(.mr-24)')
        .item(1)?.textContent

      const formatedDescription = description?.replace(/\n/g, '').trim()
      const formatedLocation = location?.replace(/\n/g, '').trim()
      const formatedCompany = company?.replace(/\n/g, '').trim()
      const formatedTitle = title?.replace(/\n/g, '').trim()
      const link = job.querySelector('a')?.getAttribute('href')

      return {
        title: formatedTitle,
        company: formatedCompany,
        location: formatedLocation,
        description: formatedDescription,
        link,
      }
    })
  })

  return jobs
}

async function run() {
  const jobs = await runMonitor('fullstack javascript')
  console.log(jobs)

  if (jobs.length > 0) {
    await emailService.sendEmail({
      subject: 'Vaga de Fullstack Javascript encontrada',
      template: 'jobs',
      body: {
        jobs,
        date: new Intl.DateTimeFormat('pt-BR').format(new Date()),
      },
    })
  }

  return jobs
}

run()
  .then(() => {
    console.log('Done')
  })
  .catch((err) => {
    console.log(err)
  })
