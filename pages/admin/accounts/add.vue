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

  const state = {
    member_year: $dayjs().format('YYYY'),
    account_addr_phone: '+1716',
    member_show_phone: '1',
    account_addr_state: 'NY',
    account_addr_street_ext: '',
    account_addr_country: 'US',
    member_show_addr: '1',
    member_type_id: '',
    member_type2_id: '',
    member_admin_type_id: '0',
    member_admin_type2_id: '0',
    member_prev_club: 'None',
    newsletter_recipient: '1',
    mail_recipient: '0',
    sms_recipient: '1',
  }

  //
  // Accounts form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitAdd('accounts', form_state)
    // roster check
    if (alert.message === null) {
      navigateTo(`/admin/accounts`)
    }
  }
</script>
