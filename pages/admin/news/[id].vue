<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })

  const { onSubmitEdit } = useSubmit()

  //
  // Get news item id
  //
  const route = useRoute()
  const id = route.params.id

  //
  // Initialize Edit form
  //
  const { data: state } = await useFetch(`/news/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  //
  // News form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitEdit('news', form_state)
    navigateTo(`/admin/news`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit News Item</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit News Item" />
      </div>
      <news-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
