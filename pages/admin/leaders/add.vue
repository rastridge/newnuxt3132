<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitAdd } = useSubmit()
  const state = { leaders_year: null }

  // Sponsors form action
  //
  const onSubmit = async function (state) {
    await onSubmitAdd('leaders', state)
    navigateTo(`/admin/leaders`)
  }
</script>

<template>
  <div>
    <Head>
      <Title> Add leaders</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add leaders" />
      </div>
      <leaders-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
