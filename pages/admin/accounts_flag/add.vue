<template>
  <div>
    <Head>
      <Title>Add Flag Account</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add flag account" />
      </div>

      <accounts-flag-form
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
  const state = {
    member_year: $dayjs().format('YYYY'),
    account_addr_phone: '+1716',
    account_addr_state: 'NY',
    account_addr_street_ext: '',
    account_addr_country: 'US',
    member_type_id: '11',
    member_dob: '',
    newsletter_recipient: '1',
    mail_recipient: '0',
    sms_recipient: '1',
    member_type_id: '11',
  }
  //
  // Accounts form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitAdd('accounts_flag', form_state)
    if (alert.message === null) {
      navigateTo(`/admin/accounts_flag`)
    }
  }
</script>
