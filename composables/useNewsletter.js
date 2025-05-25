import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()

export default function useNewsletter() {
  const addNewsletter = async (state, send) => {
    const { data } = await useFetch(
      'https://nuxt3.buffalorugby.org/newsletters/addone',
      {
        method: 'post',
        body: state,
        headers: {
          authorization: auth.user.token,
        },
      },
    )

    state.newsletter_id = data.value.insertId
    if (send === 'sendNow') {
      await useFetch(
        'https://nuxt3.buffalorugby.org/newsletters/sendnewsletter',
        {
          method: 'post',
          body: state,
          headers: {
            authorization: auth.user.token,
          },
        },
      )
    }
  }

  const editNewsletter = async (state, send) => {
    await useFetch('https://nuxt3.buffalorugby.org/newsletters/editone', {
      method: 'post',
      body: state,
      headers: {
        authorization: auth.user.token,
      },
    })

    if (send === 'sendNow') {
      await useFetch(
        'https://nuxt3.buffalorugby.org/newsletters/sendnewsletter',
        {
          method: 'post',
          body: state,
          headers: {
            authorization: auth.user.token,
          },
        },
      )
    }
  }
  return { addNewsletter, editNewsletter }
}
