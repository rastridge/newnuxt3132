<script setup>
  import { useAlertStore } from '~/stores/alertStore'
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  const { $dayjs } = useNuxtApp()

  definePageMeta({
    middleware: ['auth'],
  })

  const alert = useAlertStore()
  const { onSubmitEdit } = useSubmit()

  //
  // Initialize Edit form
  //
  const route = useRoute()
  const id = route.params.id
  const { data: state } = await useFetch(`/accounts_flag/${id}`, {
    key: id,
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })
  // adjust date for formkit date input
  state.value.member_dob = $dayjs(state.value.member_dob).format('YYYY-MM-DD')

  //
  // Accounts form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitEdit('accounts_flag', form_state)
    if (alert.message === null) {
      navigateTo(`/admin/accounts_flag`)
    }
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Flag Account</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit flag account" />
      </div>
      <accounts-flag-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
