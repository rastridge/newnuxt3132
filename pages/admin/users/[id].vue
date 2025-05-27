<template>
  <div>
    <Head>
      <Title>Edit User</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem"></div>
    </div>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit User" />
      </div>
      <user-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  import { useAlertStore } from '~/stores/alertStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })
  const alert = useAlertStore()
  const { onSubmitEdit } = useSubmit()
  //
  // Get user id
  //
  const route = useRoute()
  const id = route.params.id

  // get user data for editing
  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/users/${id}`,
    {
      method: 'get',
      headers: {
        authorization: auth.user.token,
      },
    },
  )
  state.value.password = ''
  //
  // Users form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitEdit('users', form_state)
    if (alert.message === null) {
      navigateTo('/admin/users')
    }
  }
</script>
