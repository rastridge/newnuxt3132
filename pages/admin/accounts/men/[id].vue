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
  // Get account id to edit
  //
  const route = useRoute()
  const id = route.params.id

  //
  // Initialize Edit form state
  //
  const { data: state } = await useFetch(`/accounts/${id}`, {
    key: id,
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  //
  // Accounts form submit action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitEdit('accounts', form_state)
    if (alert.message === null) {
      navigateTo(`/admin/accounts/men`)
    }
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Member Account</Title>
    </Head>
    <!-- state = {{ state }} -->
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
