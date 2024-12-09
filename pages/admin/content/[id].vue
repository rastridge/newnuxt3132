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
  const { data: state } = await useFetch(`/content/${id}`, {
    key: id,
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })
  //
  // content form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitEdit('content', form_state)
    navigateTo(`/admin/content`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit custom page</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit custom page" />
      </div>
      <content-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
