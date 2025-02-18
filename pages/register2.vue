<script setup>
  import { useAlertStore } from '~/stores/alertStore'
  const alert = useAlertStore()
  const { onSubmitAddByGuest } = useSubmit()

  //
  // Accounts form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitAddByGuest('accounts', form_state)
    if (alert.message === null) {
      navigateTo(`/registered2`)
    }
  }
</script>

<template>
  <div>
    <Head>
      <Title>Register to Try Out</Title>
    </Head>
    <common-header title="Register to Try Out" />
    <register-form2 @submitted="onSubmit" />
  </div>
</template>
