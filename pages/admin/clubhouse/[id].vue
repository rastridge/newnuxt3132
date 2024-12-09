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
  const { data: state } = await useFetch(`/clubhouse/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  //
  // archives form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitEdit('clubhouse', form_state)
    navigateTo(`/admin/clubhouse`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit clubhouse Item </Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit clubhouse item" />
      </div>
      <clubhouse-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
