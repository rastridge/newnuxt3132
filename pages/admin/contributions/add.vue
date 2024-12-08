<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { $dayjs } = useNuxtApp()
  const { onSubmitAdd } = useSubmit()

  //
  // initialize add form
  //
  const state = {
    contribution_id: '',
    contribution_date: $dayjs().format('YYYY-MM-DD'),
    contribution_showName: 1,
    contribution_showAmount: 1,
  }
  //
  // contribution form submit action
  //
  const onSubmit = async function (form_state) {
    await onSubmitAdd('contributions', form_state)
    navigateTo(`/admin/contributions`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add Contribution</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add Contributions" />
      </div>
      <contributions-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
