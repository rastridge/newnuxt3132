import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()

export default function useSMS() {
  const addSMS = async (state, send) => {
    const { data } = await useFetch('https://nuxt3.buffalorugby.org/sms/add', {
      method: 'post',
      body: state,
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    state.sms_id = data.value.insertId
    if (send === 'sendNow') {
      await useFetch('https://nuxt3.buffalorugby.org/sms/send', {
        method: 'post',
        body: state,
        headers: {
          authorization: 'Bearer ' + auth.user.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    }
    navigateTo('/admin/sms')
  }

  const editSMS = async (state, send) => {
    await useFetch('https://nuxt3.buffalorugby.org/sms/edit', {
      // await useFetch('/sms/edit', {
      method: 'post',
      body: state,
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    if (send === 'sendNow') {
      // await useFetch('https://nuxt3.buffalorugby.org/sms/send', {
      await useFetch('/sms/send', {
        method: 'post',
        body: state,
        headers: {
          authorization: 'Bearer ' + auth.user.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    }
    navigateTo('/admin/sms')
  }
  return { editSMS, addSMS }
}
