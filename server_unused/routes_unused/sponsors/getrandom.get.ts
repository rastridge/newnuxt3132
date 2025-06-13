import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler(async (event) => {
  return sponsorsService.getRandom()
})
