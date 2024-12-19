<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitAdd } = useSubmit()

  // Signal we're adding to form
  const state = ref({ vote_question_id: '0' })
  state.value.choices = [
    { vote_choice_id: 0, vote_choice: '', vote_picked_cnt: 0 },
  ]

  const onSubmit = async function (state) {
    await onSubmitAdd('votes', state)
    navigateTo(`/admin/votes`)
  }
</script>

<template>
  <div>
    <Head>
      <Title> Add Vote</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add vote" />
      </div>
      <votes-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
