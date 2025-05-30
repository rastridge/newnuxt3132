<script setup>
  import { useAlertStore } from '~/stores/alertStore'
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })
  const alert = useAlertStore()
  const { onSubmitEdit } = useSubmit()

  //
  // Initialize Edit form state
  //
  const route = useRoute()
  const id = route.params.id
  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/accounts/${id}`,
    {
      method: 'get',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  //
  // Accounts form submit action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitEdit('accounts', form_state)
    // roster check
    if (alert.message === null) {
      navigateTo(`/admin/accounts`)
    }
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Member Account</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Member Account" />
      </div>
      <accounts-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
