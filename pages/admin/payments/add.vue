<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { $dayjs } = useNuxtApp()

  const { onSubmitAdd } = useSubmit()

  const dt = $dayjs()
  // initialize add form
  const state = ref({
    release_dt: dt.format('YYYY-MM-DD'),
    expire_dt: dt.add(28, 'day').format('YYYY-MM-DD'),
  })

  //
  // payments form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitAdd('payments', form_state)
    navigateTo(`/admin/payments`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add payment</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add payment" />
      </div>
      <payments-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
