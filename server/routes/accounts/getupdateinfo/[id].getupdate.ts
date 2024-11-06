import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  if (id.length() < 3) {
    return accountsService.getOne(id)
  } else {
    return 'restricted'
  }
})
