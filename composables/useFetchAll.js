import { useAuthStore } from '~/stores/authStore'
// import jwt from 'jsonwebtoken'

export default function useFetchAll() {
  const auth = useAuthStore()
  console.log('useFetchAll', auth.user.token)

  const getAll = async (app) => {
    const { data } = await useFetch(`https://nuxt3.buffalorugby.org/${app}`, {
      method: 'get',
      headers: {
        authorization: auth.user.token,
        /*         authorization: jwt.sign(
          {
            userId: '1',
            email: 'rfa@me.com',
          },
          'ronaldfastridgejr',
          { expiresIn: '1h' },
        ), */
      },
    })
    return { data }
  }

  const deleteOne = async (app, id) => {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/${app}/${id}`,
      {
        method: 'DELETE',
        headers: {
          authorization: auth.user.token,
        },
      },
    )
    return data
  }

  const changeStatusOne = async (app, { id, status }) => {
    await useFetch(`https://nuxt3.buffalorugby.org/${app}/status`, {
      method: 'POST',
      headers: {
        authorization: auth.user.token,
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
