import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()

export default function useSMS() {
  const addSMS = async (state, send) => {
    const { data } = await useFetch(
      'https://nuxt3.buffalorugby.org/sms/addone',
      {
        method: 'post',
        body: state,
        headers: {
          authorization: auth.user.token,
        },
      },
    )
    state.sms_id = data.value.insertId
    if (send === 'sendNow') {
      await useFetch('https://nuxt3.buffalorugby.org/sms/send', {
        method: 'post',
        body: state,
        headers: {
          authorization: auth.user.token,
        },
      })
    }
    navigateTo('/admin/sms')
  }

  const editSMS = async (state, send) => {
    await useFetch('https://nuxt3.buffalorugby.org/sms/editone', {
      method: 'post',
      body: state,
      headers: {
        authorization: auth.user.token,
      },
    })
    if (send === 'sendNow') {
      await useFetch('https://nuxt3.buffalorugby.org/sms/send', {
        method: 'post',
        body: state,
        headers: {
          authorization: auth.user.token,
        },
      })
    }
    navigateTo('/admin/sms')
  }
  return { editSMS, addSMS }
}
