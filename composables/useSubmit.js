//
// used in all except Newsletters and SMS
// because they must handle Send Now Send Later
//
import { useAuthStore } from '~/stores/authStore'
import { useAlertStore } from '~/stores/alertStore'

export default function useSubmit() {
  const auth = useAuthStore()
  const alert = useAlertStore()

  const onSubmitUpdate = async function (app, form_state) {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/${app}/updateone`,
      {
        method: 'post',
        body: form_state,
      },
    )

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  const onSubmitEdit = async function (app, form_state) {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/${app}/editone`,
      {
        method: 'post',
        body: form_state,
        headers: {
          authorization: 'Bearer ' + auth.user.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  const onSubmitAdd = async function (app, form_state) {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/${app}/addone`,
      {
        method: 'post',
        body: form_state,
        headers: {
          authorization: 'Bearer ' + auth.user.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  const onSubmitAddByGuest = async function (app, form_state) {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/${app}/addonebyguest`,
      {
        method: 'post',
        body: form_state,
      },
    )

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  return { onSubmitUpdate, onSubmitEdit, onSubmitAdd, onSubmitAddByGuest }
}
