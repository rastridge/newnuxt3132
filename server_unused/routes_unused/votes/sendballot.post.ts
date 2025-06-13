import { votesService } from '~/server/services/votesService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body.email
  return votesService.sendBallot(email)
})
