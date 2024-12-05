<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { $dayjs } = useNuxtApp()

  const { onSubmitAdd } = useSubmit()

  const dt = $dayjs()

  const state = ref({
    content_release_dt: dt.format('YYYY-MM-DD'),
    content_expire_dt: dt.add(28, 'day').format('YYYY-MM-DD'),
    content_body: '',
  })

  //
  // Content form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitAdd('content', form_state)
    navigateTo(`/admin/content`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add Custom page</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add custom page" />
      </div>
      <content-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
