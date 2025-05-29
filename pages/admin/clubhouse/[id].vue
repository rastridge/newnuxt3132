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
    `https://nuxt3.buffalorugby.org/clubhouse/${id}`,
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
