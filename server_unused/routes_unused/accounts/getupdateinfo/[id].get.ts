import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  if (id.length > 16 || id.length < 13) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  } else {
    // account_id follows the 'I'
    const account_id = id.substring(id.lastIndexOf('I') + 1, id.length)
    return accountsService.getOne(account_id)
  }
})
