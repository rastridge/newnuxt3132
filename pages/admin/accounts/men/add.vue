<template>
  <div>
    <Head>
      <Title>Add Account</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add account" />
      </div>

      <accounts-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
  import { useAlertStore } from '~/stores/alertStore'
  definePageMeta({
    middleware: ['auth'],
  })
  const alert = useAlertStore()
  const { onSubmitAdd } = useSubmit()
  const { $dayjs } = useNuxtApp()

  //
  // initialize form for add
  //
  const state = ref({})
  state.value.member_year = $dayjs().format('YYYY')
  state.value.account_addr_phone = '+1716'
  // state.value.account_addr_phone = null
  state.value.member_show_phone = '1'
  state.value.account_addr_state = 'NY'
  state.value.account_addr_street_ext = ''
  state.value.account_addr_country = 'US'
  state.value.member_show_addr = '1'
  state.value.member_type_id = '2'
  state.value.member_type2_id = '14'
  state.value.member_admin_type_id = '0'
  state.value.member_admin_type2_id = '0'
  state.value.member_prev_club = 'None'
  state.value.newsletter_recipient = '1'
  state.value.mail_recipient = '0'
  state.value.sms_recipient = '1'
  //
  // Accounts form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitAdd('accounts', form_state)
    if (alert.message === null) {
      navigateTo(`/admin/accounts/men`)
    }
  }
</script>
