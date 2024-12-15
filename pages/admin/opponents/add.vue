<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitAdd } = useSubmit()

  const state = ref({})
  // Opponents form action
  //
  const onSubmit = async function (state) {
    await onSubmitAdd('opponents', state)
    navigateTo(`/admin/opponents`)
  }
</script>

<template>
  <div>
    <Head>
      <Title> Add Opponent</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add opponent" />
      </div>
      <opponents-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
