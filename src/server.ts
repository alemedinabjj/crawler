import { getBrowser } from './libs/pupeetter'
import { emailService } from './services/emailService'

async function scrapeJobs(page) {
  console.log('Waiting for selector...')
  await page.waitForSelector('.js_cardLink')

  const jobs = await page.evaluate(() => {
    const jobNodes = Array.from(document.querySelectorAll('.js_cardLink'))

    return jobNodes.map((job) => {
      const title = job.querySelector('h2')?.textContent?.trim()
      const company = job.querySelector('.text-body a')?.textContent?.trim()
      const location = job.querySelector('.mr-24')?.textContent?.trim()
      const description = job
        .querySelectorAll('.small.text-medium:not(.mr-24)')[1]
        ?.textContent?.trim()
      const link = job.querySelector('a')?.getAttribute('href')

      return {
        title,
        company,
        location,
        description,
        link,
      }
    })
  })

  return jobs
}

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

  const jobs = await scrapeJobs(page)

  return jobs
}

async function run() {
  try {
    const jobs = await runMonitor('fullstack javascript')
    console.log(jobs)

    if (jobs.length <= 0) {
      return
    }

    await emailService.sendEmail({
      subject: 'Vaga de Fullstack Javascript encontrada',
      template: 'jobs',
      body: {
        jobs,
        date: new Intl.DateTimeFormat('pt-BR').format(new Date()),
      },
    })

    return jobs
  } catch (err) {
    console.log(err)
  }
}

run()
  .then(() => {
    console.log('Done')
  })
  .catch((err) => {
    console.log(err)
  })
