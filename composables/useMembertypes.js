import { useAuthStore } from '~/stores/authStore'

export default function useMembertypes() {
  const auth = useAuthStore()
  //
  // get member admin types for select
  async function getMemberAdminTypeOptions() {
    const { data, error } = await useFetch(
      'https://nuxt3.buffalorugby.org/accounts/memberadmintypes',
      {
        method: 'get',
        headers: {
          authorization: 'Bearer ' + auth.user.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not get data from /accounts/memberadmintypes`,
      })
    }
    // convert for formkit
    let result = []
    data.value.map((old) => {
      let n = {}
      n.label = old.member_admin_type
      n.value = old.member_admin_type_id
      result.push(n)
    })
    return result
  }

  //
  // get member types
  async function getMemberTypeOptions() {
    const { data } = await useFetch(
      'https://nuxt3.buffalorugby.org/accounts/membertypes',
      {
        method: 'get',
        headers: {
          authorization: 'Bearer ' + auth.user.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    // convert for formkit
    let result = []
    data.value.map((old) => {
      let n = {}
      n.label = old.member_type
      n.value = old.member_type_id
      result.push(n)
    })
    return result
  }

  return {
    getMemberAdminTypeOptions,
    getMemberTypeOptions,
  }
}
