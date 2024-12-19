<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()

  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitEdit } = useSubmit()

  //
  // Initialize Edit form
  //
  const route = useRoute()
  const id = route.params.id
  //

  // Initialize Edit form
  //
  // get votes by id
  const { data: state } = await useFetch(`/votes/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })
  //
  // Votes form action
  //
  const onSubmit = async function (state) {
    await onSubmitEdit('votes', state)
    navigateTo(`/admin/votes`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Votes</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Votes" />
      </div>
      <votes-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
