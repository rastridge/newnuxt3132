<template>
  <div>
    <Head>
      <Title>Edit History</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit history" />
      </div>
      <history-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitEdit } = useSubmit()

  //
  // Get leader id
  //
  const route = useRoute()
  const id = route.params.id
  const { data: state } = await useFetch(`/history/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })
  //
  // history form action
  //
  const onSubmit = async function (state) {
    await onSubmitEdit('history', state)
    navigateTo(`/admin/history`)
  }
</script>
