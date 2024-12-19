<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitAdd } = useSubmit()

  //
  // Initialize form
  //
  const state = ref({})

  const onSubmit = async function (state) {
    await onSubmitAdd('videos', state)
    navigateTo(`/admin/videos`)
  }
</script>

<template>
  <div>
    <Head>
      <Title> Add Video</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add Video" />
      </div>
      <videos-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
