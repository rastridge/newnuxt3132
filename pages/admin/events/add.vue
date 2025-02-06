<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { $dayjs } = useNuxtApp()

  const { onSubmitAdd } = useSubmit()

  // Format for Primevue calendar
  const dt = $dayjs()
  // initialize form data
  const state = ref({
    // Format for Primevue calendar
    release_dt: dt.format('YYYY-MM-DD'),
    event_dt: dt.add(7, 'day').format('YYYY-MM-DD'),
    expire_dt: dt.add(28, 'day').format('YYYY-MM-DD'),
  })
  //
  // Events form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitAdd('events', form_state)
    navigateTo(`/admin/events`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add events Item</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add Events" />
      </div>
      <events-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<style scoped></style>
