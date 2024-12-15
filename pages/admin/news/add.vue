<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitAdd } = useSubmit()
  const { $dayjs } = useNuxtApp()

  //
  // Initialize Add form
  //
  const dt = $dayjs()
  const state = ref({
    news_release_dt: dt.format('YYYY-MM-DD'),
    news_event_dt: dt.add(7, 'day').format('YYYY-MM-DD'),
    news_expire_dt: dt.add(28, 'day').format('YYYY-MM-DD'),
  })

  //
  //
  // News form action
  //
  const onSubmit = async function (state) {
    await onSubmitAdd('news', state)
    navigateTo(`/admin/news`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add News Item</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add News Item" />
      </div>
      <news-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
