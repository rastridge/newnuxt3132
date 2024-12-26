import { atestingService } from '~/server/services/atestingService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body.email
  console.log('in sendawait route')
  return atestingService.sendAwait(email)
})
