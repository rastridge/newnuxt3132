import { atestingService } from '~/server/services/atestingService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body.email
  return atestingService.sendAwait(email)
})
