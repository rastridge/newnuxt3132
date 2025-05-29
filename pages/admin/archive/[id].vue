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
  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/archive/${id}`,
    {
      method: 'get',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  //
  // archives form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitEdit('archive', form_state)
    navigateTo(`/admin/archive`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit archive Item</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit archive Item" />
      </div>
      <archive-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
