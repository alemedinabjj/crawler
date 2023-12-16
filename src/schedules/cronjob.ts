import { ScheduleOptions, schedule } from 'node-cron'
import { run } from '../fn/run'

const options: ScheduleOptions = {
  scheduled: true,
  timezone: 'America/Sao_Paulo',
}

const runSchedule = schedule(
  // todo dia 12h
  '0 12 * * *',
  // a cada 10 segundos
  // '*/10 * * * * *',
  async () => {
    try {
      await run()
    } catch (error) {
      console.log(error)
    }
  },
  options,
)

export { runSchedule }
