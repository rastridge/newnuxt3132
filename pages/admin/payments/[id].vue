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
  const { data: state } = await useFetch(`/payments/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  //
  // News form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitEdit('payments', form_state)
    navigateTo(`/admin/payments`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit payment</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit payment" />
      </div>
      <payments-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
