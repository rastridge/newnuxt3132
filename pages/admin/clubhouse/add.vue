<template>
  <div>
    <Head>
      <Title>Add clubhouse Item</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add clubhouse item" />
      </div>
      <clubhouse-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['auth'],
  })

  const { onSubmitAdd } = useSubmit()

  // initial ize form data
  const state = {}
  //
  // archives form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitAdd('clubhouse', form_state)
    navigateTo(`/admin/clubhouse`)
  }
</script>
