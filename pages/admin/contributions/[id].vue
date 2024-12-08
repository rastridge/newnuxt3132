<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()

  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitEdit } = useSubmit()

  //
  // Get contributions by id
  //
  const route = useRoute()
  const id = route.params.id
  //
  const { data: state } = await useFetch(`/contributions/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  //
  // contribution form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitEdit('contributions', form_state)
    navigateTo(`/admin/contributions`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Contributions</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Contributions" />
      </div>
      <contributions-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
