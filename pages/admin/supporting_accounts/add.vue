<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitAdd } = useSubmit()

  //
  // Initial Add state
  //
  const state = ref({})

  // Sponsors form action
  //
  const onSubmit = async function (state) {
    await onSubmitAdd('supporting_accounts', state)
    navigateTo(`/admin/supporting_accounts`)
  }
</script>

<template>
  <div>
    <Head>
      <Title> Add Supporting Acct</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add Supporting Accounts" />
      </div>
      <supportingaccounts-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
