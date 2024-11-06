<script setup>
  import { useAlertStore } from '~/stores/alertStore'
  const alert = useAlertStore()
  const { onSubmitUpdate } = useSubmit()
  //
  //
  const route = useRoute()
  const id = route.params.id
  //if(id.length() <=4 ) {'attempting to pass actual account_id'}
  // account_id follows the 'I'
  const account_id = ref(id.substring(id.lastIndexOf('I') + 1, id.length))

  //
  // Update Account form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitUpdate('accounts', form_state)
    if (alert.message === null) {
      navigateTo(`/update/thankyou`)
    }
  }
</script>

<template>
  <div>
    <Head>
      <Title>Update Your Member Info</Title>
    </Head>
    <common-header title="Update Membership" />
    <register-update-form
      :id="account_id"
      @submitted="onSubmit"
    />
  </div>
</template>
