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
    const { data } = await useFetch(`/${app}/updateone`, {
      method: 'post',
      body: form_state,
    })

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  const onSubmitEdit = async function (app, form_state) {
    const { data } = await useFetch(`/${app}/editone`, {
      method: 'post',
      body: form_state,
      headers: {
        authorization: auth.user.token,
      },
    })

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  const onSubmitAdd = async function (app, form_state) {
    const { data } = await useFetch(`/${app}/addone`, {
      method: 'post',
      body: form_state,
      headers: {
        authorization: auth.user.token,
      },
    })

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  const onSubmitAddByGuest = async function (app, form_state) {
    const { data } = await useFetch(`/${app}/addonebyguest`, {
      method: 'post',
      body: form_state,
    })

    if (data.value.message) {
      // message if email exists, null if not
      alert.error(data.value.message)
    }
  }

  return { onSubmitUpdate, onSubmitEdit, onSubmitAdd, onSubmitAddByGuest }
}
