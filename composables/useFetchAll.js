import { useAuthStore } from '~/stores/authStore'

export default function useFetchAll() {
  const auth = useAuthStore()

  const getAll = async (app) => {
    const { data } = await useFetch(`https://nuxt3.buffalorugby.org/${app}`, {
      method: 'get',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    return { data }
  }

  const deleteOne = async (app, id) => {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/${app}/delete/${id}`,
      {
        method: 'get',
        headers: {
          authorization: 'Bearer ' + auth.user.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return data
  }

  const changeStatusOne = async (app, { id, status }) => {
    await useFetch(`https://nuxt3.buffalorugby.org/${app}/status`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: { id, status },
    })
  }
  return {
    getAll,
    deleteOne,
    changeStatusOne,
  }
}
