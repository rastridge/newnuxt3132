<script setup>
  import { useAlertStore } from '~/stores/alertStore'
  // import useAccountInfo from '../../server/utils/useAccountInfo'
  const alert = useAlertStore()
  const { onSubmitUpdate } = useSubmit()
  // const { emailExists } = useAccountInfo()
  //
  //
  const route = useRoute()
  const id = route.params.id
  //
  // Test for legitimate account_id parameter
  //
  const hasOne = ref(true)
  const state = ref({})

  // check legitimate paramemter
  if (id.length > 16 || id.length < 13) {
    hasOne.value = false
  }
  //
  // if legit get account data
  //
  if (hasOne.value) {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/accounts/getupdateinfo/${id}`,
      {
        method: 'get',
      },
    )

    // console.log('exists = ', emailExists)

    state.value = data.value
    hasOne.value = Object.keys(state.value).length !== 0
  }
  // if not legit account_id
  if (!hasOne.value) {
    navigateTo('/')
  }
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
    <!--     dont call form if not legit
 -->
    <div v-if="hasOne">
      <register-update-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
